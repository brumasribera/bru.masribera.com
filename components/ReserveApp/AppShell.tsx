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
    <div className="h-screen flex flex-col bg-gradient-to-b from-white to-slate-50">
      <main className="flex-1 overflow-y-auto">{children}</main>
      <footer className="h-16 border-t bg-white flex items-center justify-around">
        <Button variant="ghost" size="icon"><Globe2 className="w-6 h-6" /></Button>
        <Button variant="ghost" size="icon" onClick={onOpenCart}>
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && <Badge className="ml-1" variant="default">{cartCount}</Badge>}
        </Button>
        <Button variant="ghost" size="icon"><User className="w-6 h-6" /></Button>
      </footer>
    </div>
  );
}
