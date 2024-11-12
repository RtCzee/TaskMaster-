import { useState, useEffect } from 'react';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';
import TaskForm from './TaskForm';
import { format } from 'date-fns';
import { database } from '../services/database';

const Dashboard = () => {
  const { tasks, setTasks } = useTaskStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const statusColors = {
    todo: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    done: 'bg-green-100 text-green-800',
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const tasks = await database.tasks.getAll();
        setTasks(tasks);
      } catch (err) {
        setError('Failed to fetch tasks');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tasks Dashboard</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-indigo-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-indigo-600 transition-colors"
        >
          <Plus size={20} />
          <span>Add Task</span>
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-left-${task.color ? task.color : 'default-color'}`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{task.title}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  statusColors[task.status]
                }`}
              >
                {task.status}
              </span>
            </div>
            {task.description && (
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                {task.description}
              </p>
            )}
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <div className="flex items-center space-x-1">
                <span>Created: {format(task.createdAt, 'PPp')}</span>
              </div>
              {task.deadline && (
                <div className="flex items-center space-x-1">
                  <CalendarIcon size={12} />
                  <span>Due: {format(task.deadline, 'PPp')}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && <TaskForm onClose={() => setIsFormOpen(false)} />}
    </div>
  );
};

export default Dashboard;