import { useEffect } from "react";
import AnimatedBackground from "./components/ui/AnimatedBackground";
import Cursor from "./components/ui/Cursor";
import Marquee from "./components/ui/Marquee";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/**
 * One delegated, rAF-throttled pointermove listener drives the cursor
 * spotlight on every .card-glow — instead of N per-card React handlers.
 */
function useCardSpotlight() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let lastEvent: PointerEvent | null = null;

    function apply() {
      raf = 0;
      const e = lastEvent;
      if (!e) return;
      const card = (e.target as Element | null)?.closest?.(
        ".card-glow"
      ) as HTMLElement | null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--sx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--sy", `${e.clientY - rect.top}px`);
    }

    function onMove(e: PointerEvent) {
      lastEvent = e;
      if (!raf) raf = requestAnimationFrame(apply);
    }

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
}

export default function App() {
  useCardSpotlight();

  return (
    <>
      <AnimatedBackground />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <div className="cv-auto">
          <About />
        </div>
        <div className="cv-auto">
          <Skills />
        </div>
        <div className="cv-auto">
          <Experience />
        </div>
        <div className="cv-auto">
          <Projects />
        </div>
        <div className="cv-auto">
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
