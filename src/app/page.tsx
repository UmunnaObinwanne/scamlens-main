
import { Hero } from "@/components/hero";
import { SocialProof } from "@/components/social-proof";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import HowItWorks from "@/components/HowItWorks";
import { MainFeatures } from "@/components/Features/MainFeatures";


export default function HomePage() {
  return (
    <>

      <Hero />
      <SocialProof />
      <HowItWorks/>
      <MainFeatures />
      <Testimonials />
      <Faq />
    </>
  );
}
