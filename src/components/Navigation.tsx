import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar as CalendarIcon, Settings as SettingsIcon } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold">TaskMaster</h1>
            <div className="flex space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md ${
                    isActive
                      ? 'bg-indigo-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="/calendar"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md ${
                    isActive
                      ? 'bg-indigo-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <CalendarIcon size={20} />
                <span>Calendar</span>
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md ${
                    isActive
                      ? 'bg-indigo-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <SettingsIcon size={20} />
                <span>Settings</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;