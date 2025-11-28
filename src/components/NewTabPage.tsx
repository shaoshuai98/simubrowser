import React, { useState, useEffect } from 'react';
import { ShortcutSite, Bookmark } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import BookmarkBar from './BookmarkBar';

const shortcuts: ShortcutSite[] = [
  {
    id: '1',
    title: 'HTML5 Test',
    url: 'https://html5test.com',
    icon: '🌐'
  },
  {
    id: '2',
    title: 'Bilibili',
    url: 'https://www.bilibili.com',
    icon: '📺'
  },
  {
    id: '3',
    title: 'Can I use',
    url: 'https://caniuse.com',
    icon: '🐱'
  },
  {
    id: '4',
    title: 'DeepSeek',
    url: 'https://www.deepseek.com',
    icon: '🔍'
  },
  {
    id: '5',
    title: 'Cengage',
    url: 'https://www.cengageasia.com',
    icon: '▶️'
  },
  {
    id: '6',
    title: 'AtomGit',
    url: 'https://atomgit.com',
    icon: '🤖'
  }
];

interface ShortcutCardProps {
  site: ShortcutSite;
  onClick: (url: string) => void;
  className?: string;
}

const ShortcutCard: React.FC<ShortcutCardProps> = ({ site, onClick, className }) => {
  const { theme } = useTheme();
  
  return (
    <button
      onClick={() => onClick(site.url)}
      className={`
        w-full rounded-xl transition-all duration-200
        ${className ? 'p-3' : 'p-4 sm:p-5'}
        ${theme === 'dark' 
          ? 'bg-darkSecondary hover:bg-darkTertiary border-darkBorderLight' 
          : 'bg-lightBg hover:bg-lightSecondary border-lightBorder'}
        hover:scale-105 hover:shadow-lg
        flex flex-col items-center justify-center gap-2.5
        border-2 shadow-sm
        active:scale-100
      `}
    >
      <span className={`${className ? 'text-2xl' : 'text-3xl'}`}>{site.icon}</span>
      <span className={`text-sm font-semibold ${
        theme === 'dark' ? 'text-darkText' : 'text-lightText'
      }`}>
        {site.title}
      </span>
    </button>
  );
};

interface NewTabPageProps {
  onNavigate?: (url: string) => void;
  className?: string;
}

const NewTabPage: React.FC<NewTabPageProps> = ({ onNavigate, className }) => {
  const { theme } = useTheme();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  
  const handleShortcutClick = (url: string) => {
    if (onNavigate) {
      onNavigate(url);
    }
  };

  useEffect(() => {
    const loadBookmarks = async () => {
      const data = JSON.parse(localStorage.getItem('bookmarks') || '[]') as Bookmark[];
      const sortedBookmarks = data.sort((a, b) => b.createdAt - a.createdAt);
      setBookmarks(sortedBookmarks);
    };
    loadBookmarks();
  }, []);

  const handleUpdateBookmarks = (updatedBookmarks: Bookmark[]) => {
    setBookmarks(updatedBookmarks);
  };

  return (
    <div className={`
      w-full overflow-auto
      ${className ? 'aspect-[4/3]' : 'min-h-screen'}
      ${theme === 'dark' ? 'bg-darkBg' : 'bg-lightSecondary'}
      ${className ? 'p-2' : ''}
      ${className || ''}
    `}>
      <div className={`w-full max-w-7xl mx-auto ${className ? 'p-3 space-y-4' : 'p-6 sm:p-8 md:p-12 space-y-10 sm:space-y-12'}`}>
        <div className="space-y-6">
          <h1 className={`
            ${className ? 'text-xl' : 'text-3xl sm:text-4xl'} font-bold text-center
            ${theme === 'dark' ? 'text-darkText' : 'text-lightText'}
            tracking-tight
          `}>
            Quick Access
          </h1>
          <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 
            ${className ? 'gap-3' : 'gap-4 sm:gap-5 md:gap-6'}
          `}>
            {shortcuts.map((site) => (
              <ShortcutCard
                key={site.id}
                site={site}
                onClick={handleShortcutClick}
                className={className}
              />
            ))}
          </div>
        </div>
        
        <div className={`space-y-6 pt-4 ${className ? '' : 'border-t-2'} ${
          theme === 'dark' ? 'border-darkBorderLight' : 'border-lightBorder'
        }`}>
          <h2 className={`
            ${className ? 'text-lg' : 'text-2xl sm:text-3xl'} font-bold text-center
            ${theme === 'dark' ? 'text-darkText' : 'text-lightText'}
            tracking-tight
          `}>
            Bookmarks
          </h2>
          <BookmarkBar
            bookmarks={bookmarks}
            onUpdateBookmarks={handleUpdateBookmarks}
            onNavigate={onNavigate || (() => {})}
          />
          {bookmarks.length === 0 && (
            <p className={`text-center py-8 ${
              theme === 'dark' ? 'text-darkTextMuted' : 'text-lightTextSecondary'
            }`}>
              No bookmarks yet. Click the star icon in the address bar to add bookmarks.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewTabPage;