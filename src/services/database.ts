import { supabase } from '../supabaseClient';
import { Task, UserSettings } from '../types/task';

export const database = {
  tasks: {
    async getAll() {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },

    async create(task: Omit<Task, 'id' | 'created_at' | 'user_id'>) {
      const { data, error } = await supabase
        .from('tasks')
        .insert([task])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    async update(id: string, updates: Partial<Task>) {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    async delete(id: string) {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    }
  },

  settings: {
    async get() {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },

    async upsert(settings: Partial<UserSettings>) {
      const { data, error } = await supabase
        .from('user_settings')
        .upsert(settings)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  }
}; 