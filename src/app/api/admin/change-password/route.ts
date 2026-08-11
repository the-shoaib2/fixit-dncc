import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getAdminFromCookies } from '../../../../lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const adminSession = getAdminFromCookies();
    if (!adminSession) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, error: 'Current and new passwords are required' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ success: false, error: 'New password must be at least 6 characters' }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({
      where: { id: adminSession.id },
    });

    if (!admin) {
      return NextResponse.json({ success: false, error: 'Admin user not found' }, { status: 404 });
    }

    const isValid = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Current password is incorrect' }, { status: 400 });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await prisma.admin.update({
      where: { id: adminSession.id },
      data: { passwordHash: newPasswordHash },
    });

    await prisma.activityLog.create({
      data: {
        adminId: admin.id,
        action: 'CHANGE_PASSWORD',
        details: `Admin ${admin.email} changed password successfully`,
      },
    });

    return NextResponse.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error changing admin password:', error);
    return NextResponse.json({ success: false, error: 'Failed to update password' }, { status: 500 });
  }
}
