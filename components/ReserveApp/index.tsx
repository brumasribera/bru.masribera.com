import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AppShell } from "./components/AppShell";
import { Globe3D } from "./components/Globe3D";
import { ProtectedAreaPage } from "./pages/contribution/ProtectedAreaPage";
import { Project } from "./types/types";
import { HomePage } from "./pages/HomePage";
import { Contribution } from "./types/types";
import { ContributionDetail } from "./pages/contribution/ContributionDetail";
import { ProjectsListPage } from "./pages/ProjectsListPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ProfileSettings } from "./pages/account/ProfileSettings";
import { AccountSettings } from "./pages/account/AccountSettings";
import { PaymentPage } from "./pages/account/PaymentPage";
import { TransactionHistory } from "./pages/account/TransactionHistory";
import { LinkedAccounts } from "./pages/account/LinkedAccounts";
import { Leaf } from "lucide-react";

/**
 * Reserve – Happy Nature (Responsive prototype)
 *
 * Optimized for all screen sizes:
 * - Mobile-first design with responsive scaling
 * - Adaptive layouts for tablets and desktop
 * - Touch-friendly on mobile, mouse-friendly on desktop
 * - Responsive typography and spacing
 */

type SettingsPage = 'main' | 'profile' | 'account' | 'payment' | 'transactions' | 'linked';
type NavigationState = 'globe' | 'home' | 'projects-list' | 'project' | 'settings';

interface NavigationHistoryItem {
  state: NavigationState;
  data?: any; // Additional data like project, settings page, etc.
}

export default function ReserveMobileApp() {
  const { ready, t } = useTranslation('reserve');
  const [showSettings, setShowSettings] = useState(false);
  const [settingsPage, setSettingsPage] = useState<'main' | 'profile' | 'account' | 'payment' | 'transactions' | 'linked'>('main');
  const [showProjectsList, setShowProjectsList] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [selectedContribution, setSelectedContribution] = useState<Contribution | null>(null);
  
  // Navigation history tracking
  const [navigationHistory, setNavigationHistory] = useState<NavigationHistoryItem[]>([
    { state: 'globe' }
  ]);
  
  // Add state for project list filters
  const [projectListFilters, setProjectListFilters] = useState({
    searchTerm: '',
    selectedCountry: '',
    selectedImpact: '',
    showFilters: false
  });
  
  // Add state to store loaded projects to prevent reloading
  const [loadedProjects, setLoadedProjects] = useState<Project[]>([]);
  const [projectsPage, setProjectsPage] = useState(1);
  const [hasMoreProjects, setHasMoreProjects] = useState(true);
  
  // Mock user data - shared across components
  const [user, setUser] = useState({
    name: "Sonia Rodriguez",
    email: "sonia.rodriguez@email.com",
    phone: "+1 (555) 987-6543",
    location: "Denver, CO",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80",
    memberSince: "June 2023",
    verified: true
  });

  // Function to update user profile
  const updateUser = (updatedUser: Partial<typeof user>) => {
    setUser(prev => ({ ...prev, ...updatedUser }));
  };

  // Navigation helper functions
  const navigateTo = (newState: NavigationState, data?: any) => {
    setNavigationHistory(prev => [...prev, { state: newState, data }]);
  };

  const navigateBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop(); // Remove current state
      const previousState = newHistory[newHistory.length - 1];
      
      setNavigationHistory(newHistory);
      
      // Restore previous state
      switch (previousState.state) {
        case 'globe':
          setActiveProject(null);
          setShowProjectsList(false);
          setShowHome(false);
          setShowSettings(false);
          break;
        case 'home':
          setShowHome(true);
          setActiveProject(null);
          setShowProjectsList(false);
          setShowSettings(false);
          break;
        case 'projects-list':
          setShowProjectsList(true);
          setActiveProject(null);
          setShowHome(false);
          setShowSettings(false);
          break;
        case 'project':
          if (previousState.data?.project) {
            setActiveProject(previousState.data.project);
            setShowProjectsList(false);
            setShowHome(false);
            setShowSettings(false);
          }
          break;
        case 'settings':
          setShowSettings(true);
          if (previousState.data?.page) {
            setSettingsPage(previousState.data.page);
          }
          setActiveProject(null);
          setShowProjectsList(false);
          setShowHome(false);
          break;
      }
    }
  };

  // Show loading state while i18n is not ready
  if (!ready) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Reserve</h1>
          <p className="text-gray-600 text-sm md:text-base">{t('common.loadingTranslations')}</p>
        </div>
      </div>
    );
  }

  const openProject = (p: Project) => {
    navigateTo('project', { project: p });
    setActiveProject(p);
    setShowHome(false);
    setShowSettings(false);
    setShowProjectsList(false);
  };

  const closeSettings = () => {
    setShowSettings(false);
    setSettingsPage('main');
  };

  const renderSettingsPage = () => {
    switch (settingsPage) {
      case 'profile':
        return <ProfileSettings onBack={() => setSettingsPage('main')} user={user} onUpdateUser={updateUser} />;
      case 'account':
        return <AccountSettings onBack={() => setSettingsPage('main')} user={user} />;
      case 'payment':
        return (
          <PaymentPage 
            onBack={() => setSettingsPage('main')} 
            onNavigateToTransactionHistory={() => setSettingsPage('transactions')}
          />
        );
      case 'transactions':
        return <TransactionHistory onBack={() => setSettingsPage('payment')} />;
      case 'linked':
        return <LinkedAccounts onBack={() => setSettingsPage('main')} />;
      default:
        return (
          <SettingsPage
            onBack={closeSettings}
            onNavigateToProfileSettings={() => setSettingsPage('profile')}
            onNavigateToAccountSettings={() => setSettingsPage('account')}
            onNavigateToPaymentSettings={() => setSettingsPage('payment')}
            onNavigateToLinkedAccounts={() => setSettingsPage('linked')}
            user={user}
          />
        );
    }
  };

  return (
    <AppShell showHeader={false}>
      {showSettings ? (
        renderSettingsPage()
      ) : showProjectsList ? (
        <ProjectsListPage
          onBack={() => {
            navigateBack();
          }}
          onSelectProject={(project) => {
            // Use a callback to ensure state updates happen in sequence
            navigateTo('project', { project });
            setActiveProject(project);
            setShowProjectsList(false);
            setShowHome(false);
          }}
        />
      ) : showHome ? (
        selectedContribution ? (
          <ContributionDetail
            contribution={selectedContribution}
            onBack={() => setSelectedContribution(null)}
          />
        ) : (
          <HomePage
            onGoToGlobe={() => {
              navigateTo('globe');
              setShowHome(false);
              setActiveProject(null);
            }}
            onShowProjectsList={() => {
              navigateTo('projects-list');
              setShowProjectsList(true);
            }}
            onShowSettings={() => {
              navigateTo('settings', { page: 'main' });
              setShowSettings(true);
              setSettingsPage('main');
            }}
            onOpenContribution={(c) => setSelectedContribution(c)}
            user={user}
          />
        )
      ) : !activeProject ? (
        <div className="w-full h-full">
          <Globe3D 
            onPick={openProject} 
            onShowContributions={() => {
              navigateTo('home');
              setShowHome(true);
            }}
            onShowAccount={() => {
              navigateTo('settings', { page: 'main' });
              setShowSettings(true);
              setSettingsPage('main');
            }}
            user={user}
          />
        </div>
      ) : (
        <ProtectedAreaPage
          project={activeProject}
          onBack={() => {
            navigateBack();
          }}
          onShowContributions={() => setShowHome(true)}
        />
      )}
    </AppShell>
  );
}
