import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ShoppingCart, Compass, Activity, Crosshair } from 'lucide-react';

gsap.registerPlugin(ScrollToPlugin);

export const DynamicDock = () => {
    const dockRef = useRef<HTMLDivElement>(null);
    const orderBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray('.dock-item');

            items.forEach((item: any) => {
                // Haptic touch interactions
                item.addEventListener('mouseenter', () => {
                    gsap.to(item, { scale: 1.15, y: -8, duration: 0.3, ease: 'power4.out' });
                });
                item.addEventListener('mouseleave', () => {
                    gsap.to(item, { scale: 1, y: 0, duration: 0.6, ease: 'power4.out' });
                });
                item.addEventListener('mousedown', () => {
                    gsap.to(item, { scale: 0.95, duration: 0.1, ease: 'power4.out' });
                    // simulate haptic vibration
                    if (navigator.vibrate) navigator.vibrate(50);
                });
                item.addEventListener('mouseup', () => {
                    gsap.to(item, { scale: 1.15, duration: 0.3, ease: 'power4.out' });
                });
                item.addEventListener('touchstart', () => {
                    gsap.to(item, { scale: 0.95, duration: 0.1 });
                    if (navigator.vibrate) navigator.vibrate(50);
                });
                item.addEventListener('touchend', () => {
                    gsap.to(item, { scale: 1, duration: 0.3 });
                });
            });

            // The North Star Pulsing Effect
            if (orderBtnRef.current) {
                gsap.to(orderBtnRef.current, {
                    boxShadow: '0px 0px 25px 5px rgba(255, 42, 0, 0.6)',
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                });
            }
        }, dockRef);

        return () => ctx.revert();
    }, []);

    const items = [
        { icon: <Compass size={20} />, label: "Origen", targetId: "modulo-origen" },
        { icon: <Activity size={20} />, label: "Escáner", targetId: "modulo-escaner" },
        { icon: <Crosshair size={20} />, label: "Precisión", targetId: "modulo-precision" },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[350px] px-4 pointer-events-none">
            <div
                ref={dockRef}
                className="glassmorphism pointer-events-auto rounded-full p-2 flex items-center justify-between border border-white/10 bg-black/60 shadow-2xl backdrop-blur-3xl"
            >
                <div className="flex gap-2 items-center">
                    {items.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                gsap.to(window, {
                                    scrollTo: { y: '#' + item.targetId, autoKill: false },
                                    duration: 1.2,
                                    ease: 'power3.inOut'
                                });
                            }}
                            className="dock-item flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-[var(--color-bone)] transition-colors hover:bg-white/10 hover:text-white group relative"
                        >
                            {item.icon}
                            <span className="absolute -top-10 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all font-mono text-xs bg-black px-2 py-1 rounded border border-white/10">
                                {item.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* The North Star - Primary CTA */}
                <button
                    ref={orderBtnRef}
                    className="relative overflow-hidden flex h-12 px-6 items-center justify-center rounded-full bg-[var(--color-blood)] text-white font-sans font-medium hover:bg-red-700 glow-blood"
                >
                    <span className="relative z-10 flex items-center gap-2 text-sm uppercase tracking-wider">
                        <ShoppingCart size={16} /> Ordenar
                    </span>
                </button>
            </div>
        </div>
    );
};
