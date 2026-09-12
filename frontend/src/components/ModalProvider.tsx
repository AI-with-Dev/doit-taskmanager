'use client';

import React from 'react';
import { TaskFormModal } from './TaskFormModal';
import { TaskDetailModal } from './TaskDetailModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';

export const ModalProvider: React.FC = () => {
  return (
    <>
      <TaskFormModal />
      <TaskDetailModal />
      <DeleteConfirmModal />
    </>
  );
};
