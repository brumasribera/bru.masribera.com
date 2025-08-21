import { Project } from "../../types/types";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { ProjectMainView } from "../project/ProjectMainView";
import { ProjectLearnMore } from "../project/ProjectLearnMore";
import { ProjectShare } from "./ProjectShare";
import { ProjectContribute } from "./ProjectContribute";
import { ProjectSelectArea } from "../selection/ProjectSelectArea";
import { ProjectCheckout } from "../checkout/ProjectCheckout";
import { ProjectSuccess } from "../checkout/ProjectSuccess";

interface ProtectedAreaPageProps {
  project: Project;
  onBack: () => void;
  onShowContributions: () => void;
}

export function ProtectedAreaPage({ project, onBack, onShowContributions }: ProtectedAreaPageProps) {
  const { ready, t } = useTranslation('reserve');
  const [currentPage, setCurrentPage] = useState<'main' | 'learn-more' | 'share' | 'contribute' | 'select-area' | 'checkout' | 'success'>('main');
  const [selectedArea, setSelectedArea] = useState<number>(0);

  // Debug logging
  console.log('ProtectedAreaPage state:', { currentPage, selectedArea });
  
  // Debug logging for area flow
  useEffect(() => {
    console.log('ProtectedAreaPage selectedArea changed:', selectedArea);
  }, [selectedArea]);

  if (!ready) {
    return <div>{t('common.loading')}</div>;
  }

  // Render the appropriate component based on current page
  switch (currentPage) {
    case 'learn-more':
      return <ProjectLearnMore project={project} onBack={() => setCurrentPage('main')} />;
    case 'share':
      return <ProjectShare project={project} onBack={() => setCurrentPage('main')} />;
    case 'contribute':
      return <ProjectContribute project={project} onBack={() => setCurrentPage('main')} />;
    case 'select-area':
      return <ProjectSelectArea 
        project={project} 
        onBack={() => setCurrentPage('main')} 
        onContinue={(area) => {
          console.log('ProjectSelectArea onContinue called with area:', area);
          setSelectedArea(area);
          setCurrentPage('checkout');
        }} 
      />;
    case 'checkout':
      return <ProjectCheckout 
        project={project} 
        selectedArea={selectedArea}
        onBack={() => setCurrentPage('select-area')} 
        onSuccess={() => setCurrentPage('success')} 
      />;
    case 'success':
      return <ProjectSuccess 
        project={project} 
        selectedArea={selectedArea}
        onBack={() => setCurrentPage('main')} 
      />;
    default:
    return (
        <ProjectMainView 
          project={project} 
          onBack={onBack} 
          onShowContributions={onShowContributions}
          onLearnMore={() => setCurrentPage('learn-more')}
          onShare={() => setCurrentPage('share')}
          onContribute={() => setCurrentPage('contribute')}
          onSelectArea={() => setCurrentPage('select-area')}
        />
      );
  }
}
