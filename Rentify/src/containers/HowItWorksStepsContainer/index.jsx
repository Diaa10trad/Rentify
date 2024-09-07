import HowItWorksCard from "@/components/cards/HowItWorksCard";
import SearchIcon from "@/assets/images/howitworks/search-icon.png";
import RequestIcon from "@/assets/images/howitworks/request-icon.png";
import HandshakeIcon from "@/assets/images/howitworks/handshake-icon.png";

export default function HowItWorksStepsContainer() {
  const HowItWorksSteps = [
    {
      id: 1,
      title: "1. ابحث عن منتج أو خدمة",

      icon: SearchIcon,
    },
    {
      id: 2,
      title: "2. قم بتقديم طلب ",

      icon: RequestIcon,
    },
    {
      id: 3,
      title: "3. اتفق مع المعلِن",

      icon: HandshakeIcon,
    },
  ];

  return (
    <>
      {HowItWorksSteps.map((step) => (
        <HowItWorksCard key={step.id} step={step} />
      ))}
    </>
  );
}
