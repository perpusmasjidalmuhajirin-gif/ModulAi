import { NextResponse } from 'next/server';
import { generateDocuments } from '@/lib/generator';
import { validateRppForm } from '@/lib/validation';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const parsed = validateRppForm(payload);

    if (!parsed.ok) {
      return NextResponse.json({ error: 'Validasi gagal.', details: parsed.errors }, { status: 400 });
    }

    const docs = generateDocuments(parsed.data);
    return NextResponse.json({ docs });
  } catch {
    return NextResponse.json({ error: 'Gagal generate dokumen.' }, { status: 500 });
  }
}
