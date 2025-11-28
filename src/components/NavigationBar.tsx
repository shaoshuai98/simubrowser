import React from 'react';
import { ChevronLeft, ChevronRight, RefreshCw, Plus } from 'lucide-react';
import { TabCounter } from './TabCounter';
import { Tab, UserType } from '../types';
import { UserAvatar } from './UserAvatar';
import { ThemeToggle } from './ThemeToggle';
import { AddressBar } from './AddressBar';
import { useTheme } from '../contexts/ThemeContext';

interface NavigationBarProps {
  canGoBack: boolean;
  canGoForward: boolean;
  onBack: () => void;
  onForward: () => void;
  onRefresh: () => void;
  tabs: Tab[];
  onTabViewOpen: () => void;
  onNewTab: () => void;
  currentUrl: string;
  onNavigate: (url: string) => void;
  currentUser?: UserType;
  onLogout?: () => void;
  onSettings?: () => void;
  isNewTabPage?: boolean;
}

export function NavigationBar({
  canGoBack,
  canGoForward,
  onBack,
  onForward,
  onRefresh,
  tabs,
  onTabViewOpen,
  onNewTab,
  currentUrl,
  onNavigate,
  currentUser,
  onLogout,
  onSettings,
  isNewTabPage = false,
}: NavigationBarProps) {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex flex-1 items-center gap-2 p-2.5 bg-lightSecondary dark:bg-darkSecondary border-b border-lightBorder dark:border-darkBorderLight min-w-0">
      <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
        <button
          onClick={onBack}
          disabled={!canGoBack}
          className={`w-9 h-9 p-2 rounded-lg transition-all duration-200 ${
            !canGoBack 
              ? 'opacity-40 cursor-not-allowed text-lightTextSecondary dark:text-darkTextMuted' 
              : 'hover:bg-lightTertiary dark:hover:bg-darkTertiary text-lightText dark:text-darkText active:scale-95'
          }`}
          title="Back"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onForward}
          disabled={!canGoForward}
          className={`w-9 h-9 p-2 rounded-lg transition-all duration-200 ${
            !canGoForward 
              ? 'opacity-40 cursor-not-allowed text-lightTextSecondary dark:text-darkTextMuted' 
              : 'hover:bg-lightTertiary dark:hover:bg-darkTertiary text-lightText dark:text-darkText active:scale-95'
          }`}
          title="Forward"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          onClick={onRefresh}
          className="w-9 h-9 p-2 rounded-lg hover:bg-lightTertiary dark:hover:bg-darkTertiary text-lightText dark:text-darkText transition-all duration-200 active:scale-95 active:rotate-180"
          title="Refresh"
        >
        <RefreshCw className="w-5 h-5 transition-transform" />
        </button>
      </div>
      <div className="flex-1 min-w-0">
        <AddressBar currentUrl={currentUrl} onNavigate={onNavigate} />
      </div>

      <div className="flex items-center gap-1.5 flex-shrink-0">
        <div className="sm:hidden flex items-center gap-1.5">
          {!isNewTabPage && (
            <button
              onClick={onNewTab}
              className="w-9 h-9 p-2 rounded-lg hover:bg-lightTertiary dark:hover:bg-darkTertiary text-lightText dark:text-darkText transition-all duration-200 active:scale-95"
              title="New Tab"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
          <TabCounter tabs={tabs} onClick={onTabViewOpen} />
        </div>

        <div className="flex items-center gap-1.5">
          <ThemeToggle onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
          <UserAvatar
            currentUser={currentUser}
            onLogout={onLogout}
            onSettings={onSettings}
          />
        </div>
      </div>
    </div>
  );
}