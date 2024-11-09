import { create } from 'zustand';
import { Task, UserSettings } from '../types/task';

interface TaskStore {
  tasks: Task[];
  settings: UserSettings;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  settings: {
    theme: 'light',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    name: 'User',
  },
  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...task,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        },
      ],
    })),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
}));