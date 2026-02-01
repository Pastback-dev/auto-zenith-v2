import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Car } from "lucide-react";
import { Link } from "react-router-dom";
import { MobileNav } from "./MobileNav"; // Import MobileNav

interface HeaderProps {
  onContactClick: () => void;
}

export function Header({ onContactClick }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Mobile Nav Trigger and Brand */}
        <div className="flex items-center gap-3">
          <MobileNav onContactClick={onContactClick} /> {/* Pass handler to MobileNav */}
          <Link to="/" className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">AutoGenius</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            How it Works
          </Link>
          <Link to="/#our-selection" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Our Selection
          </Link>
          <Link to="/#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <button onClick={onContactClick} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </button>
        </nav>

        <ThemeToggle />
      </div>
    </motion.header>
  );
}