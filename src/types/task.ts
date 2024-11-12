export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  created_at: Date;
  deadline?: Date;
  color?: string;
}

export interface UserSettings {
  id?: string;
  user_id?: string;
  theme: 'light' | 'dark' | 'blackout';
  timezone: string;
  name: string;
  avatar?: string;
  notifications?: boolean;
  language?: string;
  privacy?: 'public' | 'private';
  backup?: boolean;
}