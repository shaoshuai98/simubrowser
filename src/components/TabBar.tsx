import React from 'react';
import { Plus, X } from 'lucide-react';
import { Tab, getDomainFromUrl } from '../types';

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string;
  onTabSelect: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  onNewTab: () => void;
  isNewTabPage?: boolean;
}

export function TabBar({
  tabs,
  activeTabId,
  onTabSelect,
  onTabClose,
  onNewTab,
  isNewTabPage = false,
}: TabBarProps) {
  return (
    <div className="relative flex items-center bg-lightSecondary dark:bg-darkBg px-2 hidden sm:flex border-b border-lightBorder dark:border-darkBorderLight">
      <div className="flex-1 relative">
        <div className="flex items-center gap-1 overflow-x-auto snap-x py-1.5 scroll-smooth touch-pan-x scrollbar-hide">
          {tabs.map((tab) => (
            <div
              key={tab.id}
            className={`group flex items-center gap-2 px-4 py-2.5 rounded-t-lg cursor-pointer snap-start min-w-[120px] sm:min-w-[160px] md:min-w-[180px] scroll-ml-6 transition-all duration-200 ${
              tab.id === activeTabId
                ? 'bg-lightBg dark:bg-darkSecondary text-lightText dark:text-darkText shadow-sm border-t-2 border-t-primary-light dark:border-t-primary-dark border-x border-lightBorder dark:border-darkBorderLight'
                : 'bg-lightTertiary dark:bg-darkBg text-lightTextSecondary dark:text-darkTextSecondary hover:bg-lightSecondary dark:hover:bg-darkTertiary'
            }`}
            onClick={() => onTabSelect(tab.id)}
          >
            <span className="truncate max-w-[200px] text-sm font-medium">
              {getDomainFromUrl(tab.url)}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab.id);
              }}
              className={`ml-auto p-1 rounded-md hover:bg-lightBorder dark:hover:bg-darkBorder transition-all ${
                tab.id === activeTabId ? 'opacity-70 hover:opacity-100' : 'opacity-0 group-hover:opacity-70 group-hover:hover:opacity-100'
              }`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          ))}
          {!isNewTabPage && (
              <button
                onClick={onNewTab}
                className="p-2 ml-1 rounded-lg hover:bg-lightTertiary dark:hover:bg-darkTertiary text-lightTextSecondary dark:text-darkTextSecondary transition-colors"
                title="New Tab"
              >
                <Plus className="w-4 h-4" />
              </button>
          )}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-lightSecondary dark:from-darkBg to-transparent pointer-events-none" />
      </div>
    </div>
  );
}