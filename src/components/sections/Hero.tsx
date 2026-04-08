"use client";
import React, { useRef, useEffect, useState } from "react";
import {
    ArrowRight, Sparkles, Shield,
    Zap, ChevronRight, Layout, Command, Search,
    Cpu, ActivitySquare, Fingerprint
} from "lucide-react";

// --- ⚡ THE ULTIMATE QUANTUM BACKGROUND ---
function PremiumQuantumBackground() {
    const auraRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let animationFrameId: number;
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let currentX = mouseX;
        let currentY = mouseY;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const updateCursor = () => {
            currentX += (mouseX - currentX) * 0.05;
            currentY += (mouseY - currentY) * 0.05;

            if (auraRef.current) {
                auraRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
            }
            animationFrameId = requestAnimationFrame(updateCursor);
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        updateCursor();

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#f4f7fc] flex items-center justify-center perspective-[1000px]">

            {/* 1. Quantum Sweeping Orbits (Radar effect) */}
            <div className="absolute w-[600px] h-[600px] rounded-full border border-indigo-300/40 shadow-[inset_0_0_60px_rgba(99,102,241,0.08)]" />

            {/* Rotating light sweep 1 */}
            <div className="absolute w-[900px] h-[900px] rounded-full border border-transparent border-t-indigo-400/50 border-r-indigo-400/10 animate-[spin_10s_linear_infinite] will-change-transform" />

            {/* Rotating light sweep 2 (Reverse) */}
            <div className="absolute w-[1400px] h-[1400px] rounded-full border border-transparent border-b-cyan-400/40 border-l-cyan-400/10 animate-[spin_15s_linear_infinite_reverse] will-change-transform" />

            {/* 3. Shooting Data Lines */}
            <div className="absolute top-[20%] left-[-10%] w-[40%] h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-40 animate-[data-stream_4s_ease-in-out_infinite]" />
            <div className="absolute top-[60%] right-[-10%] w-[30%] h-[1px] bg-gradient-to-l from-transparent via-cyan-500 to-transparent opacity-40 animate-[data-stream_5s_ease-in-out_infinite_1s]" />

            {/* 4. Deep Cinematic Glowing Orbs */}
            <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-indigo-400/20 blur-[120px] rounded-full will-change-transform animate-[blob-pulse_8s_ease-in-out_infinite]" />
            <div className="absolute bottom-[5%] right-[15%] w-[600px] h-[600px] bg-cyan-400/20 blur-[140px] rounded-full will-change-transform animate-[blob-pulse_12s_ease-in-out_infinite_1s]" />

            {/* 5. Dynamic Mouse Aura (Soft Spotlight) */}
            <div
                ref={auraRef}
                className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/80 rounded-full blur-[80px] will-change-transform mix-blend-overlay hidden md:block"
            />

            {/* 6. Lightweight static noise - pre-rendered CSS, no SVG filter cost */}
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'1\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                backgroundRepeat: 'repeat',
                backgroundSize: '256px 256px',
            }} />
        </div>
    );
}

// --- ⚡ 3D SPATIAL SCREEN WITH FLOATING WIDGETS ---
function SpatialTiltScreen({ activeImage }: { activeImage: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const widget1Ref = useRef<HTMLDivElement>(null);
    const widget2Ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current || !cardRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Base screen tilt
        const rotateX = ((y - centerY) / centerY) * -3; // Max 3 deg tilt
        const rotateY = ((x - centerX) / centerX) * 3;

        cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

        // Floating Widgets (Extreme Parallax Depth)
        if (widget1Ref.current) (widget1Ref.current as HTMLElement).style.transform = `translate3d(${x * -0.04}px, ${y * -0.04}px, 60px)`;
        if (widget2Ref.current) (widget2Ref.current as HTMLElement).style.transform = `translate3d(${x * 0.05}px, ${y * 0.05}px, 90px)`;
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        if (widget1Ref.current) widget1Ref.current.style.transform = `translate3d(0,0,0)`;
        if (widget2Ref.current) widget2Ref.current.style.transform = `translate3d(0,0,0)`;
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[1150px] mx-auto perspective-[3000px] z-20 group mt-16"
            style={{ perspective: "3000px" }}
        >
            {/* Massive Ambient Back Glow */}
            <div className="absolute inset-16 bg-indigo-400/30 blur-[130px] rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-[1.5s] pointer-events-none" />

            <div
                ref={cardRef}
                className="relative w-full h-[400px] sm:h-[550px] lg:h-[680px] transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform transform-style-3d"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* --- FLOATING WIDGET 1 (Top Left) --- */}
                <div
                    ref={widget1Ref}
                    className="absolute -left-8 top-16 z-30 hidden lg:flex items-center gap-3 p-3.5 pr-6 rounded-2xl bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.15),inset_0_1px_0_white] transition-transform duration-[800ms] ease-out will-change-transform"
                >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-inner">
                        <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-[13px] font-bold text-slate-900 tracking-tight">AI Optimised</div>
                        <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active</div>
                    </div>
                </div>

                {/* --- FLOATING WIDGET 2 (Bottom Right) --- */}
                <div
                    ref={widget2Ref}
                    className="absolute -right-6 bottom-32 z-30 hidden lg:flex items-center gap-3 p-3 rounded-full bg-slate-900/90 backdrop-blur-xl border border-slate-700 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] transition-transform duration-[800ms] ease-out will-change-transform"
                >
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <ActivitySquare className="w-4 h-4" />
                    </div>
                    <div className="text-[13px] font-bold text-white pr-4">Live Sync</div>
                </div>

                {/* --- MAIN DASHBOARD SCREEN --- */}
                <div
                    className="absolute inset-0 sm:inset-4 md:inset-8 lg:inset-12 bg-white/40 backdrop-blur-[60px] backdrop-saturate-[2] border border-white/80 rounded-[32px] shadow-[0_80px_140px_-24px_rgba(15,23,42,0.25),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_2px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden ring-1 ring-slate-900/5"
                >
                    {/* Pro Mac Header */}
                    <div className="h-14 w-full bg-gradient-to-b from-white/80 to-white/40 border-b border-white/60 flex items-center px-6 relative z-20 backdrop-blur-xl">
                        <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] pointer-events-none" />
                        <div className="flex gap-2.5 absolute left-6">
                            <div className="w-3.5 h-3.5 rounded-full bg-slate-300 hover:bg-[#ff5f56] transition-all cursor-pointer shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)] border border-black/5" />
                            <div className="w-3.5 h-3.5 rounded-full bg-slate-300 hover:bg-[#ffbd2e] transition-all cursor-pointer shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)] border border-black/5" />
                            <div className="w-3.5 h-3.5 rounded-full bg-slate-300 hover:bg-[#27c93f] transition-all cursor-pointer shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)] border border-black/5" />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="bg-white/90 text-slate-700 text-[11px] font-bold tracking-[0.15em] uppercase px-8 py-1.5 rounded-full shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_white] flex items-center gap-2.5 border border-slate-200/60">
                                <Fingerprint className="w-3.5 h-3.5 text-indigo-500" /> workspace.app
                            </div>
                        </div>
                    </div>

                    {/* The Active Screen Content */}
                    <div className="relative flex-1 bg-[#f1f5f9] overflow-hidden group/screen p-1.5 rounded-b-[30px]">
                        <div className="relative w-full h-full rounded-b-[24px] overflow-hidden bg-white shadow-[inset_0_0_2px_rgba(0,0,0,0.1)]">
                            <img
                                key={activeImage}
                                src={activeImage}
                                alt="Dashboard Layout"
                                className="absolute inset-0 w-full h-full object-cover animate-[screenFade_0.8s_cubic-bezier(0.16,1,0.3,1)] transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/screen:scale-[1.04]"
                            />
                            {/* Pro Screen Glare (Diagonal sweep) */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-1000 pointer-events-none transform -skew-x-12" />
                            {/* Vignette Shadow */}
                            <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.08)] pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- ⚡ ULTRA-PREMIUM THUMBNAIL DOCK WITH HORIZONTAL SCROLL ---
function InteractiveShowcase() {
    const showcaseData = [
        { name: "Analytics", url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600' },
        { name: "Inventory", url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600' },
        { name: "Billing", url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1600' },
        { name: "Reporting", url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600' },
        { name: "Products", url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600' },
        { name: "Insights", url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600' },
        { name: "Settings", url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600' },
        { name: "Team", url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600' },
        { name: "Dashboard", url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600' },
    ];

    const [activeImg, setActiveImg] = useState(showcaseData[0].url);

    return (
        <div className="w-full flex flex-col items-center mt-4">
            <div className="animate-fade-in-up w-full" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                <SpatialTiltScreen activeImage={activeImg} />
            </div>

            {/* SCROLLABLE SPATIAL DOCK CONTAINER */}
            <div
                className="mt-6 relative w-full max-w-[95vw] lg:max-w-[1000px] mx-auto p-3.5 rounded-[2rem] bg-white/40 backdrop-blur-[50px] backdrop-saturate-[2] border border-white/80 shadow-[0_32px_64px_-16px_rgba(15,23,42,0.15),inset_0_1px_0_rgba(255,255,255,1)] animate-fade-in-up z-30 ring-1 ring-slate-900/5"
                style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
            >
                {/* Premium Gradient Fades for Scroll Edges */}
                <div className="absolute left-3.5 top-3.5 bottom-3.5 w-12 bg-gradient-to-r from-white/70 to-transparent z-40 pointer-events-none rounded-l-[1.5rem]" />
                <div className="absolute right-3.5 top-3.5 bottom-3.5 w-12 bg-gradient-to-l from-white/70 to-transparent z-40 pointer-events-none rounded-r-[1.5rem]" />

                {/* Horizontally Scrollable Track */}
                <div className="flex items-center gap-3.5 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 relative z-20 scroll-smooth">
                    {showcaseData.map((item, index) => (
                        <button
                            key={index}
                            onClick={(e) => {
                                setActiveImg(item.url);
                                e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                            }}
                            className={`snap-center relative group overflow-hidden rounded-[20px] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] outline-none flex-shrink-0
                                ${activeImg === item.url
                                    ? 'w-44 h-28 sm:w-60 sm:h-36 shadow-[0_16px_40px_rgba(0,0,0,0.2)] scale-100 ring-2 ring-indigo-500 ring-offset-4 ring-offset-[#f4f7fc]'
                                    : 'w-28 h-20 sm:w-36 sm:h-24 opacity-50 hover:opacity-100 hover:scale-[1.05] shadow-sm'
                                }
                            `}
                        >
                            <img
                                src={item.url}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            {/* Premium Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex items-end justify-center pb-3.5 transition-opacity duration-500 ${activeImg === item.url ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                <span className="text-white text-[12px] font-bold tracking-[0.2em] uppercase drop-shadow-lg">{item.name}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// --- MAIN PAGE COMPONENT ---
export default function Hero() {
    return (
        <section className="relative min-h-screen bg-transparent text-slate-900 overflow-hidden selection:bg-indigo-200 selection:text-indigo-900 font-sans antialiased">

            <PremiumQuantumBackground />

            {/* --- HERO CONTENT SECTION --- */}
            <section className="relative z-10 w-full pt-20 pb-20 px-4 sm:px-6 flex flex-col items-center text-center min-h-screen justify-center">

                {/* Floating Announcement Badge */}
                <div className="animate-float" style={{ animationDelay: '0s' }}>
                    <div className="animate-fade-in-up" style={{ animationFillMode: 'both' }}>
                        <div className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)] text-[13px] font-bold text-slate-800 mb-10 cursor-pointer hover:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.12)] hover:bg-white transition-all duration-300 ring-1 ring-slate-900/5">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-[0_4px_12px_rgba(99,102,241,0.4)]">
                                <Sparkles className="w-3.5 h-3.5" />
                            </span>
                            BuildFormula 2.0 is now live
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-indigo-600 transition-all" />
                        </div>
                    </div>
                </div>

                {/* Massive Cinematic Headline */}
                <h1
                    className="text-[4.5rem] sm:text-[6.5rem] lg:text-[8.5rem] font-black leading-[0.85] tracking-[-0.04em] mb-8 text-slate-900 animate-fade-in-up max-w-[1200px]"
                    style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
                >
                    Manage your pharmacy, <br className="hidden md:block" />
                    <span className="relative inline-block mt-2">
                        {/* Rich Gradient Text */}
                        <span className="bg-clip-text text-transparent bg-[linear-gradient(to_right,#4f46e5,#0ea5e9,#8b5cf6,#4f46e5)] bg-[length:200%_auto] animate-[gradient-text_6s_linear_infinite] pb-4">
                            the advanced way.
                        </span>
                    </span>
                </h1>

                {/* Highly Refined Subtext */}
                <p
                    className="text-lg md:text-[22px] text-slate-600 max-w-2xl mx-auto mb-14 font-medium leading-[1.6] tracking-tight animate-fade-in-up mix-blend-color-burn"
                    style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
                >
                    Unify your billing, inventory, and reporting into a beautifully engineered, <span className="text-slate-900 font-bold">blazing-fast interface.</span> Built for scale.
                </p>

                {/* PRO COMMAND PALETTE */}
                <div className="w-full max-w-[560px] mx-auto animate-fade-in-up relative z-30" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                    <div className="relative p-[3px] rounded-[36px] bg-[linear-gradient(110deg,#cbd5e1,transparent_25%,#cbd5e1_50%,transparent_75%,#cbd5e1)] bg-[length:200%_100%] animate-[magic-border_4s_linear_infinite] shadow-[0_24px_64px_-16px_rgba(79,70,229,0.25)] hover:shadow-[0_32px_80px_-16px_rgba(79,70,229,0.35)] transition-shadow duration-500">
                        <div className="relative flex items-center p-2 bg-white/95 backdrop-blur-3xl rounded-[33px] overflow-hidden">
                            <div className="pl-5 text-indigo-500 flex items-center justify-center">
                                <Command className="w-5 h-5 stroke-[2.5]" />
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your work email..."
                                className="w-full bg-transparent border-none outline-none px-4 py-3 text-[16px] font-semibold text-slate-800 placeholder:text-slate-400"
                            />

                            <div className="hidden sm:flex items-center gap-1 px-3 text-slate-300 font-medium text-xs">
                                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 shadow-[inset_0_-1px_0_rgba(0,0,0,0.1)]">⌘</kbd>
                                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 shadow-[inset_0_-1px_0_rgba(0,0,0,0.1)]">E</kbd>
                            </div>

                            <button className="relative overflow-hidden h-12 px-8 ml-2 rounded-full bg-slate-900 text-white font-bold text-[15px] shadow-[0_8px_20px_rgba(15,23,42,0.4),inset_0_2px_0_rgba(255,255,255,0.2)] hover:bg-slate-800 active:scale-95 transition-all flex-shrink-0 flex items-center gap-2 group">
                                <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.15)_50%,transparent_75%)] bg-[length:200%_100%] -translate-x-full group-hover:animate-[magic-border_1.5s_ease-in-out_infinite]" />
                                <span className="relative">Free Demo</span>
                                <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Elegant Trust Pill Indicators */}
                <div className="mt-16 flex items-center justify-center gap-3 sm:gap-6 text-[13px] font-bold text-slate-600 animate-fade-in-up flex-wrap" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-white/80 shadow-sm backdrop-blur-xl">
                        <Layout className="w-4 h-4 text-indigo-500" /> Beautiful UI
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-white/80 shadow-sm backdrop-blur-xl">
                        <Zap className="w-4 h-4 text-amber-500" /> Blazing Fast
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-white/80 shadow-sm backdrop-blur-xl">
                        <Shield className="w-4 h-4 text-emerald-500" /> Bank-grade Security
                    </div>
                </div>

                {/* --- THE SPATIAL SHOWCASE --- */}
                <InteractiveShowcase />

            </section>

            {/* --- ADVANCED CSS KEYFRAMES --- */}
            <style>{`
                /* Hide scrollbar for Chrome, Safari and Opera */
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                /* Hide scrollbar for IE, Edge and Firefox */
                .no-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }

                /* Data Stream (Shooting lines) */
                @keyframes data-stream {
                    0% { transform: translateX(-100%); opacity: 0; }
                    50% { opacity: 0.5; }
                    100% { transform: translateX(200vw); opacity: 0; }
                }
                /* Soft Pulse Orbs */
                @keyframes blob-pulse {
                    0%, 100% { transform: scale(1); opacity: 0.7; }
                    50% { transform: scale(1.15); opacity: 1; }
                }
                /* Text and Border Animations */
                @keyframes gradient-text {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }
                @keyframes magic-border {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }
                /* Smooth Floating Animation */
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                /* Fade In Animations */
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(40px); filter: blur(12px); }
                    to { opacity: 1; transform: translateY(0); filter: blur(0); }
                }
                @keyframes screenFade {
                    from { opacity: 0; filter: blur(24px) contrast(0.7); transform: scale(1.08); }
                    to { opacity: 1; filter: blur(0) contrast(1); transform: scale(1); }
                }
            `}</style>
        </section>
    );
}