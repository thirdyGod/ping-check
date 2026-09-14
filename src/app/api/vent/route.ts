import { NextRequest, NextResponse } from 'next/server';

interface VentPayload {
  text: string;
  mood?: string;
}

/**
 * POST /api/vent
 * Accepts an anonymous student thought/vent.
 * Strictly non-identifying: strips IP, headers, tokens, and cookies.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<VentPayload>;
    const { text, mood } = body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Text cannot be empty.',
        },
        { status: 400 }
      );
    }

    const sanitizedText = text.trim().slice(0, 1000);
    const sanitizedMood = mood && typeof mood === 'string' ? mood.slice(0, 50) : 'unspecified';

    console.log(
      `[Vent:Anonymous] Received anonymous student reflection (${sanitizedText.length} chars) - Mood: ${sanitizedMood}`
    );

    return NextResponse.json({
      success: true,
      message: 'Your reflection was safely and anonymously received.',
    });
  } catch (err: unknown) {
    console.error('[API:vent] Error processing vent submission:', err);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
