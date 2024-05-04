import NavigationBar from "@/components/NavigationBar";
import HeroSection from "@/components/HeroSection";
import FAQSection from "@/components/FAQSection";
import ExploreCategoriesSection from "@/components/ExploreCategoriesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";

export default function HomePage() {
  return (
    <>
      <NavigationBar />
      <HeroSection />
      <HowItWorksSection />
      <ExploreCategoriesSection />
      <WhyChooseUsSection />
      <FAQSection />
    </>
  );
}
