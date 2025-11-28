import React from 'react';
import { Tab } from '../types';

interface TabCounterProps {
  tabs: Tab[];
  onClick: () => void;
}

export function TabCounter({ tabs, onClick }: TabCounterProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-9 h-9 text-sm font-semibold rounded-lg 
        bg-lightTertiary dark:bg-darkTertiary hover:bg-lightBorder dark:hover:bg-darkBorder
        text-lightText dark:text-darkText transition-all duration-200 active:scale-95
        border-2 border-lightBorder dark:border-darkBorderLight"
      aria-label={`${tabs.length} tabs open`}
    >
      {tabs.length}
    </button>
  );
}