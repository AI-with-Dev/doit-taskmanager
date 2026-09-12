'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/Button';
import {
  CheckSquare,
  Sparkles,
  ArrowRight,
  Flame,
  Zap,
  ShieldCheck,
  BarChart3,
  Calendar,
  CheckCircle2,
  ListTodo,
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const { signInDemo } = useAuthStore();

  const handleDemoLaunch = () => {
    signInDemo();
    router.push('/dashboard');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Subtle decorative background stickers */}
        <div className="absolute top-10 right-10 hidden lg:block tilt-right pointer-events-none">
          <div className="px-4 py-2 bg-[#a3e635] text-black font-black text-sm rounded-xl neo-border neo-shadow">
            ⚡️ NO BORING CORP APPS
          </div>
        </div>
        <div className="absolute bottom-16 left-8 hidden lg:block tilt-left pointer-events-none">
          <div className="px-4 py-2 bg-[#f43f5e] text-white font-black text-sm rounded-xl neo-border neo-shadow">
            🔥 100% DOPAMINE GUARANTEE
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fde047] text-black text-xs font-black neo-border mb-6 tilt-left hover:rotate-0 transition-transform">
            <Sparkles className="w-4 h-4 text-black" />
            <span>The Gen-Z Neo-Brutalist Task Manager</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-black tracking-tight leading-[0.95] mb-6">
            Get stuff done. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] via-[#f43f5e] to-[#06b6d4]">
              Actually.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-zinc-700 font-bold max-w-2xl mx-auto mb-8 leading-relaxed">
            Stop drowning in complex enterprise project tools. DO.IT brings high-energy neo-brutalist aesthetics, instant keyboard shortcuts, and real productivity flow.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5 stroke-[2.5]" />}
                className="w-full sm:w-auto"
              >
                Start Free Today
              </Button>
            </Link>

            <Button
              variant="lime"
              size="lg"
              onClick={handleDemoLaunch}
              leftIcon={<Zap className="w-5 h-5 stroke-[2.5]" />}
              className="w-full sm:w-auto"
            >
              Explore Live Demo
            </Button>
          </div>
        </div>

        {/* Decorative Floating Cards Showcase */}
        <div className="mt-16 sm:mt-20 max-w-4xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl neo-border neo-shadow p-5 tilt-left hover:rotate-0 transition-transform">
              <div className="flex justify-between items-center mb-3">
                <span className="px-2 py-0.5 bg-[#f43f5e] text-white text-xs font-black rounded-lg neo-border-sm flex items-center gap-1">
                  <Flame className="w-3 h-3" /> HIGH
                </span>
                <span className="text-xs font-bold text-zinc-500">Tomorrow</span>
              </div>
              <h4 className="font-black text-base text-black mb-1">Ship the MVP to real testers</h4>
              <p className="text-xs text-zinc-600 font-medium">Collect feedback from early users on X & Discord.</p>
              <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between text-xs font-bold">
                <span className="px-2 py-0.5 bg-zinc-100 rounded neo-border-sm">#Launch</span>
                <span className="text-[#a3e635] font-black">⚡️ Pending</span>
              </div>
            </div>

            {/* Card 2 (Hero Focus) */}
            <div className="bg-[#fde047] rounded-2xl neo-border neo-shadow-lg p-5 -translate-y-2 z-10">
              <div className="flex justify-between items-center mb-3">
                <span className="px-2 py-0.5 bg-black text-white text-xs font-black rounded-lg">
                  DONE ✓
                </span>
                <span className="text-xs font-bold text-black">Today</span>
              </div>
              <h4 className="font-black text-base text-black mb-1 line-through">
                Supabase Row Level Security
              </h4>
              <p className="text-xs text-black/70 font-medium line-through">
                Strict multi-tenant PostgreSQL policies configured.
              </p>
              <div className="mt-4 pt-3 border-t border-black/15 flex items-center justify-between text-xs font-bold">
                <span className="px-2 py-0.5 bg-white text-black rounded neo-border-sm">#Backend</span>
                <span className="font-black text-black">100% Secured</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl neo-border neo-shadow p-5 tilt-right hover:rotate-0 transition-transform">
              <div className="flex justify-between items-center mb-3">
                <span className="px-2 py-0.5 bg-[#a7f3d0] text-black text-xs font-black rounded-lg neo-border-sm">
                  LOW
                </span>
                <span className="text-xs font-bold text-zinc-500">Friday</span>
              </div>
              <h4 className="font-black text-base text-black mb-1">Drink iced matcha & vibe</h4>
              <p className="text-xs text-zinc-600 font-medium">Recharge creativity after high-velocity sprint.</p>
              <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between text-xs font-bold">
                <span className="px-2 py-0.5 bg-zinc-100 rounded neo-border-sm">#Wellness</span>
                <span className="text-purple-600 font-black">✨ Self-care</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8 border-y-[3px] border-black">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl sm:text-5xl font-black text-[#a3e635] tracking-tight">100%</div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-400 mt-1">
              Beginner Understandable
            </p>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-black text-[#fde047] tracking-tight">0%</div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-400 mt-1">
              Boring Bloatware
            </p>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-black text-[#06b6d4] tracking-tight">&lt; 50ms</div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-400 mt-1">
              Express API Response
            </p>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-black text-[#f43f5e] tracking-tight">RLS</div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-400 mt-1">
              PostgreSQL Security
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURES SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight mb-4">
            Everything you need. <br />
            Nothing you don&apos;t.
          </h2>
          <p className="text-zinc-600 font-bold text-base">
            Engineered with a laser focus on productivity and crystal-clear code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-3xl neo-border neo-shadow p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#7c3aed] text-white rounded-xl neo-border-sm neo-shadow-sm flex items-center justify-center mb-6">
                <ListTodo className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-black mb-2">Fast Task Management</h3>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                Create, edit, toggle, and delete tasks in seconds. Full priority tags, categories, and due dates keep you completely organized.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/10 text-xs font-black text-[#7c3aed] flex items-center gap-1">
              <span>Full CRUD Supported</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-3xl neo-border neo-shadow p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#a3e635] text-black rounded-xl neo-border-sm neo-shadow-sm flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-black mb-2">Productivity Breakdown</h3>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                Gain instant clarity over your progress with completion meters, high-priority counts, and category distributions.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/10 text-xs font-black text-black flex items-center gap-1">
              <span>Real-Time Summaries</span>
              <CheckCircle2 className="w-4 h-4 text-[#84cc16]" />
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-3xl neo-border neo-shadow p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#06b6d4] text-black rounded-xl neo-border-sm neo-shadow-sm flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-black mb-2">Row-Level Security</h3>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                Supabase Auth and PostgreSQL RLS ensure each user can strictly and exclusively access their own records.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/10 text-xs font-black text-black flex items-center gap-1">
              <span>Enterprise Grade Auth</span>
              <CheckCircle2 className="w-4 h-4 text-[#06b6d4]" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="bg-[#f5f2eb] py-20 px-4 sm:px-6 lg:px-8 border-t-[2.5px] border-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3 py-1 bg-[#f43f5e] text-white text-xs font-black rounded-md neo-border-sm">
              SIMPLE 3-STEP FLOW
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight mt-3 mb-2">
              How It Works
            </h2>
            <p className="text-zinc-600 font-bold text-sm">
              No complicated onboarding checklists or hour-long webinars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl neo-border neo-shadow p-6 text-center">
              <div className="w-12 h-12 bg-[#fde047] text-black rounded-full neo-border-sm flex items-center justify-center mx-auto text-xl font-black mb-4">
                1
              </div>
              <h4 className="text-xl font-black mb-2">Create a Task</h4>
              <p className="text-xs font-medium text-zinc-600">
                Hit &ldquo;New Task&rdquo;, name your goal, set the priority, and pick a category.
              </p>
            </div>

            <div className="bg-white rounded-2xl neo-border neo-shadow p-6 text-center">
              <div className="w-12 h-12 bg-[#a3e635] text-black rounded-full neo-border-sm flex items-center justify-center mx-auto text-xl font-black mb-4">
                2
              </div>
              <h4 className="text-xl font-black mb-2">Crush It</h4>
              <p className="text-xs font-medium text-zinc-600">
                Focus on high-priority items. Click the checkbox when completed for instant dopamine.
              </p>
            </div>

            <div className="bg-white rounded-2xl neo-border neo-shadow p-6 text-center">
              <div className="w-12 h-12 bg-[#06b6d4] text-black rounded-full neo-border-sm flex items-center justify-center mx-auto text-xl font-black mb-4">
                3
              </div>
              <h4 className="text-xl font-black mb-2">Level Up</h4>
              <p className="text-xs font-medium text-zinc-600">
                Review your productivity summary and watch your completion rate hit 100%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA BANNER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center">
        <div className="bg-[#7c3aed] text-white rounded-3xl neo-border-thick neo-shadow-xl p-8 sm:p-14 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Ready to supercharge your daily productivity?
            </h2>
            <p className="text-zinc-200 text-sm sm:text-base font-bold">
              Join the new wave of developers and creators getting actual things done with zero corporate fluff.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup">
                <Button variant="lime" size="lg" className="w-full sm:w-auto">
                  Create Your Free Account
                </Button>
              </Link>
              <Button
                variant="white"
                size="lg"
                onClick={handleDemoLaunch}
                className="w-full sm:w-auto"
              >
                Launch Demo Mode
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
