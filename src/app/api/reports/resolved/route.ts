export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  try {
    // Fetch latest reports that are RESOLVED, VERIFIED, or IN_PROGRESS with images
    const reports = await prisma.report.findMany({
      where: {
        status: { in: ['RESOLVED', 'VERIFIED', 'IN_PROGRESS', 'ASSIGNED'] },
      },
      select: {
        id: true,
        publicId: true,
        description: true,
        locationAddress: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: { nameBn: true, nameEn: true },
        },
        images: {
          select: { imageUrl: true, type: true },
        },
        cleaningActivity: {
          select: { afterImageUrl: true, cleanedAt: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
      take: 6,
    });

    const formattedResults = reports.map((report: any) => {
      const beforeImgObj = report.images.find((img: any) => img.type === 'BEFORE') || report.images[0];
      const afterImgObj = report.images.find((img: any) => img.type === 'AFTER');
      
      const beforeImage = beforeImgObj?.imageUrl || '/samples/waste-before.jpg';
      const afterImage = afterImgObj?.imageUrl || report.cleaningActivity?.afterImageUrl || '/samples/waste-after.jpg';

      return {
        id: report.id,
        publicId: report.publicId,
        locationAddress: report.locationAddress,
        description: report.description,
        status: report.status,
        categoryBn: report.category?.nameBn,
        categoryEn: report.category?.nameEn,
        beforeImage,
        afterImage,
        resolvedAt: report.cleaningActivity?.cleanedAt || report.updatedAt,
      };
    });

    return NextResponse.json({ success: true, data: formattedResults });
  } catch (error) {
    console.error('Error fetching resolved reports:', error);
    return NextResponse.json({ success: true, data: [] });
  }
}
