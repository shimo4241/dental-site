import { BeforeAfterSection } from "@/components/before-after-section";
import { BookingSection } from "@/components/booking-section";
import { ContactSection } from "@/components/contact-section";
import { HeroBanner } from "@/components/hero-banner";
import { ServicesSection } from "@/components/services-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TeamSection } from "@/components/team-section";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <SiteHeader />
      <HeroBanner />
      <ServicesSection />
      <BeforeAfterSection />
      <TeamSection />
      <ContactSection />
      <BookingSection />
      <SiteFooter />
    </main>
  );
}
