import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function Testimonials() {
  return (
    <section className="container flex flex-col items-center gap-6 py-12 px-6 sm:py-24 sm:px-10">
      {/* Heading */}
      <div className="flex flex-col gap-2">
        <span className="font-bold uppercase text-primary text-center text-xl sm:text-2xl md:text-3xl">
          Testimonials
        </span>
        <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-center">
          Success Stories
        </h2>
      </div>
      <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-center max-w-2xl">
        Real stories from people who avoided scams and protected their interests with our help.
      </p>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8 w-full max-w-7xl">
        {/* Testimonial 1 */}
        <Card className="w-full shadow-lg">
          <CardContent className="flex flex-col items-start gap-6 divide-y p-6 sm:p-8">
            <p className="text-sm sm:text-base text-foreground">
              &quot;Thanks to this platform, I discovered my online romance was actually a scam before sending any money. The verification process revealed that the photos were stolen from someone else's social media. You saved me from heartbreak and financial loss.&quot;
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <Image
                  alt="Sarah's Picture"
                  src="/images/testimonial-4.avif"
                  fill
                  sizes="(max-width: 768px) 20vw, (max-width: 1200px) 10vw, 6vw"
                  className="rounded-full object-cover"
                  loading="lazy" // Add this for images that aren't immediately visible
                />
              </div>
              <div>
                <p className="font-semibold text-foreground">Sarah</p>
                <p className="text-sm text-muted-foreground">Romance Scam Avoided</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonial 2 */}
        <Card className="w-full shadow-lg">
          <CardContent className="flex flex-col items-start gap-6 divide-y p-6 sm:p-8">
            <p className="text-sm sm:text-base text-foreground">
              &quot;I was about to invest a large sum in what seemed like a legitimate crypto platform. The expert review revealed multiple red flags and helped me dodge a bullet. Their thorough analysis probably saved my life savings.&quot;
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <Image
                  alt="James's Picture"
                  src="/images/testimonial-5.avif"
                  fill
                  sizes="(max-width: 768px) 20vw, (max-width: 1200px) 10vw, 6vw"
                  className="rounded-full object-cover"
                  loading="lazy" // Add this for images that aren't immediately visible
                />
              </div>
              <div>
                <p className="font-semibold text-foreground">James</p>
                <p className="text-sm text-muted-foreground">Investment Scam Prevented</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonial 3 */}
        <Card className="w-full shadow-lg md:col-span-2 lg:col-span-1">
          <CardContent className="flex flex-col items-start gap-6 divide-y p-6 sm:p-8">
            <p className="text-sm sm:text-base text-foreground">
              &quot;When I received a suspicious call about my 'compromised' bank account, I used this platform to verify. Turns out it was a known phone scam. The quick response and guidance helped me protect my personal information and bank details.&quot;
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <Image
                  alt="Maria's Picture"
                  src="/images/testimonial-6.avif"
                  fill
                  sizes="(max-width: 768px) 20vw, (max-width: 1200px) 10vw, 6vw"
                  className="rounded-full object-cover"
                  loading="lazy" // Add this for images that aren't immediately visible
                />
              </div>
              <div>
                <p className="font-semibold text-foreground">Maria</p>
                <p className="text-sm text-muted-foreground">Phone Scam Identified</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
