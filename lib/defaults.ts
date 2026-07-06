import { RppForm } from './types';

export const nilaiCintaOptions = [
  'Cinta kepada Allah SWT',
  'Cinta kepada Rasulullah SAW',
  'Cinta kepada sesama',
  'Cinta lingkungan',
  'Cinta bangsa dan tanah air',
  'Moderasi beragama',
  'Akhlak mulia',
  'Gotong royong',
  'Toleransi',
];

export const defaultForm: RppForm = {
  kurikulum: 'Kurikulum Cinta',
  namaMadrasah: 'MTs Contoh Nusantara',
  kepalaMadrasah: 'Drs. H. Ahmad Fauzi, M.Pd.',
  npsn: '',
  alamat: '',
  namaGuru: 'Muhammad Saman',
  nip: '',
  mapel: 'Akidah Akhlak',
  kelas: '7',
  rombel: 'A',
  fase: 'D',
  semester: 'Ganjil',
  tahunAjaran: '2026/2027',
  alokasiWaktu: '2 JP',
  topik: 'Akhlak terpuji dalam kehidupan sehari-hari',
  cp: '',
  model: 'Problem Based Learning',
  nilaiCinta: ['Cinta kepada Allah SWT', 'Cinta kepada sesama', 'Akhlak mulia', 'Moderasi beragama'],
};

export function faseFromKelas(kelas: string) {
  const k = Number(kelas);
  if ([1, 2].includes(k)) return 'A';
  if ([3, 4].includes(k)) return 'B';
  if ([5, 6].includes(k)) return 'C';
  if ([7, 8, 9].includes(k)) return 'D';
  if ([10].includes(k)) return 'E';
  if ([11, 12].includes(k)) return 'F';
  return 'D';
}
