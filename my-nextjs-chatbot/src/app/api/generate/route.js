import { NextResponse } from 'next/server';
import GeminiController from '../../../lib/controllers/geminiController';

const controller = new GeminiController();

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await controller.generateContent(body.prompt);
    return NextResponse.json({ content: result });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}