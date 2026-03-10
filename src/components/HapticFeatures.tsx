import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HapticFeatures = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scannerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const agingRef = useRef<HTMLDivElement>(null);
    const daysRef = useRef<HTMLSpanElement>(null);
    const meatTextureRef = useRef<HTMLImageElement>(null);

    // Custom cursor for surgical precision
    const surgicalCursorRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const splitTopRef = useRef<HTMLDivElement>(null);
    const splitBotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // 1. Escaneo Termal (El Culto al Grado)
            // On mousemove over the scanner area, we move a red line and reveal info
            const scannerEl = scannerRef.current;
            if (scannerEl && lineRef.current) {
                scannerEl.addEventListener('mousemove', (e) => {
                    const rect = scannerEl.getBoundingClientRect();
                    const y = e.clientY - rect.top;
                    gsap.to(lineRef.current, { y: y, duration: 0.1, ease: 'none' });
                    // Map position to a mock density value
                    const density = Math.min(100, Math.max(0, Math.floor((y / rect.height) * 100)));
                    const densityEl = scannerEl.querySelector('.density-value');
                    if (densityEl) densityEl.textContent = `${density}%`;
                });
            }

            // 2. Maduración Primitiva (ScrollTrigger)
            // As we scroll, meat texture goes from red to purple, and days increase.
            if (agingRef.current && meatTextureRef.current && daysRef.current) {
                let dummy = { days: 0 };
                ScrollTrigger.create({
                    trigger: agingRef.current,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: true,
                    onUpdate: (self) => {
                        gsap.to(dummy, {
                            days: self.progress * 45, // up to 45 days
                            onUpdate: () => {
                                if (daysRef.current) daysRef.current.innerText = Math.floor(dummy.days).toString().padStart(2, '0');
                            }
                        });
                        // 0 -> Red, 1 -> Dark Purple
                        gsap.to(meatTextureRef.current, {
                            filter: `hue-rotate(${self.progress * 30}deg) brightness(${1 - (self.progress * 0.4)}) contrast(${1 + (self.progress * 0.2)}) saturate(${1 - (self.progress * 0.3)})`,
                            duration: 0.1
                        });
                    }
                });
            }

            // 3. Surgical Precision (Hover -> Split)
            if (textContainerRef.current) {
                textContainerRef.current.addEventListener('mousemove', (e) => {
                    const rect = textContainerRef.current!.getBoundingClientRect();
                    gsap.to(surgicalCursorRef.current, {
                        y: e.clientY - rect.top,
                        duration: 0.1,
                    });
                });

                textContainerRef.current.addEventListener('mouseenter', () => {
                    gsap.to(surgicalCursorRef.current, { opacity: 1, duration: 0.3 });
                    gsap.to(splitTopRef.current, { y: -20, duration: 0.5, ease: 'power4.out' });
                    gsap.to(splitBotRef.current, { y: 20, duration: 0.5, ease: 'power4.out' });
                });

                textContainerRef.current.addEventListener('mouseleave', () => {
                    gsap.to(surgicalCursorRef.current, { opacity: 0, duration: 0.3 });
                    gsap.to(splitTopRef.current, { y: 0, duration: 0.5, ease: 'power4.out' });
                    gsap.to(splitBotRef.current, { y: 0, duration: 0.5, ease: 'power4.out' });
                });
            }
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full bg-black text-white relative">

            {/* Feature 1: El Culto al Grado */}
            <section className="min-h-screen py-24 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-sm font-mono text-[var(--color-blood)] tracking-widest uppercase mb-4">01. Wagyu</h2>
                    <h3 className="text-fluid-h2 font-serif leading-[0.9] text-[var(--color-bone)]">El Culto<br />al Grado</h3>
                    <p className="mt-8 font-sans text-white/50 max-w-sm">Aquí no hay carne de "supermercado". Solo ejemplares con marmoleo extremo (A5/MS9+). Es una selección hostil: o es la élite del músculo o no entra en la cámara.</p>
                </div>

                <div ref={scannerRef} className="relative h-[60vh] w-full overflow-hidden border border-white/10 rounded-sm cursor-crosshair group">
                    <img src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=85&auto=format&fit=crop" alt="Marbling" className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-1000" />

                    <div ref={lineRef} className="absolute top-0 left-0 w-full h-[1px] bg-[var(--color-blood)] glow-blood opacity-0 group-hover:opacity-100 transition-opacity">
                        {/* UI overlay element */}
                        <div className="absolute right-4 -top-3 glassmorphism px-3 py-1 font-mono text-xs text-[var(--color-blood)] border border-[var(--color-blood)]">
                            DENSIDAD: <span className="density-value">0%</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature 2: Maduración Primitiva */}
            <section ref={agingRef} className="min-h-screen py-24 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="order-2 lg:order-1 relative h-[60vh] w-full overflow-hidden border border-white/10 rounded-sm">
                    <img
                        ref={meatTextureRef}
                        src="https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=85"
                        alt="Dry Aging"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 glassmorphism p-4 border-l border-[var(--color-blood)]">
                        <div className="text-[var(--color-blood)] font-mono text-xs tracking-widest mb-1">PROTOCOLO DE MADURACIÓN [ACTIVO]</div>
                        <div className="font-mono text-6xl tracking-tighter text-white">
                            <span ref={daysRef}>00</span> <span className="text-lg text-white/40">DÍAS</span>
                        </div>
                    </div>
                </div>

                <div className="order-1 lg:order-2">
                    <h2 className="text-sm font-mono text-[var(--color-blood)] tracking-widest uppercase mb-4">02. The Bone Room</h2>
                    <h3 className="text-fluid-h2 font-serif leading-[0.9] text-[var(--color-bone)]">Maduración<br />Primitiva</h3>
                    <p className="mt-8 font-sans text-white/50 max-w-sm">Carne que ha muerto dos veces. La dejamos reposar en cámaras de sal hasta que el sabor sea tan denso que parezca mineral. Tiempo convertido en potencia.</p>
                </div>
            </section>

            {/* Feature 3: El Protocolo del Filo */}
            <section className="min-h-[80vh] py-24 px-6 md:px-12 flex flex-col items-center justify-center text-center">
                <h2 className="text-sm font-mono text-[var(--color-blood)] tracking-widest uppercase mb-4">03. Surgical Precision</h2>

                <div ref={textContainerRef} className="relative mt-8 cursor-none max-w-3xl">
                    {/* Laser Cursor */}
                    <div
                        ref={surgicalCursorRef}
                        className="absolute left-[-20%] right-[-20%] h-[1px] bg-[var(--color-blood)] glow-blood opacity-0 pointer-events-none z-20"
                    ></div>

                    <div ref={splitTopRef} className="overflow-hidden pb-[1px] relative z-10">
                        <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[var(--color-bone)] leading-none text-center">
                            ANATOMÍA EXACTA,
                        </h3>
                    </div>
                    <div ref={splitBotRef} className="overflow-hidden pt-[1px] relative z-10">
                        <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[var(--color-blood)] italic leading-none text-center">
                            NO RENTABILIDAD.
                        </h3>
                    </div>

                    <p className="mt-12 font-sans text-white/50 max-w-lg mx-auto pointer-events-none">
                        Cada pieza es diseccionada con acero quirúrgico siguiendo la anatomía exacta del animal. Despreciamos los cortes industriales. Es anatomía aplicada al placer.
                    </p>
                </div>
            </section>

        </div>
    );
};
