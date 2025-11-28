import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  onClick?: () => void;
}

export function ThemeToggle({ onClick }: ThemeToggleProps) {
  const { theme } = useTheme();

  return (
    <button
      onClick={onClick}
      className="
        w-9 h-9
        p-2
        rounded-lg
        transition-all duration-200
        hover:bg-lightTertiary dark:hover:bg-darkTertiary
        active:scale-95
        focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:ring-offset-2
        hidden sm:block
        bg-lightBg dark:bg-darkSecondary
        border-2 border-transparent hover:border-lightBorder dark:hover:border-darkBorderLight
      "
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-lightText dark:text-darkText transition-all duration-300 hover:rotate-180" />
      ) : (
        <Sun className="w-5 h-5 text-warning-dark transition-all duration-300 hover:rotate-180" />
      )}
    </button>
  );
}