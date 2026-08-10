import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '../lib/i18n';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'FixIt DNCC — Citizen Waste Reporting & Management System',
  description: 'Report Waste. Build a Cleaner Dhaka. আপনার একটি রিপোর্ট, পরিচ্ছন্ন ঢাকার একটি পদক্ষেপ।',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col justify-between">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
