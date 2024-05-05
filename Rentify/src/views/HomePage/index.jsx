import NavigationBar from "@/components/NavigationBar";
import HeroSection from "@/components/HeroSection";
import FAQSection from "@/components/FAQSection";
import ExploreCategoriesSection from "@/components/ExploreCategoriesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
export default function HomePage() {
  return (
    <>
      <NavigationBar />
      <HeroSection />
      <HowItWorksSection />
      <ExploreCategoriesSection />
      <CTASection />
      <WhyChooseUsSection />
      <FAQSection />
      <Footer />
    </>
  );
}
