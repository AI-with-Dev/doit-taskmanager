'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '../../store/useAuthStore';
import { useTaskStore } from '../../store/useTaskStore';
import { StatsCard } from '../../components/StatsCard';
import { Button } from '../../components/Button';
import { LoadingState } from '../../components/LoadingState';
import {
  BarChart3,
  CheckCircle2,
  Clock,
  Flame,
  Sparkles,
  Trophy,
  Zap,
  Target,
  ArrowRight,
  CheckSquare,
} from 'lucide-react';

export default function ProductivityPage() {
  const { user, isLoading: authLoading, signInDemo } = useAuthStore();
  const { summary, tasks, isLoading, fetchSummary, fetchTasks } = useTaskStore();

  useEffect(() => {
    if (!authLoading && user) {
      fetchSummary();
      fetchTasks();
    }
  }, [authLoading, user, fetchSummary, fetchTasks]);

  if (!authLoading && !user) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl neo-border-thick neo-shadow-xl p-8 max-w-md text-center space-y-4">
          <div className="w-14 h-14 bg-[#06b6d4] text-black rounded-2xl neo-border-sm flex items-center justify-center mx-auto">
            <CheckSquare className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-black text-black">Sign in to view Productivity Stats</h2>
          <p className="text-xs font-bold text-zinc-600">
            Track your completion metrics, priority distributions, and productivity streaks.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Button
              variant="lime"
              size="md"
              onClick={() => {
                signInDemo();
                fetchSummary();
                fetchTasks();
              }}
              className="w-full"
            >
              Continue in Demo Mode
            </Button>
            <Link href="/login" className="w-full">
              <Button variant="white" size="md" className="w-full">
                Go to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const total = summary?.total ?? tasks.length;
  const completed = summary?.completed ?? tasks.filter((t) => t.status === 'completed').length;
  const pending = summary?.pending ?? tasks.filter((t) => t.status === 'pending').length;
  const completionRate = summary?.completion_rate ?? (total > 0 ? Math.round((completed / total) * 100) : 0);
  const highPriorityPending = summary?.high_priority_pending ?? tasks.filter((t) => t.status === 'pending' && t.priority === 'high').length;

  const byPriority = summary?.by_priority ?? {
    high: tasks.filter((t) => t.priority === 'high').length,
    medium: tasks.filter((t) => t.priority === 'medium').length,
    low: tasks.filter((t) => t.priority === 'low').length,
  };

  const byCategory = summary?.by_category ?? {};

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#a3e635] text-black text-xs font-black rounded-lg neo-border-sm mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>METRICS & INSIGHTS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
            Productivity Summary
          </h1>
          <p className="text-xs sm:text-sm font-bold text-zinc-600 mt-1">
            Real-time analytics of your completed goals and momentum
          </p>
        </div>

        <Link href="/tasks">
          <Button variant="white" size="md" rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}>
            Manage Tasks
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <LoadingState message="Calculating productivity statistics..." count={4} />
      ) : (
        <>
          {/* Top Big Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatsCard
              title="Completion Velocity"
              value={`${completionRate}%`}
              subtitle={total > 0 ? `${completed} of ${total} tasks finished` : 'No tasks recorded'}
              icon={<Trophy className="w-6 h-6 stroke-[2.5]" />}
              accentColor="lime"
              progress={completionRate}
            />

            <StatsCard
              title="Tasks Completed"
              value={completed}
              subtitle="Goals crossed off your list"
              icon={<CheckCircle2 className="w-6 h-6 stroke-[2.5]" />}
              accentColor="purple"
            />

            <StatsCard
              title="Active Backlog"
              value={pending}
              subtitle="Tasks currently in progress"
              icon={<Clock className="w-6 h-6 stroke-[2.5]" />}
              accentColor="yellow"
            />

            <StatsCard
              title="High Priority Alert"
              value={highPriorityPending}
              subtitle={highPriorityPending > 0 ? 'Urgent goals to complete' : 'Inbox clear of urgent items'}
              icon={<Flame className="w-6 h-6 stroke-[2.5]" />}
              accentColor="pink"
            />
          </div>

          {/* Breakdown Section: Priority & Category */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Priority Distribution Card */}
            <div className="bg-white rounded-3xl neo-border neo-shadow p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-black/10">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#7c3aed]" />
                  <h3 className="font-black text-xl text-black">Priority Breakdown</h3>
                </div>
                <span className="text-xs font-black uppercase text-zinc-500">Distribution</span>
              </div>

              <div className="space-y-4">
                {/* High */}
                <div>
                  <div className="flex justify-between items-center text-xs font-black mb-1.5">
                    <span className="flex items-center gap-1 text-[#f43f5e]">
                      <Flame className="w-3.5 h-3.5" /> High Priority
                    </span>
                    <span>{byPriority.high} tasks</span>
                  </div>
                  <div className="w-full bg-zinc-100 h-3 rounded-full neo-border-sm overflow-hidden p-0.5">
                    <div
                      className="bg-[#f43f5e] h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${total > 0 ? (byPriority.high / total) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Medium */}
                <div>
                  <div className="flex justify-between items-center text-xs font-black mb-1.5">
                    <span className="flex items-center gap-1 text-amber-600">
                      <Clock className="w-3.5 h-3.5" /> Medium Priority
                    </span>
                    <span>{byPriority.medium} tasks</span>
                  </div>
                  <div className="w-full bg-zinc-100 h-3 rounded-full neo-border-sm overflow-hidden p-0.5">
                    <div
                      className="bg-[#fde047] h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${total > 0 ? (byPriority.medium / total) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Low */}
                <div>
                  <div className="flex justify-between items-center text-xs font-black mb-1.5">
                    <span className="flex items-center gap-1 text-emerald-600">
                      <Zap className="w-3.5 h-3.5" /> Low Priority
                    </span>
                    <span>{byPriority.low} tasks</span>
                  </div>
                  <div className="w-full bg-zinc-100 h-3 rounded-full neo-border-sm overflow-hidden p-0.5">
                    <div
                      className="bg-[#a7f3d0] h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${total > 0 ? (byPriority.low / total) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Category Breakdown Card */}
            <div className="bg-white rounded-3xl neo-border neo-shadow p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-black/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#a3e635]" />
                  <h3 className="font-black text-xl text-black">Category Breakdown</h3>
                </div>
                <span className="text-xs font-black uppercase text-zinc-500">By Area</span>
              </div>

              {Object.keys(byCategory).length === 0 ? (
                <p className="text-xs font-bold text-zinc-500 italic py-6 text-center">
                  No category data recorded yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(byCategory).map(([cat, count]) => {
                    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                    return (
                      <div key={cat}>
                        <div className="flex justify-between items-center text-xs font-black mb-1">
                          <span className="text-black">📂 {cat}</span>
                          <span className="text-zinc-600">
                            {count} ({pct}%)
                          </span>
                        </div>
                        <div className="w-full bg-zinc-100 h-2.5 rounded-full neo-border-sm overflow-hidden p-0.5">
                          <div
                            className="bg-[#7c3aed] h-full rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Motivational Badges Section */}
          <div className="bg-[#f5f2eb] rounded-3xl neo-border-thick neo-shadow p-6 sm:p-8">
            <h3 className="font-black text-lg text-black mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#f43f5e]" />
              <span>Productivity Milestones</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                className={`p-4 rounded-2xl neo-border-sm ${
                  completionRate >= 50 ? 'bg-[#a3e635] text-black' : 'bg-white/60 text-zinc-400 opacity-60'
                }`}
              >
                <div className="font-black text-sm">⚡️ Velocity Master</div>
                <div className="text-[11px] font-bold mt-0.5">Over 50% tasks completed</div>
              </div>

              <div
                className={`p-4 rounded-2xl neo-border-sm ${
                  highPriorityPending === 0 && total > 0
                    ? 'bg-[#fde047] text-black'
                    : 'bg-white/60 text-zinc-400 opacity-60'
                }`}
              >
                <div className="font-black text-sm">🛡️ No Urgent Blockers</div>
                <div className="text-[11px] font-bold mt-0.5">0 high-priority bottlenecks</div>
              </div>

              <div
                className={`p-4 rounded-2xl neo-border-sm ${
                  completionRate === 100 && total > 0
                    ? 'bg-[#06b6d4] text-black'
                    : 'bg-white/60 text-zinc-400 opacity-60'
                }`}
              >
                <div className="font-black text-sm">🏆 100% Inbox Zero Hero</div>
                <div className="text-[11px] font-bold mt-0.5">All created tasks conquered</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
