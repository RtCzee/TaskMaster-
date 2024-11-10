import { useState } from 'react';
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  addWeeks,
  subWeeks,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  isToday,
  isSameMonth,
  addMonths,
  subMonths,
  addYears,
  subYears,
  getMonth,
  getYear,
} from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';
import TaskForm from './TaskForm';

type CalendarView = 'day' | 'month' | 'year';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>('month');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { tasks } = useTaskStore();
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const getTasksForDate = (date: Date) =>
    tasks.filter((task) => task.deadline && isSameDay(new Date(task.deadline), date));

  const navigate = (direction: 'prev' | 'next') => {
    switch (view) {
      case 'day':
        setCurrentDate(direction === 'prev' ? subWeeks(currentDate, 1) : addWeeks(currentDate, 1));
        break;
      case 'month':
        setCurrentDate(direction === 'prev' ? subMonths(currentDate, 1) : addMonths(currentDate, 1));
        break;
      case 'year':
        setCurrentDate(direction === 'prev' ? subYears(currentDate, 1) : addYears(currentDate, 1));
        break;
    }
  };

  const renderDayView = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = endOfWeek(currentDate, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start, end });

    return (
      <div className="grid grid-cols-7 gap-4">
        {days.map((day) => {
          const dayTasks = getTasksForDate(day);
          return (
            <div
              key={day.toISOString()}
              className={`min-h-[200px] bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md relative ${
                isToday(day) ? 'ring-2 ring-indigo-500' : ''
              }`}
              onMouseEnter={() => setHoveredDate(day)}
              onMouseLeave={() => setHoveredDate(null)}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {format(day, 'EEEE')}
                  </div>
                  <div className="text-xl font-semibold">{format(day, 'd')}</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDate(day);
                    setIsFormOpen(true);
                  }}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  aria-label="Add Task"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="space-y-2">
                {dayTasks.map((task) => (
                  <div
                    key={task.id}
                    className="text-xs p-1 rounded truncate task-item"
                  >
                    <div className="font-medium">{task.title}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {format(new Date(task.deadline!), 'HH:mm')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMonthView = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const monthStart = startOfWeek(start, { weekStartsOn: 1 });
    const monthEnd = endOfWeek(end, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    return (
      <div className="grid grid-cols-7 gap-1">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day} className="p-2 text-center font-semibold text-gray-600 dark:text-gray-300">
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dayTasks = getTasksForDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          
          return (
            <div
              key={day.toISOString()}
              className={`min-h-[120px] p-2 border border-gray-200 dark:border-gray-700 ${
                !isCurrentMonth ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'
              } ${isToday(day) ? 'ring-2 ring-indigo-500' : ''}`}
              onMouseEnter={() => setHoveredDate(day)}
              onMouseLeave={() => setHoveredDate(null)}
            >
              <div className="flex justify-between items-start">
                <span
                  className={`text-sm font-medium ${
                    !isCurrentMonth ? 'text-gray-400 dark:text-gray-500' : ''
                  }`}
                >
                  {format(day, 'd')}
                </span>
                <button
                  title="Add Task for this date"
                  onClick={() => {
                    setSelectedDate(day);
                    setIsFormOpen(true);
                  }}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <Plus size={14} />
                </button>
              </div>
              <div className="mt-2 space-y-1">
                {dayTasks.map((task) => (
                  <div
                    key={task.id}
                    className="text-xs p-1 rounded truncate task-item"
                  >
                    {task.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderYearView = () => {
    const months = eachDayOfInterval({
      start: startOfYear(currentDate),
      end: endOfYear(currentDate),
    }).filter((date) => date.getDate() === 1);

    return (
      <div className="grid grid-cols-3 gap-4 md:grid-cols-4">
        {months.map((month) => {
          const monthTasks = tasks.filter(
            (task) =>
              task.deadline && getMonth(new Date(task.deadline)) === getMonth(month) &&
              getYear(new Date(task.deadline)) === getYear(month)
          );

          return (
            <button
              key={month.toISOString()}
              onClick={() => {
                setCurrentDate(month);
                setView('month');
              }}
              className={`p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                isSameMonth(month, new Date()) ? 'ring-2 ring-indigo-500' : ''
              }`}
            >
              <div className="text-lg font-semibold mb-2">{format(month, 'MMMM')}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {monthTasks.length} tasks
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold">Calendar</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-1">
            {(['day', 'month', 'year'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1 rounded ${
                  view === v
                    ? 'bg-indigo-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => navigate('prev')}
              aria-label="Previous Month"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="font-medium min-w-32 text-center">
              {format(
                currentDate,
                view === 'year' ? 'yyyy' : view === 'month' ? 'MMMM yyyy' : 'MMM d, yyyy'
              )}
            </span>
            <button
              title="Next"
              onClick={() => navigate('next')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        {view === 'day' && renderDayView()}
        {view === 'month' && renderMonthView()}
        {view === 'year' && renderYearView()}
      </div>

      {hoveredDate && (
        <div className="text-sm text-gray-500">
          Hovered Date: {format(hoveredDate, 'MMMM d, yyyy')}
        </div>
      )}

      {isFormOpen && (
        <TaskForm
          onClose={() => {
            setIsFormOpen(false);
            setSelectedDate(null);
          }}
          initialDate={selectedDate || undefined}
        />
      )}
    </div>
  );
};

export default Calendar;