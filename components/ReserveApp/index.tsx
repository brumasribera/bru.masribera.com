import { useState } from "react";
import { AppShell } from "./AppShell";
import { Globe3D } from "./Globe3D";
import { ProtectedAreaPage } from "./ProtectedAreaPage";
import { Project, CartItem } from "./types";

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
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const openProject = (p: Project) => setActiveProject(p);

  return (
    <AppShell cartCount={cart.length} onOpenCart={() => {}}>
      {!activeProject ? (
        <Globe3D onPick={openProject} />
      ) : (
        <ProtectedAreaPage
          project={activeProject}
          onBack={() => setActiveProject(null)}
        />
      )}
    </AppShell>
  );
}
