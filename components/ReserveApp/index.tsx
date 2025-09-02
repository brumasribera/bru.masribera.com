import React, { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { Globe3D } from './components/Globe3D';
import { ProtectedAreaPage } from './pages/contribution/ProtectedAreaPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfileSettings } from './pages/account/ProfileSettings';
import { ProjectsListPage } from './pages/ProjectsListPage';
import { Project } from './types/types';
import { PROJECTS } from './utils/data';

export default function ReserveMobileApp() {
  const [currentView, setCurrentView] = useState<'globe' | 'home' | 'project' | 'settings' | 'profile-settings' | 'projects-list'>('globe');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['globe']);
  const [user, setUser] = useState({
    name: "Sonia Rodriguez",
    email: "sonia.rodriguez@email.com",
    phone: "+1 (555) 987-6543",
    location: "Denver, United States",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80",
    memberSince: "2023-06-22",
    verified: true
  });

  // Navigation functions that track history
  const navigateTo = (view: string) => {
    setNavigationHistory(prev => [...prev, currentView]);
    setCurrentView(view as any);
  };

  const navigateBack = () => {
    if (navigationHistory.length > 1) {
      const previousView = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory(prev => prev.slice(0, -1));
      setCurrentView(previousView as any);
    } else {
      // Fallback to home if no history
      setCurrentView('home');
    }
  };

  const handleGoToGlobe = () => {
    navigateTo('globe');
  };

  const handleShowProjectsList = () => {
    navigateTo('projects-list');
  };

  const handleShowSettings = () => {
    navigateTo('settings');
  };

  const handleOpenProject = (projectId: string) => {
    // Find the project by ID and set it as selected
    const project = PROJECTS.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      navigateTo('project');
    }
  };

  const handlePickProject = (project: Project) => {
    setSelectedProject(project);
    navigateTo('project');
  };

  if (currentView === 'globe') {
    return (
      <Globe3D
        onPick={handlePickProject}
        onShowContributions={() => navigateTo('home')}
        onShowProjectsList={handleShowProjectsList}
      />
    );
  }

  if (currentView === 'project' && selectedProject) {
    return (
      <ProtectedAreaPage
        project={selectedProject}
        onBack={navigateBack}
        onShowContributions={() => navigateTo('home')}
        onHome={() => navigateTo('home')}
      />
    );
  }

  if (currentView === 'settings') {
    return (
      <SettingsPage
        onBack={navigateBack}
        onNavigateToProfileSettings={() => navigateTo('profile-settings')}
        onNavigateToPaymentSettings={() => {}}
        onNavigateToAccountSettings={() => {}}
        onNavigateToLinkedAccounts={() => {}}
        user={user}
      />
    );
  }

  if (currentView === 'profile-settings') {
    return (
      <ProfileSettings
        onBack={navigateBack}
        user={user}
        onUpdateUser={(updatedUser) => setUser({ ...user, ...updatedUser })}
      />
    );
  }

  if (currentView === 'projects-list') {
    return (
      <ProjectsListPage
        onBack={navigateBack}
        onSelectProject={(project) => {
          setSelectedProject(project);
          navigateTo('project');
        }}
      />
    );
  }

  return (
    <HomePage
      onGoToGlobe={handleGoToGlobe}
      onShowProjectsList={handleShowProjectsList}
      onShowSettings={handleShowSettings}
      onOpenProject={handleOpenProject}
      user={user}
    />
  );
}
