import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AppShell } from "./components/AppShell";
import { Globe3D } from "./components/Globe3D";
import { ProtectedAreaPage } from "./pages/contribution/ProtectedAreaPage";
import { Project } from "./types/types";
import { MyContributions } from "./pages/contribution/MyContributions";
import { Contribution } from "./types/types";
import { ContributionDetail } from "./pages/contribution/ContributionDetail";
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

export default function ReserveMobileApp() {
  const { ready, t } = useTranslation('reserve');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showMyContributions, setShowMyContributions] = useState(false);
  const [selectedContribution, setSelectedContribution] = useState<Contribution | null>(null);

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
    setActiveProject(p);
    setShowMyContributions(false);
  };

  return (
    <AppShell>
      {showMyContributions ? (
        selectedContribution ? (
          <ContributionDetail
            contribution={selectedContribution}
            onBack={() => setSelectedContribution(null)}
          />
        ) : (
          <MyContributions
            onBack={() => setShowMyContributions(false)}
            onOpenContribution={(c) => setSelectedContribution(c)}
            onGoToGlobe={() => {
              setShowMyContributions(false);
              setActiveProject(null);
            }}
          />
        )
      ) : !activeProject ? (
        <Globe3D onPick={openProject} onShowContributions={() => setShowMyContributions(true)} />
      ) : (
        <ProtectedAreaPage
          project={activeProject}
          onBack={() => setActiveProject(null)}
          onShowContributions={() => setShowMyContributions(true)}
        />
      )}
    </AppShell>
  );
}
