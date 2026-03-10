import { useEffect, useState } from 'react';

export const SystemFooter = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const d = new Date();
            setTime(d.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="w-full bg-black border-t border-white/5 py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-[10px] md:text-xs font-mono text-white/40 tracking-widest relative z-50">

            <div className="flex items-center gap-3 mb-4 md:mb-0">
                <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-blood)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-blood)]"></span>
                </div>
                <span className="uppercase text-[var(--color-blood)]">Sistema Listo //</span>
                <span>WAGYU-OS v1.0</span>
            </div>

            <div className="flex items-center gap-6">
                <span>LAT: 35.6895° N, LONG: 139.6917° E</span>
                <span>{time}</span>
            </div>

        </footer>
    );
};
