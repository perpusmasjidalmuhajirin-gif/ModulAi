import { GeneratedDocs, RppForm } from './types';

const nl = '\n';
const bullets = (items: string[]) => items.map((x) => `- ${x}`).join(nl);

export function generateDocuments(form: RppForm): GeneratedDocs {
  const nilai = form.nilaiCinta.length ? form.nilaiCinta : ['Akhlak mulia', 'Cinta sesama', 'Tanggung jawab'];
  const cp = form.cp || `Peserta didik memahami konsep ${form.topik}, menunjukkan perilaku berakhlak, serta mampu menerapkan nilai Kurikulum Cinta dalam kehidupan sehari-hari.`;

  const modul = `# MODUL AJAR / RPP\n\n## A. Identitas Umum\nNama Madrasah/Sekolah: ${form.namaMadrasah}\nKepala Madrasah/Sekolah: ${form.kepalaMadrasah}\nGuru Penyusun: ${form.namaGuru}\nMata Pelajaran: ${form.mapel}\nKelas/Rombel: ${form.kelas}${form.rombel}\nFase: ${form.fase}\nSemester: ${form.semester}\nTahun Ajaran: ${form.tahunAjaran}\nAlokasi Waktu: ${form.alokasiWaktu}\nKurikulum: ${form.kurikulum}\n\n## B. Capaian Pembelajaran\n${cp}\n\n## C. Tujuan Pembelajaran\n${bullets([
    `Menjelaskan konsep utama tentang ${form.topik} dengan bahasa sendiri.`,
    `Mengidentifikasi contoh perilaku yang sesuai dengan ${form.topik}.`,
    `Menganalisis manfaat penerapan ${form.topik} bagi diri, keluarga, madrasah, dan masyarakat.`,
    `Menunjukkan sikap santun, empati, dan tanggung jawab selama proses pembelajaran.`,
    `Menyusun rencana aksi sederhana untuk menerapkan nilai Kurikulum Cinta dalam kehidupan sehari-hari.`,
  ])}\n\n## D. Nilai Kurikulum Cinta yang Ditanamkan\n${bullets(nilai)}\n\n## E. Pemahaman Bermakna\nPembelajaran ${form.topik} membantu peserta didik menyadari bahwa ilmu perlu diwujudkan dalam sikap penuh cinta, kasih sayang, toleransi, dan akhlak mulia.\n\n## F. Pertanyaan Pemantik\n${bullets([
    `Mengapa ${form.topik} penting dalam kehidupan sehari-hari?`,
    'Bagaimana cara menunjukkan sikap cinta kepada Allah, sesama, lingkungan, dan bangsa?',
    'Apa akibatnya jika ilmu tidak disertai akhlak dan kasih sayang?',
  ])}\n\n## G. Model dan Metode Pembelajaran\nModel: ${form.model || 'Pembelajaran aktif kolaboratif'}\nMetode: diskusi, tanya jawab, refleksi, presentasi, dan praktik aksi nyata.\n\n## H. Langkah Pembelajaran\n### Pendahuluan\n${bullets([
    'Guru membuka pembelajaran dengan salam, doa, dan pengecekan kesiapan belajar.',
    'Guru mengaitkan materi dengan pengalaman peserta didik.',
    'Guru menyampaikan tujuan pembelajaran dan nilai Kurikulum Cinta yang akan dikuatkan.',
  ])}\n\n### Kegiatan Inti\n${bullets([
    `Peserta didik mengamati kasus singkat terkait ${form.topik}.`,
    'Peserta didik berdiskusi dalam kelompok untuk menemukan pesan nilai dan solusi.',
    'Setiap kelompok mempresentasikan hasil diskusi secara santun.',
    'Guru memberikan penguatan materi, dalil/konteks, dan contoh penerapan.',
    'Peserta didik menulis komitmen aksi cinta yang akan dilakukan setelah pembelajaran.',
  ])}\n\n### Penutup\n${bullets([
    'Guru dan peserta didik menyimpulkan materi bersama.',
    'Peserta didik melakukan refleksi nilai cinta hari ini.',
    'Guru menyampaikan tindak lanjut, remedial, atau pengayaan.',
    'Pembelajaran ditutup dengan doa.',
  ])}\n\n## I. Asesmen\nDiagnostik: pertanyaan awal tentang pengalaman peserta didik.\nFormatif: observasi diskusi, tanya jawab, dan LKPD.\nSumatif: tes uraian singkat dan proyek aksi nyata.\nSikap: santun, jujur, peduli, kerja sama, toleransi, dan tanggung jawab.\n\n## J. Remedial dan Pengayaan\nRemedial: bimbingan ulang, contoh konkret, dan tugas refleksi sederhana.\nPengayaan: membuat poster/video pendek kampanye nilai Kurikulum Cinta.\n\n## K. Refleksi\nPeserta didik menuliskan satu ilmu baru, satu sikap baik yang sudah dilakukan, dan satu komitmen kebaikan.\n\n## L. Pengesahan\nMengetahui,\nKepala Madrasah/Sekolah\n\n\n${form.kepalaMadrasah}\n\nGuru Penyusun\n\n\n${form.namaGuru}\n`;

  const materi = `# MATERI AJAR\n\n## Topik\n${form.topik}\n\n## Ringkasan Materi\n${form.topik} adalah materi yang menuntun peserta didik memahami pengetahuan sekaligus membiasakan perilaku baik. Dalam Kurikulum Cinta, materi tidak berhenti pada hafalan, tetapi diarahkan menjadi akhlak, empati, kepedulian, dan tanggung jawab.\n\n## Pokok Bahasan\n${bullets(['Pengertian dan ruang lingkup materi', 'Contoh penerapan di madrasah dan rumah', 'Manfaat bagi diri dan masyarakat', 'Kaitan dengan nilai Kurikulum Cinta'])}\n\n## Pesan Nilai\n${bullets(nilai)}\n`;

  const lkpd = `# LKPD SISWA\n\nNama: ____________________\nKelas: ${form.kelas}${form.rombel}\nTopik: ${form.topik}\n\n## Aktivitas 1: Mengamati\nBacalah kasus yang diberikan guru. Tuliskan masalah utama dan sikap yang sebaiknya dilakukan.\n\n## Aktivitas 2: Diskusi Kelompok\n1. Apa nilai cinta yang muncul dalam kasus tersebut?\n2. Bagaimana contoh penerapannya di madrasah?\n3. Apa rencana aksi kelompok kalian?\n\n## Nilai Cinta Hari Ini\n[ ] Peduli  [ ] Empati  [ ] Syukur  [ ] Toleransi  [ ] Gotong Royong\n\n## Komitmen Saya\nSaya akan: ____________________________________________________\n`;

  const asesmen = `# INSTRUMEN ASESMEN\n\n## A. Pengetahuan\n1. Jelaskan pengertian ${form.topik}!\n2. Sebutkan dua contoh penerapan ${form.topik}!\n3. Mengapa sikap cinta dan akhlak penting dalam materi ini?\n\n## B. Keterampilan\nTugas: Buat poster atau presentasi singkat tentang aksi nyata ${form.topik}.\n\n## C. Rubrik Sikap\n| Aspek | 4 | 3 | 2 | 1 |\n|---|---|---|---|---|\n| Santun | Selalu santun | Sering santun | Kadang santun | Perlu bimbingan |\n| Peduli | Aktif membantu | Mau membantu | Jarang membantu | Belum tampak |\n| Toleransi | Menghargai semua pendapat | Menghargai sebagian besar | Kadang menghargai | Perlu bimbingan |\n| Tanggung Jawab | Tugas tuntas mandiri | Tuntas dengan sedikit bantuan | Belum tuntas | Tidak mengumpulkan |\n`;

  const refleksi = `# REFLEKSI DAN TINDAK LANJUT\n\n## Refleksi Peserta Didik\n- Apa pelajaran paling penting hari ini?\n- Nilai cinta apa yang sudah saya praktikkan?\n- Apa komitmen baik saya setelah pembelajaran?\n\n## Refleksi Guru\n- Apakah peserta didik aktif dan saling menghargai?\n- Nilai Kurikulum Cinta apa yang paling tampak?\n- Bagian mana yang perlu diperbaiki pada pertemuan berikutnya?\n\n## Tindak Lanjut\nRemedial diberikan kepada peserta didik yang belum memahami konsep. Pengayaan diberikan melalui proyek aksi nyata atau kampanye kebaikan.\n`;

  const perencanaan = `# PERENCANAAN PEMBELAJARAN\n\n## Data Rencana\nMapel: ${form.mapel}\nKelas: ${form.kelas}${form.rombel}\nSemester: ${form.semester}\nTopik: ${form.topik}\nAlokasi: ${form.alokasiWaktu}\n\n## Alur Pertemuan\n1. Orientasi nilai dan tujuan pembelajaran\n2. Eksplorasi masalah/kasus\n3. Diskusi dan kolaborasi\n4. Presentasi hasil\n5. Refleksi Kurikulum Cinta\n6. Aksi nyata dan tindak lanjut\n\n## Kebutuhan Media\nPapan tulis, LCD, kartu kasus, LKPD, rubrik asesmen, dan bahan bacaan.\n`;

  return { modul, materi, lkpd, asesmen, refleksi, perencanaan };
}
