import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AppShell } from "./AppShell";
import { Globe3D } from "./Globe3D";
import { ProtectedAreaPage } from "./ProtectedAreaPage";
import { Project } from "./types";
import { MyContributions } from "./MyContributions";
import { Contribution } from "./types";
import { ContributionDetail } from "./ContributionDetail";

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
  const { ready } = useTranslation('reserve');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showMyContributions, setShowMyContributions] = useState(false);
  const [selectedContribution, setSelectedContribution] = useState<Contribution | null>(null);

  // Show loading state while i18n is not ready
  if (!ready) {
    return (
      <div className="h-full min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm md:text-base">Loading translations...</p>
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
