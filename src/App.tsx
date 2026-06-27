import { useState } from "react";
import { site, navItems, marqueeWords } from "./config";
import { useTheme } from "./theme/ThemeProvider";
import { useLiveStats } from "./hooks/useLiveStats";
import { useIdle } from "./hooks/useIdle";
import { useKonami } from "./hooks/useKonami";
import { useGlitchAudio } from "./hooks/useGlitchAudio";

import { DotGrid } from "./components/effects/DotGrid";
import { IdleScreensaver } from "./components/effects/IdleScreensaver";
import { SecretToast } from "./components/effects/SecretToast";
import { Header } from "./components/layout/Header";
import { MenuOverlay } from "./components/layout/MenuOverlay";
import { Footer } from "./components/layout/Footer";
import { Marquee } from "./components/primitives/Marquee";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Experience } from "./components/sections/Experience";
import { Skills } from "./components/sections/Skills";
import { Philosophy } from "./components/sections/Philosophy";
import { Connect } from "./components/sections/Connect";

export function App() {
  const { themeLabel, toggleTheme } = useTheme();
  const { clock, uptime } = useLiveStats(site.birthDate);
  const idle = useIdle(site.idleSeconds);
  const secret = useKonami();
  const { soundLabel, toggle: toggleSound } = useGlitchAudio(site.enableSound);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <DotGrid />

      <Header
        clock={clock}
        soundLabel={soundLabel}
        themeLabel={themeLabel}
        menuOpen={menuOpen}
        onToggleSound={toggleSound}
        onToggleTheme={toggleTheme}
        onToggleMenu={() => setMenuOpen((v) => !v)}
      />

      <MenuOverlay
        open={menuOpen}
        items={navItems}
        onClose={() => setMenuOpen(false)}
      />

      <Hero uptime={uptime} />

      <main
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "var(--maxw)",
          margin: "0 auto",
          padding: "0 var(--gutter)",
        }}
      >
        <Marquee words={marqueeWords} />
        <About />
        <Experience />
        <Skills />
        <Philosophy />
        <Connect />
      </main>

      <Footer ownerName={site.ownerName} />

      <SecretToast show={secret} />
      <IdleScreensaver active={idle} />
    </>
  );
}
