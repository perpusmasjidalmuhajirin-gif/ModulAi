import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RPP.AI Kurikulum Cinta',
  description: 'Generator RPP/Modul Ajar AI berbasis Kurikulum Cinta',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
