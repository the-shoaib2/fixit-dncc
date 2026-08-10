export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getAdminFromCookies } from '../../../../lib/auth';

export async function GET(request: Request) {
  try {
    const admin = getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const categoryId = searchParams.get('categoryId');
    const search = searchParams.get('search');
    const priority = searchParams.get('priority');

    const where: any = {};
    if (status && status !== 'ALL') where.status = status;
    if (categoryId && categoryId !== 'ALL') where.categoryId = categoryId;
    if (priority && priority !== 'ALL') where.priority = priority;

    if (search) {
      where.OR = [
        { publicId: { contains: search } },
        { locationAddress: { contains: search } },
        { description: { contains: search } },
        { mobileNumber: { contains: search } },
      ];
    }

    const reports = await prisma.report.findMany({
      where,
      include: {
        category: true,
        images: true,
        cleaningActivity: true,
        statusHistory: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: reports });
  } catch (error) {
    console.error('Error fetching admin reports:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch admin reports' }, { status: 500 });
  }
}
