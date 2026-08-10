export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getAdminFromCookies } from '../../../../lib/auth';

export async function GET() {
  try {
    const admin = getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ authenticated: false, error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ authenticated: true, admin });
  } catch (error) {
    return NextResponse.json({ authenticated: false, error: 'Auth check failed' }, { status: 500 });
  }
}
