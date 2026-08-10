import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const admin = getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const report = await prisma.report.findUnique({
      where: { id: params.id },
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
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch report' }, { status: 500 });
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

    const existing = await prisma.report.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Report not found' }, { status: 404 });
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
    if (rejectionReason !== undefined) updateData.rejectionReason = rejectionReason;

    const updatedReport = await prisma.report.update({
      where: { id: params.id },
      data: updateData,
      include: { category: true, images: true, cleaningActivity: true },
    });

    // Create status history entry if status changed or note provided
    if (status || note) {
      await prisma.reportStatusHistory.create({
        data: {
          reportId: params.id,
          status: status || existing.status,
          note: note || `Status updated to ${status || existing.status}`,
          createdBy: admin.name,
        },
      });
    }

    // Handle Resolution & Cleaning Activity
    if (status === 'RESOLVED' || cleanedBy || afterImageUrl) {
      await prisma.cleaningActivity.upsert({
        where: { reportId: params.id },
        update: {
          cleanedBy: cleanedBy || 'DNCC Field Sanitation Team',
          notes: note || 'Cleaned up and site verified.',
          wasteVolumeKg: wasteVolumeKg ? parseFloat(wasteVolumeKg) : 100,
          afterImageUrl: afterImageUrl || null,
        },
        create: {
          reportId: params.id,
          cleanedBy: cleanedBy || 'DNCC Field Sanitation Team',
          notes: note || 'Cleaned up and site verified.',
          wasteVolumeKg: wasteVolumeKg ? parseFloat(wasteVolumeKg) : 100,
          afterImageUrl: afterImageUrl || null,
        },
      });

      if (afterImageUrl) {
        // Also add after image to images array if not already present
        const hasAfterImage = await prisma.reportImage.findFirst({
          where: { reportId: params.id, type: 'AFTER' },
        });
        if (!hasAfterImage) {
          await prisma.reportImage.create({
            data: {
              reportId: params.id,
              imageUrl: afterImageUrl,
              type: 'AFTER',
            },
          });
        }
      }
    }

    // Audit Log
    await prisma.activityLog.create({
      data: {
        adminId: admin.id,
        action: 'UPDATE_REPORT',
        details: `Updated report ${existing.publicId} status to ${status || existing.status}`,
      },
    });

    return NextResponse.json({ success: true, data: updatedReport });
  } catch (error) {
    console.error('Error updating report:', error);
    return NextResponse.json({ success: false, error: 'Failed to update report' }, { status: 500 });
  }
}
