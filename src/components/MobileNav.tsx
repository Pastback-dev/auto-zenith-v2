import { useState } from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Car } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  onContactClick: () => void;
}

export function MobileNav({ onContactClick }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  const closeSheet = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <Link to="/" className="flex items-center gap-3 mb-8" onClick={closeSheet}>
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Car className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold">AutoGenius</span>
        </Link>
        <nav className="flex flex-col gap-4 text-lg">
          <NavLink
            to="/#how-it-works"
            className={cn(
              "block px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors",
            )}
            activeClassName="bg-secondary text-foreground"
            onClick={closeSheet}
          >
            How it Works
          </NavLink>
          <NavLink
            to="/#our-selection"
            className={cn(
              "block px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors",
            )}
            activeClassName="bg-secondary text-foreground"
            onClick={closeSheet}
          >
            Our Selection
          </NavLink>
          <NavLink
            to="/#about"
            className={cn(
              "block px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors",
            )}
            activeClassName="bg-secondary text-foreground"
            onClick={closeSheet}
          >
            About
          </NavLink>
          <button
            onClick={() => {
              onContactClick();
              closeSheet();
            }}
            className={cn(
              "block w-full text-left px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors",
            )}
          >
            Contact
          </button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}