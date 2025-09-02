import React, { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { Globe3D } from './components/Globe3D';
import { ProtectedAreaPage } from './pages/contribution/ProtectedAreaPage';
import { Project } from './types/types';

export default function ReserveMobileApp() {
  const [currentView, setCurrentView] = useState<'globe' | 'home' | 'project'>('globe');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleGoToGlobe = () => {
    setCurrentView('globe');
  };

  const handleShowProjectsList = () => {
    setCurrentView('globe');
  };

  const handleShowSettings = () => {
    // Handle settings navigation
  };

  const handleOpenProject = (projectId: string) => {
    // Handle project opening - could load project data here
    setCurrentView('home');
  };

  const handlePickProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentView('project');
  };

  if (currentView === 'globe') {
    return (
      <Globe3D
        onPick={handlePickProject}
        onShowContributions={() => setCurrentView('home')}
        onShowProjectsList={() => setCurrentView('home')}
      />
    );
  }

  if (currentView === 'project' && selectedProject) {
    return (
      <ProtectedAreaPage
        project={selectedProject}
        onBack={handleGoToGlobe}
        onShowContributions={() => setCurrentView('home')}
        onHome={() => setCurrentView('home')}
      />
    );
  }

  return (
    <HomePage
      onGoToGlobe={handleGoToGlobe}
      onShowProjectsList={handleShowProjectsList}
      onShowSettings={handleShowSettings}
      onOpenProject={handleOpenProject}
    />
  );
}
