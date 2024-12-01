// components/mobile-navbar.tsx
"use client";

import { Menu, X } from "lucide-react";
import { ReactNode, useState } from "react";

interface MobileNavbarProps {
  children: ReactNode;
}

export function MobileNavbar({ children }: MobileNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button 
        className="p-2 hover:bg-accent rounded-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      
      {isOpen && children}
    </div>
  );
}