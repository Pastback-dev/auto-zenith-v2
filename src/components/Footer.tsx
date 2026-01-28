import { motion } from "framer-motion";
import { Car, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="bg-card border-t border-border py-12 md:py-16 px-6"
    >
      <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {/* Brand Info */}
        <div className="md:col-span-2 lg:col-span-2">
          <Link to="/" className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">AutoGenius</span>
          </Link>
          <p className="text-muted-foreground text-sm max-w-xs">
            Your intelligent partner for finding the perfect vehicle, powered by advanced AI.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                How it Works
              </Link>
            </li>
            <li>
              <Link to="/#our-selection" className="text-muted-foreground hover:text-primary transition-colors">
                Our Selection
              </Link>
            </li>
            <li>
              <Link to="/#about" className="text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/#contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="font-semibold text-foreground mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="md:col-span-1">
          <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl mt-12 pt-8 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} AutoGenius. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}