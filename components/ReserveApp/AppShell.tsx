import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe2, ShoppingCart, User } from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
  cartCount: number;
  onOpenCart: () => void;
}

export function AppShell({ children, cartCount, onOpenCart }: AppShellProps) {
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-white to-slate-50">
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
