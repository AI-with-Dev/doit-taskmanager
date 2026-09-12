'use client';

import React from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { Search, X, Filter, RotateCcw } from 'lucide-react';
import { Button } from './Button';

const CATEGORIES = ['all', 'General', 'Launch', 'Design', 'Marketing', 'DevOps', 'Wellness', 'Personal'];

export const FilterBar: React.FC = () => {
  const { filters, setFilter, resetFilters } = useTaskStore();

  const isFiltered =
    filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.category !== 'all' ||
    filters.search.trim() !== '';

  return (
    <div className="bg-white rounded-2xl neo-border neo-shadow p-4 sm:p-5 mb-8 space-y-4">
      {/* Top Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 stroke-[2.5]" />
          <input
            type="text"
            placeholder="Search tasks by title or description..."
            value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
            className="w-full pl-11 pr-10 py-2.5 bg-zinc-50 rounded-xl neo-border-sm text-sm font-bold text-black placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#7c3aed]"
          />
          {filters.search && (
            <button
              onClick={() => setFilter('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-black cursor-pointer p-1"
              title="Clear search"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="relative sm:w-48">
          <select
            value={filters.category}
            onChange={(e) => setFilter('category', e.target.value)}
            className="w-full px-3 py-2.5 bg-zinc-50 rounded-xl neo-border-sm text-sm font-bold text-black focus:outline-none focus:bg-white cursor-pointer"
            aria-label="Filter tasks by category"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? '📁 All Categories' : `📂 ${cat}`}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Filters Button */}
        {isFiltered && (
          <Button
            variant="white"
            size="sm"
            onClick={resetFilters}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            className="shrink-0"
          >
            Reset
          </Button>
        )}
      </div>

      {/* Filter Pills: Status and Priority */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-black/10">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-black uppercase text-zinc-500 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Status:
          </span>
          {[
            { id: 'all', label: 'All' },
            { id: 'pending', label: 'Pending' },
            { id: 'completed', label: 'Done' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter('status', item.id)}
              className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                filters.status === item.id
                  ? 'bg-black text-white neo-shadow-sm neo-border-sm'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 neo-border-sm'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Priority Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-black uppercase text-zinc-500 mr-1">Priority:</span>
          {[
            { id: 'all', label: 'All' },
            { id: 'high', label: 'High', color: 'hover:bg-[#f43f5e] hover:text-white' },
            { id: 'medium', label: 'Medium', color: 'hover:bg-[#fde047]' },
            { id: 'low', label: 'Low', color: 'hover:bg-[#a7f3d0]' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter('priority', item.id)}
              className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                filters.priority === item.id
                  ? 'bg-[#7c3aed] text-white neo-shadow-sm neo-border-sm'
                  : `bg-zinc-100 text-zinc-700 neo-border-sm ${item.color || 'hover:bg-zinc-200'}`
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
