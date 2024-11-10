import React, { useState } from 'react';
import './ThemeSwitcher.css'; // Assuming you have a CSS file for styles

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'blackout'>('light');

  const toggleTheme = (newTheme: 'light' | 'dark' | 'blackout') => {
    setTheme(newTheme);
    document.body.className = newTheme; // Apply the theme to the body
  };

  return (
    <div>
      <button onClick={() => toggleTheme('light')}>Light Mode</button>
      <button onClick={() => toggleTheme('dark')}>Dark Mode</button>
      <button onClick={() => toggleTheme('blackout')}>Blackout Mode</button>
    </div>
  );
};

export default ThemeSwitcher; 