'use client';

import React from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { Button } from './Button';
import { AlertTriangle, X } from 'lucide-react';

export const DeleteConfirmModal: React.FC = () => {
  const { isDeleteModalOpen, closeDeleteModal, deleteTask, taskToDelete, isSubmitting } = useTaskStore();

  if (!isDeleteModalOpen || !taskToDelete) return null;

  const handleDelete = async () => {
    await deleteTask(taskToDelete.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#fcfbf9] rounded-3xl neo-border-thick neo-shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 bg-[#f43f5e] border-b-[2.5px] border-black flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
            <h3 className="font-black text-lg uppercase tracking-wide">Confirm Deletion</h3>
          </div>
          <button
            onClick={closeDeleteModal}
            className="p-1 rounded-lg hover:bg-black/20 text-white cursor-pointer transition-colors"
            title="Close"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-sm font-bold text-zinc-800">
            Are you sure you want to permanently delete this task? This action cannot be undone.
          </p>

          <div className="p-3.5 bg-white rounded-xl neo-border-sm text-sm font-black text-black">
            &ldquo;{taskToDelete.title}&rdquo;
          </div>

          <div className="pt-3 border-t border-black/10 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="white"
              size="md"
              onClick={closeDeleteModal}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              size="md"
              onClick={handleDelete}
              isLoading={isSubmitting}
            >
              Delete Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
