import React from 'react';
import { HomePage } from './pages/HomePage';

export default function ReserveMobileApp() {
  const handleGoToGlobe = () => {
    // Handle globe navigation
  };

  const handleShowProjectsList = () => {
    // Handle projects list navigation
  };

  const handleShowSettings = () => {
    // Handle settings navigation
  };

  const handleOpenProject = (projectId: string) => {
    // Handle project opening
  };

  return (
    <HomePage
      onGoToGlobe={handleGoToGlobe}
      onShowProjectsList={handleShowProjectsList}
      onShowSettings={handleShowSettings}
      onOpenProject={handleOpenProject}
    />
  );
}
