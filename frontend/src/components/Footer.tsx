import React from 'react';
import Link from 'next/link';
import { CheckSquare, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t-[2.5px] border-black bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#7c3aed] text-white rounded-lg neo-border-sm flex items-center justify-center">
                <CheckSquare className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-black text-xl tracking-tight">
                DO<span className="text-[#7c3aed]">.</span>IT
              </span>
              <span className="px-2 py-0.5 text-[10px] font-black bg-[#fde047] text-black rounded-md neo-border-sm">
                V1.0
              </span>
            </div>
            <p className="text-zinc-600 text-sm max-w-sm font-medium">
              The funky, Gen-Z styled task manager built for people who actually want to get things done without boring corporate clutter.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#a3e635] text-black text-xs font-bold neo-border-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Stack Mentorship Architecture</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-black text-xs uppercase tracking-wider text-zinc-500">Navigation</h4>
            <ul className="space-y-1.5 text-sm font-bold">
              <li>
                <Link href="/dashboard" className="text-zinc-700 hover:text-black hover:underline">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/tasks" className="text-zinc-700 hover:text-black hover:underline">
                  Tasks Center
                </Link>
              </li>
              <li>
                <Link href="/productivity" className="text-zinc-700 hover:text-black hover:underline">
                  Productivity Stats
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-700 hover:text-black hover:underline">
                  About Philosophy
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech Stack Column */}
          <div className="space-y-2">
            <h4 className="font-black text-xs uppercase tracking-wider text-zinc-500">Tech Stack</h4>
            <div className="flex flex-wrap gap-1.5 text-xs font-bold">
              <span className="px-2 py-1 bg-[#f1ede4] rounded-md neo-border-sm">Next.js App Router</span>
              <span className="px-2 py-1 bg-[#f1ede4] rounded-md neo-border-sm">Express.js API</span>
              <span className="px-2 py-1 bg-[#f1ede4] rounded-md neo-border-sm">Supabase PostgreSQL</span>
              <span className="px-2 py-1 bg-[#f1ede4] rounded-md neo-border-sm">Zustand</span>
              <span className="px-2 py-1 bg-[#f1ede4] rounded-md neo-border-sm">Tailwind CSS</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-black/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-zinc-600">
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>as a production-grade beginner reference project.</span>
          </div>
          <div>
            <span>© {new Date().getFullYear()} DO.IT Tasks. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
