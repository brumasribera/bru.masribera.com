interface AppShellProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export function AppShell({ children, showHeader = false }: AppShellProps) {
  return (
    <div className={`w-full flex flex-col ${showHeader ? 'min-h-screen' : 'h-full'} bg-gradient-to-b from-white to-slate-50`}>
      {/* Desktop app bar - only show when showHeader is true */}
      {showHeader && (
        <header className="hidden lg:block sticky top-0 z-50 border-b bg-white/70 backdrop-blur">
          <div className="w-full px-6 h-14 flex items-center justify-center">
            <div className="font-semibold text-slate-800">Reserve</div>
            <div className="text-sm text-slate-500">Nature protection platform</div>
          </div>
        </header>
      )}
      <main className={`${showHeader ? 'flex-1' : 'h-full'} relative flex`}>
        <div className="flex-1 flex items-stretch w-full">
          {/* Content - allow full height and overflow for scrolling */}
          <div className="w-full h-full max-w-full overflow-visible">{children}</div>
        </div>
      </main>
    </div>
  );
}
