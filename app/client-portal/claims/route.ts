import { NextResponse } from 'next/server';

export async function GET() {
  // This file forces Next.js to recognize this route
  return NextResponse.redirect('/client-portal/claims', { status: 301 });
}