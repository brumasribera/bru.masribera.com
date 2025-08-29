interface AppShellProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export function AppShell({ children, showHeader = false }: AppShellProps) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-white to-slate-50 overflow-y-auto">
      {/* Desktop app bar - only show when showHeader is true */}
      {showHeader && (
        <header className="hidden lg:block sticky top-0 z-50 border-b bg-white/70 backdrop-blur">
          <div className="w-full px-6 h-14 flex items-center justify-center">
            <div className="font-semibold text-slate-800">Reserve</div>
            <div className="text-sm text-slate-500">Nature protection platform</div>
          </div>
        </header>
      )}
      <main className="relative h-full">
        <div className="w-full h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
