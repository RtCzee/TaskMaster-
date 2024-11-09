export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
  deadline?: Date;
  color?: string;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  timezone: string;
  name: string;
  avatar?: string;
}