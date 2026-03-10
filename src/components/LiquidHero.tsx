import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
                y: window.innerHeight, // Animamos 'y' (transform) en vez de 'top'
                duration: 2.5,
                ease: 'power2.inOut',
                force3D: true, // Acelerador GPU
            }, 0);

            // As the laser sweeps, the image reveals via clipPath
            tl.to(imageRef.current, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 2.5,
                ease: 'power2.inOut',
            }, 0);

            // Sello Forjado (Imposing Logo Animation)
            tl.fromTo('.hero-logo', {
                scale: 2.5,
                opacity: 0,
                y: -50,
                filter: 'drop-shadow(0px 0px 0px rgba(255,42,0,0)) blur(10px)',
            }, {
                scale: 1,
                opacity: 1,
                y: 0,
                filter: 'drop-shadow(0px 0px 15px rgba(255,42,0,0.5)) blur(0px)',
                duration: 2.5,
                ease: 'expo.out',
                force3D: true, // Acelerador GPU
                onComplete: () => {
                    // Continuous Pounding / Breathing (Latido Forjado del Logo)
                    gsap.to('.hero-logo-mask', {
                        backgroundColor: 'oklch(68% 0.3 25)', // Color sangre más claro
                        duration: 1.8,
                        yoyo: true,
                        repeat: -1,
                        ease: 'sine.inOut'
                    });
                    gsap.to('.hero-logo', {
                        scale: 1.05,
                        filter: 'drop-shadow(0px 0px 40px rgba(255,42,0,0.8)) blur(0px)',
                        duration: 1.8,
                        yoyo: true,
                        repeat: -1,
                        ease: 'sine.inOut',
                        force3D: true, // Acelerador GPU
                    });
                }
            }, 0.3);

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
                onComplete: () => {
                    // Respiraciones conjuntas para Bites (Vuelve el latido rojo)
                    gsap.to('.hero-bites', {
                        textShadow: '0px 0px 40px rgba(255,42,0,0.8), 0px 0px 80px rgba(255,42,0,0.4)',
                        color: 'oklch(68% 0.3 25)', // Claridad en el punto más alto del latido
                        duration: 1.8,
                        yoyo: true,
                        repeat: -1,
                        ease: 'sine.inOut'
                    });
                }
            }, 0.6);

            // Efecto Parallax / Zoom al hacer scroll
            gsap.to(imageRef.current, {
                scale: 1.3, // El zoom que pasará suavemente
                ease: 'none',
                force3D: true, // Acelerador GPU
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1, // EL SECRETO: 1 segundo de "lag smoothing" para que el rebote del dedo no cause saltos
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-[100svh] w-full overflow-hidden bg-black text-[var(--color-bone)]">
            {/* Background Image with Laser Mask Reveal */}
            <div className="absolute inset-0 z-0 flex items-center justify-center bg-black">
                <img
                    ref={imageRef}
                    src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1200&q=85"
                    alt="Premium Wagyu Marble"
                    className="h-full w-full object-cover opacity-60 brightness-75 grayscale-[20%] will-change-transform"
                    style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', transformOrigin: 'center center' }}
                />
                {/* Laser Line */}
                <div
                    ref={laserRef}
                    className="absolute top-0 left-0 w-full h-[1px] bg-[var(--color-blood)] glow-blood z-10"
                    style={{ boxShadow: '0 0 20px 4px rgba(255, 42, 0, 0.4)' }}
                />
            </div>

            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-6 pb-24 md:p-12 md:pb-32 lg:pb-12 xl:p-16">
                <div ref={titleContainerRef} className="flex flex-col items-center gap-2">
                    <div className="mb-4 relative hero-logo mx-auto w-48 md:w-64 lg:w-80 will-change-transform will-change-filter">
                        {/* Sangre infiltrada en el logo original a través de una máscara (Elite tech) */}
                        <div
                            className="hero-logo-mask absolute inset-0 bg-[var(--color-blood)] z-10"
                            style={{
                                WebkitMaskImage: 'url(/logo.webp)',
                                WebkitMaskSize: 'contain',
                                WebkitMaskRepeat: 'no-repeat',
                                WebkitMaskPosition: 'center',
                                maskImage: 'url(/logo.webp)',
                                maskSize: 'contain',
                                maskRepeat: 'no-repeat',
                                maskPosition: 'center'
                            }}
                        />
                        {/* Imagen estructural base */}
                        <img
                            src="/logo.webp"
                            alt="Wagyu Bites Logo"
                            className="w-full h-full object-contain opacity-0"
                        />
                    </div>
                    <div className="overflow-hidden">
                        <h1 className="hero-text-line text-fluid-hero font-serif uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-[#888] drop-shadow-2xl px-4">
                            Wagyu
                        </h1>
                    </div>
                    <div className="overflow-hidden -mt-[2%] md:-mt-[4%]">
                        <h1 className="hero-text-line hero-bites text-fluid-hero font-serif italic uppercase tracking-tighter text-[var(--color-blood)] glow-blood font-light px-4">
                            Bites
                        </h1>
                    </div>
                </div>

                <div className="mt-8 md:mt-12 overflow-hidden max-w-lg">
                    <p className="hero-text-line font-sans text-sm md:text-base tracking-widest uppercase text-white/50 border border-white/10 rounded-xl bg-black/40 backdrop-blur-sm p-6 leading-relaxed relative overflow-hidden group">
                        {/* Glow accent */}
                        <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--color-blood)] glow-blood opacity-80" />
                        Sabemos lo importante que es compartir una buena comida, te ofrecemos lo mejor para que cada momento en tu mesa sea especial.
                    </p>
                </div>
            </div>
        </section>
    );
};
