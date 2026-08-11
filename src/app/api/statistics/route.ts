import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const totalReports = await prisma.report.count();
    const resolvedReports = await prisma.report.count({ where: { status: 'RESOLVED' } });
    const inProgress = await prisma.report.count({
      where: { status: { in: ['UNDER_VERIFICATION', 'VERIFIED', 'ASSIGNED', 'IN_PROGRESS'] } },
    });
    const cleaningDone = await prisma.cleaningActivity.count();

    // Unique citizen count based on mobile numbers submitted
    const uniqueMobiles = await prisma.report.groupBy({
      by: ['mobileNumber'],
      where: { mobileNumber: { not: null } },
    });
    const citizenParticipation = uniqueMobiles.length;

    return NextResponse.json({
      success: true,
      data: {
        totalReports,
        resolvedReports,
        inProgress,
        cleaningDone,
        citizenParticipation,
      },
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch statistics' }, { status: 500 });
  }
}
