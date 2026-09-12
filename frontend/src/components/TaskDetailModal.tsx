'use client';

import React from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { Button } from './Button';
import { PriorityBadge } from './PriorityBadge';
import { StatusBadge } from './StatusBadge';
import { X, Calendar, Tag, Clock, Edit3, Trash2, CheckCircle2, RotateCcw } from 'lucide-react';

export const TaskDetailModal: React.FC = () => {
  const {
    isDetailModalOpen,
    closeDetailModal,
    activeTask,
    toggleTask,
    openEditModal,
    openDeleteModal,
  } = useTaskStore();

  if (!isDetailModalOpen || !activeTask) return null;

  const isCompleted = activeTask.status === 'completed';

  const formatTimestamp = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#fcfbf9] rounded-3xl neo-border-thick neo-shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 bg-[#a3e635] border-b-[2.5px] border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-black">
              Task Details
            </span>
          </div>
          <button
            onClick={closeDetailModal}
            className="p-1 rounded-lg hover:bg-black/10 text-black cursor-pointer transition-colors"
            title="Close"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Status and Priority Meta */}
          <div className="flex items-center justify-between gap-2 flex-wrap pb-3 border-b border-black/10">
            <div className="flex items-center gap-2">
              <PriorityBadge priority={activeTask.priority} size="md" />
              <StatusBadge status={activeTask.status} size="md" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-xl neo-border-sm text-xs font-bold text-black">
              <Tag className="w-3.5 h-3.5 text-[#7c3aed]" />
              <span>{activeTask.category || 'General'}</span>
            </span>
          </div>

          {/* Title */}
          <div>
            <h2 className={`text-2xl font-black text-black leading-tight ${isCompleted ? 'line-through text-zinc-500' : ''}`}>
              {activeTask.title}
            </h2>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500 mb-1">
              Description
            </h4>
            <div className="p-4 bg-white rounded-xl neo-border-sm min-h-[80px] text-sm text-zinc-800 font-medium leading-relaxed whitespace-pre-wrap">
              {activeTask.description || <span className="text-zinc-400 italic">No description provided.</span>}
            </div>
          </div>

          {/* Timing details */}
          <div className="grid grid-cols-2 gap-3 text-xs font-bold text-zinc-600 bg-zinc-100/70 p-3.5 rounded-xl neo-border-sm">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-zinc-500" />
              <div>
                <p className="text-[10px] uppercase font-black text-zinc-400">Due Date</p>
                <p className="text-black">
                  {activeTask.due_date ? new Date(activeTask.due_date).toLocaleDateString() : 'None'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-zinc-500" />
              <div>
                <p className="text-[10px] uppercase font-black text-zinc-400">Created</p>
                <p className="text-black">{formatTimestamp(activeTask.created_at)}</p>
              </div>
            </div>
          </div>

          {/* Actions Bottom Bar */}
          <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-2 flex-wrap">
            <Button
              variant={isCompleted ? 'white' : 'lime'}
              size="sm"
              leftIcon={isCompleted ? <RotateCcw className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />}
              onClick={() => toggleTask(activeTask.id)}
            >
              {isCompleted ? 'Mark Pending' : 'Mark Done'}
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="white"
                size="sm"
                leftIcon={<Edit3 className="w-4 h-4" />}
                onClick={() => {
                  closeDetailModal();
                  openEditModal(activeTask);
                }}
              >
                Edit
              </Button>

              <Button
                variant="danger"
                size="sm"
                leftIcon={<Trash2 className="w-4 h-4" />}
                onClick={() => {
                  closeDetailModal();
                  openDeleteModal(activeTask);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
