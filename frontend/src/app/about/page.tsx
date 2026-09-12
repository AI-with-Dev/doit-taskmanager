import React from 'react';
import Link from 'next/link';
import { Button } from '../../components/Button';
import {
  Sparkles,
  Layers,
  ShieldCheck,
  Zap,
  Code2,
  Terminal,
  Database,
  ArrowRight,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a3e635] text-black text-xs font-black rounded-lg neo-border-sm mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ABOUT DO.IT</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-black tracking-tight mb-4">
          Why We Built This.
        </h1>
        <p className="text-zinc-600 font-bold text-base sm:text-lg leading-relaxed">
          Most task managers feel like Excel spreadsheets wrapped in boring corporate grey. We wanted something high-energy, blisteringly fast, and architecturally crystal-clear.
        </p>
      </div>

      {/* Philosophy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="bg-white rounded-2xl neo-border neo-shadow p-6 sm:p-8 space-y-3">
          <div className="w-10 h-10 bg-[#7c3aed] text-white rounded-xl neo-border-sm flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-black text-black">1. High Energy, Zero Fluff</h3>
          <p className="text-sm font-medium text-zinc-600 leading-relaxed">
            Productivity tools should trigger dopamine, not dread. Bold borders, vibrant accents, and tactile feedback make ticking off a task genuinely satisfying.
          </p>
        </div>

        <div className="bg-white rounded-2xl neo-border neo-shadow p-6 sm:p-8 space-y-3">
          <div className="w-10 h-10 bg-[#fde047] text-black rounded-xl neo-border-sm flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-black text-black">2. Senior Architecture Made Beginner-Friendly</h3>
          <p className="text-sm font-medium text-zinc-600 leading-relaxed">
            No overengineered microservices or 12 layers of indirection. Every file in this codebase exists for a clear reason, following modern full-stack industry standards.
          </p>
        </div>

        <div className="bg-white rounded-2xl neo-border neo-shadow p-6 sm:p-8 space-y-3">
          <div className="w-10 h-10 bg-[#f43f5e] text-white rounded-xl neo-border-sm flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-black text-black">3. Uncompromising Security</h3>
          <p className="text-sm font-medium text-zinc-600 leading-relaxed">
            We never trust client-provided user IDs. Authentication tokens are securely verified in Express, and Supabase Row Level Security (RLS) safeguards every database row.
          </p>
        </div>

        <div className="bg-white rounded-2xl neo-border neo-shadow p-6 sm:p-8 space-y-3">
          <div className="w-10 h-10 bg-[#06b6d4] text-black rounded-xl neo-border-sm flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-black text-black">4. Separation of Concerns</h3>
          <p className="text-sm font-medium text-zinc-600 leading-relaxed">
            The frontend manages client state with Zustand and focuses on UX. The backend Express API manages authorization, validations, and database querying.
          </p>
        </div>
      </div>

      {/* Tech Stack Breakdown */}
      <div className="bg-[#f5f2eb] rounded-3xl neo-border-thick neo-shadow-lg p-6 sm:p-10 mb-16">
        <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight mb-6 flex items-center gap-2">
          <Terminal className="w-6 h-6 text-[#7c3aed]" />
          <span>Full-Stack Architecture Breakdown</span>
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-white rounded-xl neo-border-sm">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-black text-sm text-black">Next.js App Router (v15+) & Tailwind CSS</span>
              <span className="px-2 py-0.5 bg-[#7c3aed] text-white text-[11px] font-black rounded">Frontend</span>
            </div>
            <p className="text-xs text-zinc-600 font-medium leading-relaxed">
              Provides modern server-side and client-side components with instant routing and custom Neo-Brutalist design tokens.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl neo-border-sm">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-black text-sm text-black">Zustand State Management</span>
              <span className="px-2 py-0.5 bg-[#fde047] text-black text-[11px] font-black rounded">Client State</span>
            </div>
            <p className="text-xs text-zinc-600 font-medium leading-relaxed">
              Lightweight, boilerplate-free state store handling active tasks, filters, search query, modal visibility, and optimistic status updates.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl neo-border-sm">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-black text-sm text-black">Node.js + Express.js + TypeScript</span>
              <span className="px-2 py-0.5 bg-[#a3e635] text-black text-[11px] font-black rounded">REST API</span>
            </div>
            <p className="text-xs text-zinc-600 font-medium leading-relaxed">
              Modular REST server with dedicated routes, controllers, services, Bearer token verification middleware, and strict request validation.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl neo-border-sm">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-black text-sm text-black">Supabase PostgreSQL & Row Level Security</span>
              <span className="px-2 py-0.5 bg-[#06b6d4] text-black text-[11px] font-black rounded">Database & Auth</span>
            </div>
            <p className="text-xs text-zinc-600 font-medium leading-relaxed">
              Cloud PostgreSQL with RLS policies ensuring multi-tenant data isolation, coupled with Supabase JWT Auth for password and session handling.
            </p>
          </div>
        </div>
      </div>

      {/* Developer Section */}
      <div className="bg-white rounded-3xl neo-border neo-shadow p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="px-2.5 py-0.5 bg-[#f43f5e] text-white text-xs font-black rounded-md neo-border-sm">
            PORTFOLIO READY
          </span>
          <h3 className="text-2xl font-black text-black">Ready to explore the code?</h3>
          <p className="text-xs sm:text-sm text-zinc-600 font-medium max-w-md">
            Dive into the dashboard, create your first task, or inspect the backend API endpoints.
          </p>
        </div>

        <Link href="/dashboard">
          <Button variant="lime" size="lg" rightIcon={<ArrowRight className="w-5 h-5 stroke-[2.5]" />}>
            Open Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
