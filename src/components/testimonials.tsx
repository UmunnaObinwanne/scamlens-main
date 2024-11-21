import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function Testimonials() {
  return (
    <section className="container flex flex-col items-center gap-3 py-12 sm:py-24 px-4 sm:px-6">
      <div className="flex flex-col gap-2">
        <span className="font-bold uppercase text-primary text-center text-2xl sm:text-3xl md:text-4xl">
          Testimonials
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-balance text-center">
          Success Stories
        </h2>
      </div>
      <p className="text-base sm:text-lg text-muted-foreground text-balance max-w-lg text-center px-4">
        Real stories from people who avoided scams and protected their interests with our help.
      </p>
      
      {/* Testimonials Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-7 w-full max-w-7xl px-4">
        {/* First Testimonial */}
        <Card className="w-full shadow-lg">
          <CardContent className="flex flex-col items-start gap-4 divide-y p-4 sm:p-7">
            <p className="text-foreground text-sm sm:text-base">
              &quot;Thanks to this platform, I discovered my online romance was actually a scam before sending any money. The verification process revealed that the photos were stolen from someone else's social media. You saved me from heartbreak and financial loss.&quot;
            </p>
            <div className="flex items-center gap-4 w-full pt-4">
              <div className="relative w-8 sm:w-10 h-8 sm:h-10">
                <Image
                  alt="Sarah's Picture"
                  src="/images/testimonial-4.avif"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold leading-none text-foreground">Sarah</p>
                <p className="mt-1 leading-none text-muted-foreground text-sm">Romance Scam Avoided</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Second Testimonial */}
        <Card className="w-full shadow-lg">
          <CardContent className="flex flex-col items-start gap-4 divide-y p-4 sm:p-7">
            <p className="text-foreground text-sm sm:text-base">
              &quot;I was about to invest a large sum in what seemed like a legitimate crypto platform. The expert review revealed multiple red flags and helped me dodge a bullet. Their thorough analysis probably saved my life savings.&quot;
            </p>
            <div className="flex items-center gap-4 w-full pt-4">
              <div className="relative w-8 sm:w-10 h-8 sm:h-10">
                <Image
                  alt="James's Picture"
                  src="/images/testimonial-5.avif"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold leading-none text-foreground">James</p>
                <p className="mt-1 leading-none text-muted-foreground text-sm">Investment Scam Prevented</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Third Testimonial */}
        <Card className="w-full shadow-lg md:col-span-2 lg:col-span-1">
          <CardContent className="flex flex-col items-start gap-4 divide-y p-4 sm:p-7">
            <p className="text-foreground text-sm sm:text-base">
              &quot;When I received a suspicious call about my 'compromised' bank account, I used this platform to verify. Turns out it was a known phone scam. The quick response and guidance helped me protect my personal information and bank details.&quot;
            </p>
            <div className="flex items-center gap-4 w-full pt-4">
              <div className="relative w-8 sm:w-10 h-8 sm:h-10">
                <Image
                  alt="Maria's Picture"
                  src="/images/testimonial-6.avif"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold leading-none text-foreground">Maria</p>
                <p className="mt-1 leading-none text-muted-foreground text-sm">Phone Scam Identified</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}