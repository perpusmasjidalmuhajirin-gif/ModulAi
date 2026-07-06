export type RppForm = {
  kurikulum: 'Kurikulum Cinta' | 'Kurikulum Merdeka' | 'Kurikulum Merdeka Madrasah';
  namaMadrasah: string;
  kepalaMadrasah: string;
  npsn: string;
  alamat: string;
  namaGuru: string;
  nip: string;
  mapel: string;
  kelas: string;
  rombel: string;
  fase: string;
  semester: string;
  tahunAjaran: string;
  alokasiWaktu: string;
  topik: string;
  cp: string;
  model: string;
  nilaiCinta: string[];
};

export type GeneratedDocs = {
  modul: string;
  materi: string;
  lkpd: string;
  asesmen: string;
  refleksi: string;
  perencanaan: string;
};

export type HistoryItem = {
  id: string;
  createdAt: string;
  form: RppForm;
  docs: GeneratedDocs;
};
