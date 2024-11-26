// components/features/constants.tsx
import { Heart, ShoppingBag, Globe } from "lucide-react";

export const categories = [
  {
    icon: <Heart size={24} className="text-primary" />,
    title: "Romance Partner",
    description: "Met someone online? Before investing emotions or money, let us help verify their identity and protect you from romance scams.",
    href: "/romance-verify"
  },
  {
    icon: <ShoppingBag size={24} className="text-primary" />,
    title: "Online Vendor",
    description: "Found a great deal online? Let us verify the seller's credibility before you make a purchase and protect your money.",
    href: "/onlinevendor"
  },
  {
    icon: <Globe size={24} className="text-primary" />,
    title: "Online Platform",
    description: "Considering an investment, course, or service? We'll help verify the platform's legitimacy and check for red flags.",
    href: "/onlineplatform-verify"
  },
];