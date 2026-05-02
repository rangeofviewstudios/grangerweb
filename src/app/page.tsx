import SmoothScroll    from "@/components/SmoothScroll";
import CustomCursor    from "@/components/CustomCursor";
import Navbar          from "@/components/Navbar";
import Hero            from "@/components/Hero";
import FeaturedWorks   from "@/components/FeaturedWorks";
import About           from "@/components/About";
import InTheField      from "@/components/InTheField";
import GrangerSelfies  from "@/components/GrangerSelfies";
import Contact         from "@/components/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      {/* Fixed UI layer */}
      <CustomCursor />
      <Navbar />

      {/* Grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Page sections */}
      <main>
        <Hero />
        <FeaturedWorks />
        <About />
        <InTheField />
        <GrangerSelfies />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
