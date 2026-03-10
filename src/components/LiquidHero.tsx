import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const LiquidHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleContainerRef = useRef<HTMLDivElement>(null);
    const laserRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        // Basic GSAP timeline for the laser sweep and hero reveal
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

            // The laser sweeps down covering the 100vh
            tl.to(laserRef.current, {
                top: '100%',
                duration: 2.5,
                ease: 'power2.inOut',
            }, 0);

            // As the laser sweeps, the image reveals via clipPath
            tl.to(imageRef.current, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 2.5,
                ease: 'power2.inOut',
            }, 0);

            // Text scale down and fade in
            tl.fromTo('.hero-text-line', {
                y: 150,
                opacity: 0,
                rotateX: -20,
            }, {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 1.8,
                stagger: 0.15,
            }, 0.5);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden bg-black text-[var(--color-bone)]">
            {/* Background Image with Laser Mask Reveal */}
            <div className="absolute inset-0 z-0 flex items-center justify-center bg-black">
                <img
                    ref={imageRef}
                    src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1200&q=85"
                    alt="Premium Wagyu Marble"
                    className="h-full w-full object-cover opacity-60 mix-blend-luminosity brightness-75 grayscale-[20%]"
                    style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
                />
                {/* Laser Line */}
                <div
                    ref={laserRef}
                    className="absolute top-0 left-0 w-full h-[1px] bg-[var(--color-blood)] glow-blood z-10"
                    style={{ boxShadow: '0 0 20px 4px rgba(255, 42, 0, 0.4)' }}
                />
            </div>

            <div className="relative z-10 flex h-full flex-col justify-end p-6 pb-24 md:p-12 md:pb-32 lg:pb-12 xl:p-16">
                <div ref={titleContainerRef} className="flex flex-col gap-2">
                    <div className="overflow-hidden mb-4">
                        <img
                            src="/logo.png"
                            alt="Wagyu Bites Logo"
                            className="w-32 md:w-48 lg:w-56 object-contain hero-text-line drop-shadow-[0_0_15px_rgba(255,42,0,0.5)]"
                        />
                    </div>
                    <div className="overflow-hidden">
                        <h1 className="hero-text-line text-fluid-h1 font-serif uppercase leading-[0.8] tracking-tighter text-white drop-shadow-2xl">
                            Wagyu
                        </h1>
                    </div>
                    <div className="overflow-hidden">
                        <h1 className="hero-text-line text-fluid-h1 font-serif italic uppercase leading-[0.8] tracking-tighter text-[var(--color-blood)] glow-blood font-light">
                            Bites
                        </h1>
                    </div>
                </div>

                <div className="mt-8 md:mt-12 overflow-hidden max-w-lg">
                    <p className="hero-text-line font-sans text-sm md:text-base tracking-widest uppercase text-white/50 border-l border-[var(--color-blood)] bg-black/40 backdrop-blur-sm p-4 leading-relaxed">
                        Cada corte tiene sabor a hogar.<br />
                        Porque sabemos lo importante que es compartir una buena comida, te ofrecemos lo mejor para que cada momento en tu mesa sea especial.
                    </p>
                </div>
            </div>
        </section>
    );
};
