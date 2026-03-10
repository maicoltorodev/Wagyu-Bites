import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HapticFeatures = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Micro-App States
    const [temp, setTemp] = useState(1.4); // degrees
    const [thickness, setThickness] = useState(1.5); // inches

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Simplificación Táctica: Eliminamos el "secuestro de scroll" (pin)
            // Las secciones ahora fluyen verticalmente con normalidad, lo que arregla el menú 100%.
            // Solo dejamos un efecto parallax elegante cuando la tarjeta sale de pantalla.
            const panels = gsap.utils.toArray('.haptic-panel');

            panels.forEach((panel: any, i) => {
                // Solo animamos la desaparición (parallax) de los paneles que tienen otro debajo.
                // El último panel se queda quieto para que el Footer aparezca justo debajo sin bugs visuales.
                if (i < panels.length - 1) {
                    gsap.to(panel, {
                        scale: 0.9,
                        opacity: 0.1,
                        y: -150, // Parallax suave hacia arriba
                        ease: 'none',
                        force3D: true, // GPU Engine
                        scrollTrigger: {
                            trigger: panel,
                            start: "top top",
                            end: "bottom top",
                            scrub: true,
                        }
                    });
                }
            });

            // Feedback Táctil al Hover (Transformaciones rápidas GPU)
            const hapticTargets = gsap.utils.toArray('.haptic-target');
            hapticTargets.forEach((target: any) => {
                target.addEventListener('mousedown', () => gsap.to(target, { scale: 0.96, duration: 0.1, force3D: true, ease: 'power4.out' }));
                target.addEventListener('mouseup', () => gsap.to(target, { scale: 1, duration: 0.3, force3D: true, ease: 'power2.out' }));
                target.addEventListener('mouseleave', () => gsap.to(target, { scale: 1, duration: 0.3, force3D: true, ease: 'power2.out' }));
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full bg-[#080808] text-[var(--color-bone)] z-20">

            {/* PANEL 01: MONITOR TÉRMICO */}
            <section id="modulo-escaner" className="haptic-panel min-h-[100dvh] w-full flex items-center justify-center p-6 py-24 md:p-12 relative bg-[#080808] border-b border-white/5 will-change-transform">
                {/* Textura Global Fija - Optimizada sin mix blend y baja opacidad estática */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=40&w=800')] bg-cover bg-center opacity-5 pointer-events-none"></div>

                <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full">
                    {/* Texto (5 cols) */}
                    <div className="md:col-span-5 flex flex-col justify-center h-full md:pr-4">
                        <div className="font-mono text-[var(--color-blood)] text-xs tracking-[0.3em] mb-4">MÓDULO TÁCTICO // 01</div>
                        <h2 className="text-[clamp(3.5rem,8vw,6rem)] font-serif leading-[0.9] text-[var(--color-bone)] mb-8">Monitor<br />Térmico</h2>
                        <p className="font-sans text-white/50 text-sm md:text-base leading-relaxed border-l border-white/10 pl-5">
                            Sistemas de maduración controlada. Monitorea la temperatura milimétrica para densificar sabor sin evaporar su vitalidad.
                        </p>
                    </div>

                    {/* Micro-App (7 cols) - Blur removido/reducido a simple color sólido */}
                    <div className="md:col-span-7 flex justify-end">
                        <div className="border border-white/10 p-8 md:p-12 rounded-2xl w-full max-w-lg relative overflow-hidden group haptic-target bg-[#111] shadow-2xl transform-gpu">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-blood)] to-transparent opacity-60"></div>

                            <div className="flex justify-between items-start mb-16">
                                <div className="font-mono text-white/50 text-xs tracking-widest truncate">SENSOR A5</div>
                                <div className="w-2 h-2 rounded-full bg-[var(--color-blood)] animate-pulse"></div>
                            </div>

                            <div className="text-center relative pointer-events-none mb-12">
                                <div className="font-mono text-[clamp(4.5rem,15vw,8rem)] font-light text-[var(--color-bone)] leading-none tabular-nums tracking-tighter">{temp.toFixed(1)}°</div>
                                <div className="font-mono text-[var(--color-blood)] text-[10px] tracking-[0.4em] font-bold mt-4">CELSIUS [ ESTABLE ]</div>
                            </div>

                            <div className="relative h-12 w-full mt-auto">
                                <div className="absolute top-1/2 -translate-y-1/2 w-full h-[1px] bg-white/10"></div>
                                <input
                                    type="range"
                                    min="-2"
                                    max="5"
                                    step="0.1"
                                    value={temp}
                                    onChange={(e) => setTemp(parseFloat(e.target.value))}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                                />
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 h-6 w-1 bg-[var(--color-blood)] pointer-events-none will-change-transform"
                                    style={{ left: `${((temp + 2) / 7) * 100}%`, transform: 'translateX(-50%) translateY(-50%)' }}
                                ></div>
                            </div>
                            <div className="flex justify-between mt-2 font-mono text-white/30 text-[10px] border-t border-dashed border-white/5 pt-4 uppercase tracking-widest pointer-events-none">
                                <span>-2.0°</span>
                                <span className="text-[var(--color-blood)]">HR: 85%</span>
                                <span>5.0°</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PANEL 02: CALIBRADOR DE CORTE */}
            <section id="modulo-precision" className="haptic-panel min-h-[100dvh] w-full flex items-center justify-center p-6 py-24 md:p-12 relative bg-[#050505] border-b border-[var(--color-blood)]/20 will-change-transform">

                <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full">

                    {/* Micro-App: Slicer (7 cols) */}
                    <div className="md:col-span-7 order-2 md:order-1 flex justify-start w-full">
                        <div className="w-full max-w-xl haptic-target transform-gpu">
                            <div className="font-mono text-white/40 text-xs tracking-widest mb-8 flex justify-between items-end border-b border-white/10 pb-4">
                                <span>ANATOMÍA DE CORTE</span>
                                <span className="text-[var(--color-blood)] font-bold text-lg border border-[var(--color-blood)]/30 px-3 py-1 bg-[var(--color-blood)]/10">{thickness.toFixed(1)}" PULG</span>
                            </div>

                            <div className="relative h-64 w-full flex items-center justify-center overflow-hidden border border-white/5 rounded-sm bg-[#111]">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=40&w=800')] bg-cover opacity-10 pointer-events-none grayscale"></div>

                                <div
                                    className="relative h-full bg-[var(--color-blood)]/20 border-x border-[var(--color-blood)] transition-all duration-75 ease-[none] will-change-[width]"
                                    style={{ width: `${Math.max(2, thickness * 80)}px` }}
                                ></div>

                                <input
                                    type="range"
                                    min="0.5"
                                    max="3.5"
                                    step="0.1"
                                    value={thickness}
                                    onChange={(e) => setThickness(parseFloat(e.target.value))}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                                />

                                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-[1px] border-t border-white/10 border-dashed pointer-events-none"></div>
                            </div>

                            <div className="flex justify-between mt-6 font-mono text-white/50 text-[10px] tracking-[0.2em] px-2 pointer-events-none">
                                <span>CARPACCIO</span>
                                <span>CORTE PREMIUM</span>
                                <span>TOMAHAWK</span>
                            </div>
                        </div>
                    </div>

                    {/* Texto Editorial (5 cols) */}
                    <div className="md:col-span-5 order-1 md:order-2 flex flex-col justify-center h-full pl-0 md:pl-12">
                        <div className="font-mono text-[var(--color-blood)] text-xs tracking-widest mb-4">MÓDULO TÁCTICO // 02</div>
                        <h2 className="text-[clamp(3.5rem,8vw,6rem)] font-serif leading-[0.9] text-white mb-8">Calibrador<br />de Corte</h2>
                        <p className="font-sans text-white/50 text-sm md:text-base leading-relaxed border-l border-[var(--color-blood)] pl-5">
                            Calibración brutal a nivel de milímetro. Selecciona la anchura precisa requerida para tu nivel de cocción.
                        </p>
                    </div>

                </div>
            </section>

            {/* PANEL 03: MAPA DE ORIGEN */}
            <section id="modulo-origen" className="haptic-panel min-h-[100dvh] w-full flex items-center justify-center p-6 py-24 md:p-12 relative bg-[#080808] will-change-transform">
                {/* Geometría de fondo simplificada - Sin shadow, puro CSS puro */}
                <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                    <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full">
                    {/* Texto Editorial */}
                    <div className="md:col-span-4 flex flex-col justify-center h-full pr-4">
                        <div className="font-mono text-[var(--color-blood)] text-xs tracking-[0.3em] mb-4">MÓDULO TÁCTICO // 03</div>
                        <h2 className="text-[clamp(3.5rem,8vw,6rem)] font-serif leading-[0.9] mb-8">Origen<br />Trazado</h2>
                        <p className="font-sans text-white/50 text-sm md:text-base leading-relaxed border-l border-white/10 pl-5 mb-10">
                            Telemetría inquebrantable de rastreo. Sabremos el mapa genético y las coordenadas vitales del linaje originario.
                        </p>

                        <div className="flex flex-col gap-3 max-w-xs haptic-target transform-gpu">
                            <div className="p-4 border border-[var(--color-blood)]/30 bg-[#111] flex items-center justify-between">
                                <div className="font-mono text-[10px] text-white/50 tracking-[0.3em]">LATITUD</div>
                                <div className="font-mono text-[var(--color-bone)] text-sm">34.6937° N</div>
                            </div>
                            <div className="p-4 border border-[var(--color-blood)]/30 bg-[#111] flex items-center justify-between">
                                <div className="font-mono text-[10px] text-white/50 tracking-[0.3em]">LONGITUD</div>
                                <div className="font-mono text-[var(--color-bone)] text-sm">135.5023° E</div>
                            </div>
                            <div className="mt-6 border-b border-dashed border-[var(--color-blood)]/50 pb-2 w-max mx-auto px-6 font-mono text-[10px] tracking-[0.5em] text-[var(--color-blood)] animate-pulse">
                                SISTEMA SEGURO
                            </div>
                        </div>
                    </div>

                    {/* Micro-App: Radar Map (8 cols) - Optimizado: menos divs anidados animando */}
                    <div className="md:col-span-8 flex justify-center md:justify-end mt-12 md:mt-0">
                        <div className="w-[85vw] md:w-[60vw] max-w-[500px] aspect-square rounded-full border border-white/10 flex items-center justify-center relative overflow-hidden bg-[#0A0A0A] haptic-target transform-gpu">

                            {/* Radar sweep rotativo ligero (GPU CSS) */}
                            <div className="absolute w-[50%] h-[50%] top-0 right-0 origin-bottom-left bg-gradient-to-tr from-transparent to-[var(--color-blood)] opacity-20 animate-[spin_4s_linear_infinite] rounded-tr-full will-change-transform"></div>

                            {/* Anillos Fijos */}
                            <div className="absolute inset-[10%] rounded-full border border-white/[0.03]"></div>
                            <div className="absolute inset-[30%] rounded-full border border-[var(--color-blood)]/20"></div>
                            <div className="absolute inset-[50%] rounded-full border border-white/[0.05] border-dashed"></div>
                            <div className="absolute inset-[70%] rounded-full border border-white/[0.05]"></div>

                            {/* Target central */}
                            <div className="absolute flex flex-col items-center justify-center z-20 pointer-events-none">
                                <div className="w-[1px] h-32 bg-white/10 absolute"></div>
                                <div className="w-32 h-[1px] bg-white/10 absolute"></div>
                                <div className="w-3 h-3 rounded-full bg-[var(--color-blood)] z-30"></div>
                            </div>

                            {/* Puntos de Rastreo Estáticos */}
                            <div className="absolute top-[25%] left-[30%] w-2 h-2 rounded-full bg-white opacity-80"></div>
                            <div className="absolute bottom-[35%] right-[20%] w-1 h-1 rounded-full bg-white opacity-40"></div>

                            <div className="absolute bottom-[10%] inset-x-0 text-center font-mono text-[10px] text-[var(--color-bone)]/30 tracking-[0.4em] px-4 truncate pointer-events-none">
                                <span className="text-[var(--color-blood)] font-bold opacity-80">PREFECTURA DE WAGYU</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};
