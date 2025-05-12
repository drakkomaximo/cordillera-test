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
  } catch (error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      'response' in error &&
      error.response &&
      typeof error.response === 'object' &&
      'data' in error.response &&
      'status' in error.response
    ) {
      const err = error as { response: { data: unknown; status: number } };
      return NextResponse.json(err.response.data, { status: err.response.status });
    }
    return NextResponse.json({ error: (error instanceof Error ? error.message : 'Unknown error') }, { status: 500 });
  }
} 