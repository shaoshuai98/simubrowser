import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NavigationBar } from './NavigationBar';
import { TabBar } from './TabBar';
import { TabCardView } from './TabCardView';
import NewTabPage from './NewTabPage';
import { BrowserState, Tab, getDomainFromUrl } from '../types';
import { ShieldAlert } from 'lucide-react';

const createNewTab = (): Tab => ({
  id: uuidv4(),
  url: '',
  title: 'New Tab',
  history: [''],
  currentHistoryIndex: 0,
  error: null,
});

const findEmptyTab = (tabs: Tab[]): string | null => {
  const emptyTab = tabs.find(tab => tab.url === '');
  return emptyTab ? emptyTab.id : null;
};

export function Browser() {
  const initialTab = createNewTab();
  const [browserState, setBrowserState] = useState<BrowserState>({
    tabs: [initialTab],
    activeTabId: initialTab.id,
  });
  const [isTabViewOpen, setIsTabViewOpen] = useState(false);

  const activeTab = browserState.tabs.find(
    (tab) => tab.id === browserState.activeTabId
  )!;

  const updateActiveTab = (updates: Partial<Tab>) => {
    setBrowserState((prev) => ({
      ...prev,
      tabs: prev.tabs.map((tab) =>
        tab.id === prev.activeTabId ? { ...tab, ...updates } : tab
      ),
    }));
  };

  const handleNavigate = (url: string) => {
    const newHistory = activeTab.history
      .slice(0, activeTab.currentHistoryIndex + 1)
      .concat(url);
    updateActiveTab({
      url,
      history: newHistory,
      currentHistoryIndex: newHistory.length - 1,
      error: null, // Clear any previous errors
    });
  };

  const setActiveTabId = (tabId: string) => {
    setBrowserState(prev => ({ ...prev, activeTabId: tabId }));
  };

  const handleNewTab = useCallback(() => {
    const emptyTabId = findEmptyTab(browserState.tabs);
    if (emptyTabId) {
      setActiveTabId(emptyTabId);
    } else {
      const newTab = createNewTab();
      setBrowserState(prev => ({
        ...prev,
        tabs: [...prev.tabs, newTab],
        activeTabId: newTab.id,
      }));
    }
  }, [browserState.tabs]);

  const handleCloseTab = (tabId: string) => {
    setBrowserState((prev) => {
      const newTabs = prev.tabs.filter((tab) => tab.id !== tabId);
      if (newTabs.length === 0) {
        const newTab = createNewTab();
        return {
          tabs: [newTab],
          activeTabId: newTab.id,
        };
      }
      return {
        tabs: newTabs,
        activeTabId:
          prev.activeTabId === tabId ? newTabs[0].id : prev.activeTabId,
      };
    });
  };

  const handleBack = () => {
    if (activeTab.currentHistoryIndex > 0) {
      updateActiveTab({
        currentHistoryIndex: activeTab.currentHistoryIndex - 1,
        url: activeTab.history[activeTab.currentHistoryIndex - 1],
        error: null,
      });
    }
  };

  const handleForward = () => {
    if (activeTab.currentHistoryIndex < activeTab.history.length - 1) {
      updateActiveTab({
        currentHistoryIndex: activeTab.currentHistoryIndex + 1,
        url: activeTab.history[activeTab.currentHistoryIndex + 1],
        error: null,
      });
    }
  };

  const handleRefresh = () => {
    updateActiveTab({ error: null }); // Clear any previous errors
    const iframe = document.querySelector(`iframe[data-tab-id="${activeTab.id}"]`) as HTMLIFrameElement;
    if (iframe) {
      const currentSrc = iframe.src;
      iframe.src = 'about:blank';
      setTimeout(() => {
        iframe.src = currentSrc;
      }, 50);
    }
  };

  const handleIframeError = () => {
    updateActiveTab({
      error: "This website cannot be displayed in an iframe due to security restrictions.",
      title: "Cannot Display Content",
    });
  };

  const handleIframeLoad = useCallback((event: React.SyntheticEvent<HTMLIFrameElement>) => {
    try {
      const iframe = event.target as HTMLIFrameElement;
      const title = iframe.contentDocument?.title || getDomainFromUrl(activeTab.url);
      updateActiveTab({ title });
    } catch {
      const title = getDomainFromUrl(activeTab.url);
      updateActiveTab({ title });
    }
  }, [activeTab.url]);

  const isCurrentTabNewTabPage = activeTab.url === '';

  return (
    <div className="flex flex-col h-screen bg-lightSecondary dark:bg-darkBg">
      <TabBar
        tabs={browserState.tabs}
        activeTabId={browserState.activeTabId}
        onTabSelect={(id) => setBrowserState((prev) => ({ ...prev, activeTabId: id }))}
        onTabClose={handleCloseTab}
        onNewTab={handleNewTab}
        isNewTabPage={isCurrentTabNewTabPage}
      />
      <div className="flex-1 relative">
        {browserState.tabs.map((tab) => (
          <div
            key={`${tab.id}-${tab.url}`}
            className={`absolute inset-0 flex flex-col overflow-hidden ${
              tab.id === browserState.activeTabId ? 'visible' : 'hidden'
            }`}
          >
            <div className="flex items-center space-x-4 px-2 bg-lightBg dark:bg-darkSecondary">
              <NavigationBar
                canGoBack={tab.currentHistoryIndex > 0}
                canGoForward={tab.currentHistoryIndex < tab.history.length - 1}
                onBack={handleBack}
                onForward={handleForward}
                onRefresh={handleRefresh}
                tabs={browserState.tabs}
                onTabViewOpen={() => setIsTabViewOpen(true)}
                onNewTab={handleNewTab}
                onNavigate={handleNavigate}
                currentUrl={tab.url}
                isNewTabPage={isCurrentTabNewTabPage}
              />
            </div>
            {tab.error ? (
              <div className="flex flex-col items-center justify-center h-full bg-lightSecondary dark:bg-darkBg">
                <div className="bg-lightBg dark:bg-darkSecondary p-10 rounded-2xl shadow-xl max-w-lg text-center border-2 border-lightBorder dark:border-darkBorderLight">
                  <div className="bg-warning-light/10 dark:bg-warning-dark/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldAlert className="w-12 h-12 text-warning-light dark:text-warning-dark" />
                  </div>
                  <h2 className="text-2xl font-bold text-lightText dark:text-darkText mb-3 tracking-tight">Security Notice</h2>
                  <p className="text-lightTextSecondary dark:text-darkTextSecondary leading-relaxed mb-6">{tab.error}</p>
                  <div className="bg-lightSecondary dark:bg-darkTertiary p-4 rounded-lg">
                    <p className="text-sm text-lightTextSecondary dark:text-darkTextSecondary mb-2">
                      Try opening this link in a new window:
                    </p>
                    <a 
                      href={tab.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary-light dark:text-primary-dark hover:underline font-medium break-all inline-block"
                    >
                      {tab.url}
                    </a>
                  </div>
                </div>
              </div>
            ) : !tab.url ? (
              <NewTabPage onNavigate={handleNavigate} />
            ) : (
              <iframe
                src={tab.url}
                className="w-full h-full border-0 flex-1 min-w-0"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                title={tab.title}
                data-tab-id={tab.id}
                allowfullscreen
                allow="fullscreen"
                sandbox="allow-forms allow-scripts allow-same-origin allow-modals allow-pointer-lock allow-popups allow-presentation"
              />
            )}
          </div>
        ))}
      </div>
      <TabCardView
        isOpen={isTabViewOpen}
        onClose={() => setIsTabViewOpen(false)}
        tabs={browserState.tabs}
        activeTabId={browserState.activeTabId}
        onTabSelect={(id) => setBrowserState((prev) => ({ ...prev, activeTabId: id }))}
        onTabClose={handleCloseTab}
      />
    </div>
  );
}