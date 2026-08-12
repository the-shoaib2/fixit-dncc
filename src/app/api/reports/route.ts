export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { generateReportId } from '../../../lib/utils';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { categoryId, description, locationAddress, latitude, longitude, mobileNumber, imageUrls } = body;

    if (!categoryId || !description || !locationAddress) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const publicId = generateReportId();

    const report = await prisma.report.create({
      data: {
        publicId,
        categoryId,
        description,
        locationAddress,
        latitude: latitude || 23.8103, // Default Dhaka central lat
        longitude: longitude || 90.4125, // Default Dhaka central lon
        mobileNumber: mobileNumber || null,
        status: 'SUBMITTED',
        priority: 'MEDIUM',
        images: {
          create: (imageUrls || []).map((url: string) => ({
            imageUrl: url,
            type: 'BEFORE',
          })),
        },
        statusHistory: {
          create: [
            {
              status: 'SUBMITTED',
              note: 'Report submitted by citizen',
            },
          ],
        },
      },
      include: {
        category: true,
        images: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: report.id,
        publicId: report.publicId,
        status: report.status,
        createdAt: report.createdAt,
      },
    });
  } catch (error) {
    console.error('Error creating report:', error);
    return NextResponse.json({ success: false, error: 'Failed to create report' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    const where: any = {};
    if (category && category !== 'ALL') where.categoryId = category;
    if (status && status !== 'ALL') where.status = status;

    const reports = await prisma.report.findMany({
      where,
      select: {
        id: true,
        publicId: true,
        description: true,
        locationAddress: true,
        latitude: true,
        longitude: true,
        status: true,
        createdAt: true,
        category: {
          select: { nameBn: true, nameEn: true, slug: true },
        },
        images: {
          select: { imageUrl: true, type: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({ success: true, data: reports });
  } catch (error) {
    console.error('Error fetching public reports:', error);
    return NextResponse.json({ success: true, data: [] });
  }
}
