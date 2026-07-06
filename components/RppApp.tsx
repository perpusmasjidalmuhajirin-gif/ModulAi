'use client';

import { useEffect, useMemo, useState } from 'react';
import { Download, FileText, History, Sparkles } from 'lucide-react';
import { defaultForm, faseFromKelas, nilaiCintaOptions } from '@/lib/defaults';
import { GeneratedDocs, HistoryItem, RppForm } from '@/lib/types';
import { validateRppForm } from '@/lib/validation';

const tabs: { key: keyof GeneratedDocs; label: string }[] = [
  { key: 'modul', label: 'Modul Ajar' },
  { key: 'materi', label: 'Materi Ajar' },
  { key: 'lkpd', label: 'LKPD Siswa' },
  { key: 'asesmen', label: 'Instrumen Asesmen' },
  { key: 'refleksi', label: 'Refleksi' },
  { key: 'perencanaan', label: 'Perencanaan' },
];

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function mdToHtml(markdown: string) {
  const escaped = escapeHtml(markdown);
  const lines = escaped.split('\n');
  const html: string[] = [];
  let inList = false;

  for (const line of lines) {
    if (line.startsWith('### ')) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<h3>${line.slice(4)}</h3>`);
    } else if (line.startsWith('## ')) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<h2>${line.slice(3)}</h2>`);
    } else if (line.startsWith('# ')) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<h1>${line.slice(2)}</h1>`);
    } else if (line.startsWith('- ')) {
      if (!inList) { html.push('<ul>'); inList = true; }
      html.push(`<li>${line.slice(2)}</li>`);
    } else if (line.trim() === '') {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push('<br />');
    } else {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<p>${line}</p>`);
    }
  }

  if (inList) html.push('</ul>');
  return html.join('');
}

export default function RppApp() {
  const [form, setForm] = useState<RppForm>(defaultForm);
  const [docs, setDocs] = useState<GeneratedDocs | null>(null);
  const [active, setActive] = useState<keyof GeneratedDocs>('modul');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('rpp-ai-history');
      if (!stored) return;
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return;
      const safeHistory = parsed
        .filter((item): item is HistoryItem => Boolean(item?.id && item?.createdAt && item?.form && item?.docs))
        .slice(0, 20);
      setHistory(safeHistory);
      localStorage.setItem('rpp-ai-history', JSON.stringify(safeHistory));
    } catch {
      localStorage.removeItem('rpp-ai-history');
    }
  }, []);

  function update<K extends keyof RppForm>(key: K, value: RppForm[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === 'kelas') next.fase = faseFromKelas(String(value));
      return next;
    });
  }

  async function generate() {
    setError(null);
    const parsed = validateRppForm(form);

    if (!parsed.ok) {
      setError(parsed.errors.join(' '));
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();

      if (!res.ok || !data.docs) {
        throw new Error(data.details?.join(' ') || data.error || 'Gagal generate dokumen.');
      }

      setDocs(data.docs);
      const item: HistoryItem = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), form: parsed.data, docs: data.docs };
      const next = [item, ...history].slice(0, 20);
      setHistory(next);
      localStorage.setItem('rpp-ai-history', JSON.stringify(next));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat generate dokumen.');
    } finally {
      setLoading(false);
    }
  }

  function downloadText(type: keyof GeneratedDocs) {
    if (!docs) return;
    const blob = new Blob([docs[type]], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-${form.mapel}-${form.kelas}${form.rombel}.md`.replaceAll(' ', '-').toLowerCase();
    a.click();
    URL.revokeObjectURL(url);
  }

  const preview = useMemo(() => docs?.[active] || 'Klik “Generate RPP Lengkap” untuk membuat dokumen.', [docs, active]);

  return (
    <main className="min-h-screen">
      <header className="no-print sticky top-0 z-20 border-b-4 border-black bg-yellow px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="brutal-card bg-pink px-3 py-2 text-2xl font-black">RPP.AI</div>
            <div>
              <h1 className="text-xl font-black md:text-3xl">Generator RPP Kurikulum Cinta</h1>
              <p className="font-bold">Neo Brutalism • AI Ready • Madrasah Friendly</p>
            </div>
          </div>
          <button onClick={generate} disabled={loading} className="brutal-btn bg-mint" aria-busy={loading}>
            <Sparkles className="mr-2 inline" size={18} /> {loading ? 'Generate...' : 'Generate'}
          </button>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-5 p-4 lg:grid-cols-[420px_1fr]">
        <aside className="no-print brutal-card h-fit bg-white p-4 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-auto">
          <h2 className="mb-4 text-2xl font-black">Form Identitas</h2>
          <Field label="Kurikulum">
            <select className="brutal-input" value={form.kurikulum} onChange={(e) => update('kurikulum', e.target.value as RppForm['kurikulum'])} required>
              <option>Kurikulum Cinta</option>
              <option>Kurikulum Merdeka</option>
              <option>Kurikulum Merdeka Madrasah</option>
            </select>
          </Field>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-1">
            <Input label="Nama Madrasah/Sekolah" value={form.namaMadrasah} onChange={(v) => update('namaMadrasah', v)} required />
            <Input label="Kepala Madrasah/Sekolah" value={form.kepalaMadrasah} onChange={(v) => update('kepalaMadrasah', v)} required />
            <Input label="NPSN/NSM" value={form.npsn} onChange={(v) => update('npsn', v)} />
            <Input label="Alamat" value={form.alamat} onChange={(v) => update('alamat', v)} />
            <Input label="Nama Guru" value={form.namaGuru} onChange={(v) => update('namaGuru', v)} required />
            <Input label="NIP/NUPTK" value={form.nip} onChange={(v) => update('nip', v)} />
            <Input label="Mata Pelajaran" value={form.mapel} onChange={(v) => update('mapel', v)} required />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Input label="Kelas" value={form.kelas} onChange={(v) => update('kelas', v)} required />
            <Input label="Rombel" value={form.rombel} onChange={(v) => update('rombel', v)} required />
            <Input label="Fase" value={form.fase} onChange={(v) => update('fase', v)} required />
            <Input label="Semester" value={form.semester} onChange={(v) => update('semester', v)} required />
            <Input label="Tahun Ajaran" value={form.tahunAjaran} onChange={(v) => update('tahunAjaran', v)} required />
            <Input label="Alokasi Waktu" value={form.alokasiWaktu} onChange={(v) => update('alokasiWaktu', v)} required />
          </div>
          <Input label="Model Pembelajaran" value={form.model} onChange={(v) => update('model', v)} />
          <Textarea label="Topik/Materi per Bab" value={form.topik} onChange={(v) => update('topik', v)} required />
          <Textarea label="Capaian Pembelajaran (opsional)" value={form.cp} onChange={(v) => update('cp', v)} />

          <h3 className="mb-2 mt-4 text-lg font-black">Nilai Kurikulum Cinta</h3>
          <div className="grid gap-2">
            {nilaiCintaOptions.map((nilai) => (
              <label key={nilai} className="flex items-center gap-2 rounded-lg border-2 border-black bg-cream p-2 font-bold">
                <input
                  type="checkbox"
                  checked={form.nilaiCinta.includes(nilai)}
                  onChange={(e) => update('nilaiCinta', e.target.checked ? [...form.nilaiCinta, nilai] : form.nilaiCinta.filter((x) => x !== nilai))}
                />
                {nilai}
              </label>
            ))}
          </div>

          {error && (
            <div role="alert" className="mt-4 rounded-lg border-2 border-black bg-pink p-3 font-bold">
              {error}
            </div>
          )}

          <button onClick={generate} disabled={loading} className="brutal-btn mt-5 w-full bg-pink text-lg disabled:opacity-60" aria-busy={loading}>
            {loading ? '⏳ Sedang Generate...' : 'Generate RPP Lengkap'}
          </button>
        </aside>

        <section className="space-y-4">
          <div className="no-print brutal-card bg-white p-3">
            <div className="mb-3 flex flex-wrap gap-2" role="tablist" aria-label="Dokumen turunan">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                  className={`brutal-btn ${active === tab.key ? 'bg-mint' : 'bg-white'} px-3 py-2 text-sm`}
                  aria-pressed={active === tab.key}
                  aria-label={`Buka tab ${tab.label}`}
                >
                  <FileText className="mr-1 inline" size={16} /> {tab.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => window.print()} className="brutal-btn bg-orange"><Download className="mr-2 inline" size={16} />Cetak / Simpan PDF</button>
              <button onClick={() => downloadText(active)} className="brutal-btn bg-blue">Unduh Markdown</button>
            </div>
          </div>

          <article className="print-page brutal-card min-h-[800px] p-6 leading-7" aria-busy={loading}>
            {loading ? (
              <div className="space-y-4" aria-live="polite">
                <div className="brutal-card bg-mint p-4 text-xl font-black">Sedang menyusun dokumen Kurikulum Cinta...</div>
                <div className="h-8 w-3/4 animate-pulse border-2 border-black bg-cream" />
                <div className="h-6 w-full animate-pulse border-2 border-black bg-cream" />
                <div className="h-6 w-5/6 animate-pulse border-2 border-black bg-cream" />
                <div className="h-40 w-full animate-pulse border-2 border-black bg-cream" />
              </div>
            ) : (
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: mdToHtml(preview) }} />
            )}
          </article>

          <div className="no-print brutal-card bg-white p-4">
            <h2 className="mb-3 flex items-center gap-2 text-2xl font-black"><History /> Riwayat Lokal</h2>
            {history.length === 0 ? <p className="font-bold">Belum ada riwayat.</p> : history.map((item) => (
              <button key={item.id} onClick={() => { setForm(item.form); setDocs(item.docs); setError(null); }} className="mb-2 block w-full rounded-lg border-2 border-black bg-cream p-3 text-left font-bold hover:bg-mint" aria-label={`Buka riwayat ${item.form.mapel} kelas ${item.form.kelas}${item.form.rombel}`}>
                {item.form.mapel} - Kelas {item.form.kelas}{item.form.rombel} - {item.form.topik}
                <span className="block text-sm">{new Date(item.createdAt).toLocaleString('id-ID')}</span>
              </button>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="mb-3 block"><span className="mb-1 block font-black">{label}</span>{children}</label>;
}
function Input({ label, value, onChange, required = false }: { label: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return <Field label={label}><input className="brutal-input" value={value} onChange={(e) => onChange(e.target.value)} required={required} /></Field>;
}
function Textarea({ label, value, onChange, required = false }: { label: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return <Field label={label}><textarea rows={4} className="brutal-input" value={value} onChange={(e) => onChange(e.target.value)} required={required} /></Field>;
}
