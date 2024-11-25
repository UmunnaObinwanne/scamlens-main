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
    <>
      <button 
        className="md:hidden p-2 hover:bg-accent rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      
      {isOpen && (
        <div className="absolute left-0 right-0 top-16 bg-background border-t md:hidden">
          {children}
        </div>
      )}
    </>
  );
}