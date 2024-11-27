// components/features/features-list.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { categories } from "./Constants";
import { useRouter } from "next/navigation";

interface FeaturesListProps {
  isAuthenticated: boolean;
}

export function FeaturesList({ isAuthenticated }: FeaturesListProps) {
    const router = useRouter();

  const handleVerifyClick = (href: string) => {
    if (isAuthenticated) {
      router.push(href);
    }
  };

  return (
    <section className="container flex flex-col items-center gap-6 py-24 sm:gap-7">
      <div className="flex flex-col gap-3">
        <span className="font-bold uppercase text-primary text-center text-3xl sm:text-4xl">
          Categories
        </span>
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance text-center">
          What would you like to verify?
        </h2>
      </div>
      <p className="text-lg text-muted-foreground text-balance max-w-xl text-center">
        Select the category that best matches your concern. Our experts will help you verify legitimacy and protect you from potential scams.
      </p>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-y-8 gap-x-8 md:grid-cols-2 lg:grid-cols-3 lg:justify-center">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="group/feature relative flex flex-col py-10 hover:shadow-lg transition-all duration-300 ease-in-out first:lg:border-l"
          >
            <div className="pointer-events-none absolute inset-0 size-full from-primary/20 to-transparent 
                          opacity-0 transition duration-200 group-hover/feature:opacity-100 bg-gradient-to-t" />
            
            <div className="absolute right-4 top-4 opacity-0 transform translate-x-2 
                          transition-all duration-300 group-hover/feature:opacity-100 
                          group-hover/feature:translate-x-0">
              👆
            </div>

            <div className="relative z-10 mb-4 px-10">
              {category.icon}
            </div>
            <div className="relative z-10 mb-2 px-10 text-lg font-bold">
              <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-r-full 
                            bg-neutral-300 transition-all duration-200 
                            group-hover/feature:h-8 group-hover/feature:bg-primary" />
              <span className="inline-block">{category.title}</span>
            </div>
            <p className="relative z-10 max-w-xs px-10 text-sm text-muted-foreground">
              {category.description}
            </p>

                   {isAuthenticated ? (
              <Button 
                className="mt-4 mx-10"
                onClick={() => handleVerifyClick(category.href)}
              >
                Verify Now
              </Button>
            ) : (
              <LoginLink
                postLoginRedirectURL={`/api/auth/success?returnTo=${category.href}`}
                className="mt-4 mx-10"
              >
                <Button className="w-full">
                  Verify
                </Button>
              </LoginLink>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}