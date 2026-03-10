import { useEffect, useRef } from 'react';
import { LiquidHero } from './components/LiquidHero';
import { HapticFeatures } from './components/HapticFeatures';
import { DynamicDock } from './components/DynamicDock';
import { SystemFooter } from './components/SystemFooter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
    const stackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Parallax or pinned layer stack effect on desktop. 
        // Here we make the background super dark and allow sections to overlay.
    }, []);

    return (
        <div ref={stackRef} className="min-h-screen bg-black font-sans antialiased text-[var(--color-bone)] selection:bg-[var(--color-blood)] selection:text-white">
            {/* Global Grain noise filter is rendered inside LiquidHero to apply everywhere visually or we can keep it here globally */}
            <svg className="pointer-events-none fixed inset-0 z-[9999] h-full w-full opacity-[0.04] mix-blend-overlay">
                <filter id="global-grain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="4" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#global-grain)" />
            </svg>

            <main className="relative z-10">
                <LiquidHero />
                <HapticFeatures />
            </main>

            <SystemFooter />
            <DynamicDock />
        </div>
    )
}

export default App;
