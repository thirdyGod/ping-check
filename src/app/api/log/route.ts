import { NextRequest, NextResponse } from 'next/server';
import { logMoodSelection } from '@/lib/supabase';
import { MoodKey, SUPPORTED_MOODS, LogPayload } from '@/lib/types';

const validMoodKeys = new Set<string>(SUPPORTED_MOODS.map((m) => m.key));

/**
 * POST /api/log
 * Logs an anonymous mood selection.
 * Fully compliant with anonymity requirements: no IP, session, or identifier is captured.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<LogPayload>;
    const { mood, referrer } = body;

    if (!mood || typeof mood !== 'string' || !validMoodKeys.has(mood.toLowerCase())) {
      return NextResponse.json(
        {
          success: false,
          message: `Invalid or missing mood. Must be one of: ${Array.from(validMoodKeys).join(', ')}`,
        },
        { status: 400 }
      );
    }

    const normalizedMood = mood.toLowerCase() as MoodKey;
    const sanitizedReferrer = typeof referrer === 'string' ? referrer.trim() : null;

    const result = await logMoodSelection(normalizedMood, sanitizedReferrer);

    return NextResponse.json({
      success: true,
      message: 'Logged anonymously',
      fallback: result.fallback,
    });
  } catch (err: unknown) {
    console.error('[API:log] Error processing log request:', err);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
