export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.trim();

    if (!query) {
      return NextResponse.json({ success: false, error: 'Query parameter "q" is required' }, { status: 400 });
    }

    // Search by publicId OR mobile number
    const reports = await prisma.report.findMany({
      where: {
        OR: [
          { publicId: { equals: query } },
          { mobileNumber: { equals: query } },
        ],
      },
      select: {
        publicId: true,
        description: true,
        locationAddress: true,
        status: true,
        createdAt: true,
        category: {
          select: { nameBn: true, nameEn: true },
        },
        images: {
          select: { imageUrl: true, type: true },
        },
        statusHistory: {
          select: {
            status: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'asc' },
        },
        cleaningActivity: {
          select: {
            cleanedAt: true,
            notes: true,
            afterImageUrl: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: reports });
  } catch (error) {
    console.error('Error tracking report:', error);
    return NextResponse.json({ success: false, error: 'Failed to track report' }, { status: 500 });
  }
}
