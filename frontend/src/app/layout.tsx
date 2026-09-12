import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ModalProvider } from '../components/ModalProvider';

export const metadata: Metadata = {
  title: 'DO.IT — Gen-Z Neo-Brutalist Task Manager',
  description: 'A production-grade, funky neo-brutalist task manager web application built with Next.js, Express, TypeScript, Zustand, and Supabase.',
  keywords: ['task manager', 'productivity', 'todo app', 'neo-brutalism', 'nextjs', 'express', 'supabase'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#fcfbf9] text-[#121212] selection:bg-[#a3e635] selection:text-black">
        <Navbar />
        <main className="flex-1 w-full flex flex-col">{children}</main>
        <Footer />
        <ModalProvider />
      </body>
    </html>
  );
}
