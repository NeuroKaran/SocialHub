import { NextRequest, NextResponse } from 'next/server';
import { google_web_search } from '@/lib/tools'; // Assuming tools are available at this path

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const searchResults = await google_web_search({ query });

    return NextResponse.json({ searchResults });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error instanceof Error && error.message) || 'Failed to process request' },
      { status: 500 }
    );
  }
}
