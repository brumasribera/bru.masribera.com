interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-white to-slate-50">
      <main className="flex-1 overflow-hidden relative">{children}</main>
    </div>
  );
}
