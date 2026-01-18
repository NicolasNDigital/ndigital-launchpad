import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import Services from "@/components/Services";
import Guarantee from "@/components/Guarantee";
import Process from "@/components/Process";
import WhyMe from "@/components/WhyMe";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import Urgency from "@/components/Urgency";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Referral from "@/components/Referral";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <Services />
        <Guarantee />
        <Process />
        <WhyMe />
        <Referral />
        <FAQ />
        <Pricing />
        <Urgency />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
