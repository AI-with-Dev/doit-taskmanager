'use client';

import React, { useState, useEffect } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { Button } from './Button';
import { X, Sparkles, AlertCircle } from 'lucide-react';
import { TaskPriority, TaskStatus } from '../types/task';

const CATEGORY_OPTIONS = ['General', 'Launch', 'Design', 'Marketing', 'DevOps', 'Wellness', 'Personal'];

export const TaskFormModal: React.FC = () => {
  const {
    isCreateModalOpen,
    isEditModalOpen,
    closeCreateModal,
    closeEditModal,
    addTask,
    updateTask,
    activeTask,
    isSubmitting,
    error: storeError,
  } = useTaskStore();

  const isOpen = isCreateModalOpen || isEditModalOpen;
  const isEditing = isEditModalOpen && Boolean(activeTask);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [category, setCategory] = useState('General');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<TaskStatus>('pending');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Sync form values when editing a task
  useEffect(() => {
    if (isEditing && activeTask) {
      setTitle(activeTask.title);
      setDescription(activeTask.description || '');
      setPriority(activeTask.priority);
      setCategory(activeTask.category || 'General');
      setStatus(activeTask.status);
      setDueDate(
        activeTask.due_date ? new Date(activeTask.due_date).toISOString().split('T')[0] : ''
      );
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setCategory('General');
      setStatus('pending');
      setDueDate('');
    }
    setValidationError(null);
  }, [isEditing, activeTask, isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    if (isEditing) {
      closeEditModal();
    } else {
      closeCreateModal();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setValidationError('Please provide a title for your task.');
      return;
    }

    setValidationError(null);

    const payload = {
      title: title.trim(),
      description: description.trim(),
      priority,
      category: category.trim() || 'General',
      due_date: dueDate ? new Date(dueDate).toISOString() : null,
    };

    if (isEditing && activeTask) {
      await updateTask(activeTask.id, {
        ...payload,
        status,
      });
    } else {
      await addTask(payload);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#fcfbf9] rounded-3xl neo-border-thick neo-shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#fde047] border-b-[2.5px] border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-black text-white rounded-lg neo-border-sm">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="font-black text-lg text-black uppercase tracking-wide">
              {isEditing ? 'Edit Task' : 'Create New Task'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg hover:bg-black/10 text-black cursor-pointer transition-colors"
            title="Close"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {(validationError || storeError) && (
            <div className="p-3 bg-red-100 rounded-xl neo-border-sm border-red-800 text-red-900 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 stroke-[2.5]" />
              <span>{validationError || storeError}</span>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-black uppercase text-zinc-700 mb-1">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ship the new landing page hero"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-white rounded-xl neo-border-sm text-sm font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-black uppercase text-zinc-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Add extra context, links, or notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 bg-white rounded-xl neo-border-sm text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
          </div>

          {/* Priority Selection */}
          <div>
            <label className="block text-xs font-black uppercase text-zinc-700 mb-1.5">
              Priority Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['low', 'medium', 'high'] as TaskPriority[]).map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`py-2 px-3 rounded-xl font-black text-xs uppercase transition-all cursor-pointer ${
                    priority === p
                      ? p === 'high'
                        ? 'bg-[#f43f5e] text-white neo-shadow-sm neo-border-sm'
                        : p === 'medium'
                        ? 'bg-[#fde047] text-black neo-shadow-sm neo-border-sm'
                        : 'bg-[#a7f3d0] text-black neo-shadow-sm neo-border-sm'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 neo-border-sm'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Category and Due Date Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Category */}
            <div>
              <label className="block text-xs font-black uppercase text-zinc-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-white rounded-xl neo-border-sm text-sm font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#7c3aed] cursor-pointer"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-xs font-black uppercase text-zinc-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-white rounded-xl neo-border-sm text-sm font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#7c3aed] cursor-pointer"
              />
            </div>
          </div>

          {/* Status (Only shown when editing) */}
          {isEditing && (
            <div>
              <label className="block text-xs font-black uppercase text-zinc-700 mb-1.5">
                Current Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['pending', 'completed'] as TaskStatus[]).map((st) => (
                  <button
                    type="button"
                    key={st}
                    onClick={() => setStatus(st)}
                    className={`py-2 px-3 rounded-xl font-black text-xs uppercase cursor-pointer transition-all ${
                      status === st
                        ? st === 'completed'
                          ? 'bg-[#a3e635] text-black neo-shadow-sm neo-border-sm'
                          : 'bg-[#fde047] text-black neo-shadow-sm neo-border-sm'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 neo-border-sm'
                    }`}
                  >
                    {st === 'completed' ? '✓ Completed' : '⏳ Pending'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Modal Action Buttons */}
          <div className="pt-4 border-t border-black/10 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="white"
              size="md"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant={isEditing ? 'primary' : 'lime'}
              size="md"
              isLoading={isSubmitting}
            >
              {isEditing ? 'Save Changes' : 'Create Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
