import { RppForm } from './types';

const allowedKurikulum: RppForm['kurikulum'][] = [
  'Kurikulum Cinta',
  'Kurikulum Merdeka',
  'Kurikulum Merdeka Madrasah',
];

const requiredFields: Array<keyof RppForm> = [
  'kurikulum',
  'namaMadrasah',
  'kepalaMadrasah',
  'namaGuru',
  'mapel',
  'kelas',
  'rombel',
  'fase',
  'semester',
  'tahunAjaran',
  'alokasiWaktu',
  'topik',
];

export type ValidationResult =
  | { ok: true; data: RppForm }
  | { ok: false; errors: string[] };

function cleanString(value: unknown, maxLength = 3000) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

export function validateRppForm(input: unknown): ValidationResult {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, errors: ['Payload formulir tidak valid.'] };
  }

  const raw = input as Partial<Record<keyof RppForm, unknown>>;
  const data: RppForm = {
    kurikulum: allowedKurikulum.includes(raw.kurikulum as RppForm['kurikulum'])
      ? (raw.kurikulum as RppForm['kurikulum'])
      : 'Kurikulum Cinta',
    namaMadrasah: cleanString(raw.namaMadrasah),
    kepalaMadrasah: cleanString(raw.kepalaMadrasah),
    npsn: cleanString(raw.npsn, 120),
    alamat: cleanString(raw.alamat, 1000),
    namaGuru: cleanString(raw.namaGuru),
    nip: cleanString(raw.nip, 120),
    mapel: cleanString(raw.mapel),
    kelas: cleanString(raw.kelas, 20),
    rombel: cleanString(raw.rombel, 20),
    fase: cleanString(raw.fase, 20),
    semester: cleanString(raw.semester, 20),
    tahunAjaran: cleanString(raw.tahunAjaran, 20),
    alokasiWaktu: cleanString(raw.alokasiWaktu, 50),
    topik: cleanString(raw.topik, 3000),
    cp: cleanString(raw.cp, 5000),
    model: cleanString(raw.model, 200),
    nilaiCinta: Array.isArray(raw.nilaiCinta)
      ? raw.nilaiCinta.filter((item): item is string => typeof item === 'string').map((item) => item.trim()).filter(Boolean).slice(0, 20)
      : [],
  };

  const errors = requiredFields
    .filter((field) => {
      const value = data[field];
      return typeof value === 'string' && value.length === 0;
    })
    .map((field) => `Field ${field} wajib diisi.`);

  const jpNumber = Number(data.alokasiWaktu.replace(/[^0-9.]/g, ''));
  if (!Number.isFinite(jpNumber) || jpNumber <= 0) {
    errors.push('Alokasi waktu harus berisi angka lebih dari 0.');
  }

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, data };
}
