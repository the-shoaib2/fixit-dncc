import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { getAdminFromCookies } from '../../../../../lib/auth';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const admin = getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Support lookup by either database ID or public ID
    const report = await prisma.report.findFirst({
      where: {
        OR: [
          { id: params.id },
          { publicId: params.id },
        ],
      },
      include: {
        category: true,
        images: true,
        statusHistory: { orderBy: { createdAt: 'desc' } },
        cleaningActivity: true,
        publicUpdates: true,
      },
    });

    if (!report) {
      return NextResponse.json({ success: false, error: 'Report not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: report });
  } catch (error: any) {
    console.error('Error fetching admin report detail:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to fetch report' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const admin = getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { status, priority, assignedTo, note, rejectionReason, cleanedBy, wasteVolumeKg, afterImageUrl } = body;

    const existing = await prisma.report.findFirst({
      where: {
        OR: [
          { id: params.id },
          { publicId: params.id },
        ],
      },
    });

    if (!existing) {
      return NextResponse.json({ success: false, error: 'Report not found' }, { status: 404 });
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
    if (rejectionReason !== undefined) updateData.rejectionReason = rejectionReason;

    const updatedReport = await prisma.report.update({
      where: { id: existing.id },
      data: updateData,
      include: { category: true, images: true, cleaningActivity: true },
    });

    // Create status history entry if status changed or note provided
    if (status || note) {
      await prisma.reportStatusHistory.create({
        data: {
          reportId: existing.id,
          status: status || existing.status,
          note: note || `Status updated to ${status || existing.status}`,
          createdBy: admin.name || 'Admin',
        },
      });
    }

    // Handle Resolution & Cleaning Activity
    if (status === 'RESOLVED' || cleanedBy || afterImageUrl) {
      await prisma.cleaningActivity.upsert({
        where: { reportId: existing.id },
        update: {
          cleanedBy: cleanedBy || 'DNCC Field Sanitation Team',
          notes: note || 'Cleaned up and site verified.',
          wasteVolumeKg: wasteVolumeKg ? parseFloat(wasteVolumeKg) : 100,
          afterImageUrl: afterImageUrl || null,
        },
        create: {
          reportId: existing.id,
          cleanedBy: cleanedBy || 'DNCC Field Sanitation Team',
          notes: note || 'Cleaned up and site verified.',
          wasteVolumeKg: wasteVolumeKg ? parseFloat(wasteVolumeKg) : 100,
          afterImageUrl: afterImageUrl || null,
        },
      });

      if (afterImageUrl) {
        const existingAfterImage = await prisma.reportImage.findFirst({
          where: { reportId: existing.id, type: 'AFTER' },
        });

        if (existingAfterImage) {
          await prisma.reportImage.update({
            where: { id: existingAfterImage.id },
            data: { imageUrl: afterImageUrl },
          });
        } else {
          await prisma.reportImage.create({
            data: {
              reportId: existing.id,
              imageUrl: afterImageUrl,
              type: 'AFTER',
            },
          });
        }
      }
    }

    // Audit Log (safely handled with DB verification)
    try {
      if (admin.id) {
        const adminExists = await prisma.admin.findUnique({ where: { id: admin.id } });
        if (adminExists) {
          await prisma.activityLog.create({
            data: {
              adminId: admin.id,
              action: 'UPDATE_REPORT',
              details: `Updated report ${existing.publicId} status to ${status || existing.status}`,
            },
          });
        }
      }
    } catch (e) {
      console.warn('Could not record activity log:', e);
    }

    return NextResponse.json({ success: true, data: updatedReport });
  } catch (error: any) {
    console.error('Error updating report:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to update report' }, { status: 500 });
  }
}
