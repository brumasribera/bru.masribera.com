import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AppShell } from "./AppShell";
import { Globe3D } from "./Globe3D";
import { ProtectedAreaPage } from "./ProtectedAreaPage";
import { Project } from "./types";
import { MyContributions } from "./MyContributions";

/**
 * Reserve – Happy Nature (Mobile-first prototype)
 *
 * Tailored for mobile phone experience:
 * - Fullscreen cards and stacked layout
 * - Bottom navigation instead of tabs for better thumb reach
 * - Single-column flow, scrollable
 * - Optimized touch targets and larger buttons
 */

export default function ReserveMobileApp() {
  const { ready } = useTranslation('reserve');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showMyContributions, setShowMyContributions] = useState(false);

  // Show loading state while i18n is not ready
  if (!ready) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading translations...</p>
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
        <MyContributions onBack={() => setShowMyContributions(false)} />
      ) : !activeProject ? (
        <Globe3D onPick={openProject} onShowContributions={() => setShowMyContributions(true)} />
      ) : (
        <ProtectedAreaPage
          project={activeProject}
          onBack={() => setActiveProject(null)}
        />
      )}
    </AppShell>
  );
}
