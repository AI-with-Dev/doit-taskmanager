'use client';

import React from 'react';
import { Task } from '../types/task';
import { useTaskStore } from '../store/useTaskStore';
import { PriorityBadge } from './PriorityBadge';
import { StatusBadge } from './StatusBadge';
import { Calendar, Tag, Trash2, Edit3, Eye, Clock } from 'lucide-react';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { toggleTask, openEditModal, openDeleteModal, openDetailModal } = useTaskStore();
  const isCompleted = task.status === 'completed';

  // Format due date & calculate overdue status
  const formatDueDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const isOverdue = !isCompleted && date < now;
    const formatted = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    return { formatted, isOverdue };
  };

  const dueInfo = formatDueDate(task.due_date);

  return (
    <div
      className={`rounded-2xl neo-border neo-shadow p-5 flex flex-col justify-between transition-all duration-200 relative group neo-card-hover ${
        isCompleted
          ? 'bg-zinc-50 border-zinc-900 opacity-90'
          : 'bg-white'
      }`}
    >
      {/* Top Meta Bar */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <PriorityBadge priority={task.priority} size="sm" />
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-zinc-100 text-zinc-700 text-xs font-bold neo-border-sm">
              <Tag className="w-2.5 h-2.5" />
              <span>{task.category || 'General'}</span>
            </span>
          </div>

          <StatusBadge status={task.status} size="sm" />
        </div>

        {/* Checkbox and Title */}
        <div className="flex items-start gap-3 my-2">
          <div className="pt-0.5 shrink-0">
            <input
              type="checkbox"
              id={`task-check-${task.id}`}
              checked={isCompleted}
              onChange={() => toggleTask(task.id)}
              className="neo-checkbox cursor-pointer"
              title={isCompleted ? 'Mark as pending' : 'Mark as completed'}
              aria-label={`Mark task ${task.title} as ${isCompleted ? 'pending' : 'completed'}`}
            />
          </div>

          <div
            onClick={() => openDetailModal(task)}
            className="cursor-pointer flex-1"
          >
            <h4
              className={`font-black text-lg leading-snug tracking-tight text-black transition-colors ${
                isCompleted ? 'line-through text-zinc-500 font-bold' : 'hover:text-[#7c3aed]'
              }`}
            >
              {task.title}
            </h4>

            {task.description && (
              <p
                className={`text-xs mt-1.5 line-clamp-2 leading-relaxed font-medium ${
                  isCompleted ? 'text-zinc-400 line-through' : 'text-zinc-600'
                }`}
              >
                {task.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="pt-4 mt-3 border-t border-black/10 flex items-center justify-between gap-2">
        {/* Due Date Indicator */}
        <div className="flex items-center gap-1 text-xs font-bold">
          {dueInfo ? (
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${
                dueInfo.isOverdue
                  ? 'bg-[#f43f5e] text-white neo-border-sm'
                  : 'bg-zinc-100 text-zinc-700 neo-border-sm'
              }`}
            >
              {dueInfo.isOverdue ? (
                <Clock className="w-3 h-3 stroke-[2.5]" />
              ) : (
                <Calendar className="w-3 h-3 stroke-[2]" />
              )}
              <span>{dueInfo.formatted}</span>
              {dueInfo.isOverdue && <span className="text-[10px] uppercase font-black ml-0.5">Late</span>}
            </span>
          ) : (
            <span className="text-zinc-400 text-xs font-medium">No due date</span>
          )}
        </div>

        {/* Card Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => openDetailModal(task)}
            className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-black neo-border-sm transition-colors cursor-pointer"
            title="View Details"
            aria-label="View task details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => openEditModal(task)}
            className="p-1.5 rounded-lg bg-[#fde047] hover:bg-[#facc15] text-black neo-border-sm transition-colors cursor-pointer"
            title="Edit Task"
            aria-label="Edit task"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => openDeleteModal(task)}
            className="p-1.5 rounded-lg bg-[#f43f5e] hover:bg-[#e11d48] text-white neo-border-sm transition-colors cursor-pointer"
            title="Delete Task"
            aria-label="Delete task"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
