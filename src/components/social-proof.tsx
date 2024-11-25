import Image from "next/image";

export function SocialProof() {
  return (
    <section className="container flex flex-col items-center gap-8 py-16">
      {/* Heading */}
      <h2 className="text-center font-heading text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
        Trusted by Customers On
      </h2>

      {/* Logo Grid */}
      <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-4 md:gap-8 lg:gap-10">
        <div className="relative h-12 sm:h-14">
          <Image 
            alt="Microsoft Logo" 
            src="/images/microsoft.webp" 
            fill 
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 10vw" 
            className="object-contain"
            loading="lazy" // Add this for images that aren't immediately visible
          />
        </div>
        <div className="relative h-12 sm:h-14">
          <Image 
            alt="Google Logo" 
            src="/images/google.png" 
            fill 
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 10vw" 
            className="object-contain"
            loading="lazy" // Add this for images that aren't immediately visible
          />
        </div>
        <div className="relative h-12 sm:h-14">
          <Image 
            alt="Amazon Logo" 
            src="/images/amazon.png" 
            fill 
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 10vw" 
            className="object-contain"
            loading="lazy" // Add this for images that aren't immediately visible
          />
        </div>
        <div className="relative h-12 sm:h-14">
          <Image 
            alt="Facebook Logo" 
            src="/images/facebook.png" 
            fill 
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 10vw" 
            className="object-contain"
            loading="lazy" // Add this for images that aren't immediately visible
          />
        </div>
      </div>
    </section>
  );
}
