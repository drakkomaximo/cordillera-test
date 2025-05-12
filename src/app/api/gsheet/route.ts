import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await axios.post(
      process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL as string,
      body,
      { headers: { 'Content-Type': 'application/json' } }
    );
    if (response.status === 200) {
      return NextResponse.json({ result: 'success' });
    } else {
      return NextResponse.json(response.data, { status: response.status });
    }
  } catch (error: any) {
    if (error.response) {
      return NextResponse.json(error.response.data, { status: error.response.status });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 