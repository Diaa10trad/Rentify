import HeroSection from "@/components/HeroSection";
import FAQSection from "@/components/FAQSection";
import ExploreCategoriesSection from "@/components/ExploreCategoriesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import CTASection from "@/components/CTASection";
import { Container, Row } from "react-bootstrap";

export default function HomePage() {
  return (
    <>
      <Container fluid>
        <Row className="gap-5">
          <HeroSection />
          <HowItWorksSection />
          <ExploreCategoriesSection />
          <CTASection />
          <WhyChooseUsSection />
          <FAQSection />
        </Row>
      </Container>
    </>
  );
}
