import HowItWorksCard from "@/components/Cards/HowItWorksCard";
import SearchIcon from "@/assets/images/howitworks/search-icon.png";
import RequestIcon from "@/assets/images/howitworks/request-icon.png";
import HandshakeIcon from "@/assets/images/howitworks/handshake-icon.png";

export default function HowItWorksStepsContainer() {
  const HowItWorksSteps = [
    {
      id: 1,
      title: "1. ابحث عن منتج أو خدمة",
      description: "لوريم ايبسوم دولور سيت اميت",
      icon: SearchIcon,
    },
    {
      id: 2,
      title: "2. قم بتقديم طلب ",
      description: "لوريم ايبسوم دولور سيت اميت",
      icon: RequestIcon,
    },
    {
      id: 3,
      title: "3. اتفق مع المؤجر أو مزود الخدمة",
      description: "لوريم ايبسوم دولور سيت اميت",
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
