"use client";
import React, { useState, useEffect, useRef } from "react";
import {
    PackageSearch,
    Users,
    BellRing,
    ShieldCheck,
    ArrowRight,
    Activity,
    Zap,
    TrendingUp,
    Sparkles,
    BarChart3,
    Fingerprint,
    Network,
    CheckCircle2,
    Cpu
} from "lucide-react";

// --- God-Tier Spatial Interaction Hook (3D Tilt + Prismatic Glow + Reveal) ---
const useSpatialInteraction = () => {
    const [state, setState] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0, isHovered: false });
    const ref = useRef(null);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Fluid 3D tilt calculation
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5; // Enhanced 5 deg tilt
        const rotateY = ((x - centerX) / centerX) * 5;

        setState({ x, y, rotateX, rotateY, isHovered: true });
    };

    const handleMouseLeave = () => {
        setState((prev) => ({ ...prev, rotateX: 0, rotateY: 0, isHovered: false }));
    };

    return { ref, ...state, handleMouseMove, handleMouseLeave };
};

// --- Hyper-Advanced Spatial Bento Card ---
const SpatialCard = ({ children, className, containerClassName, delay = 0 }) => {
    const { ref, x, y, rotateX, rotateY, isHovered, handleMouseMove, handleMouseLeave } = useSpatialInteraction();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div
            className={`relative group ${containerClassName} transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1)
                ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-[0.92]'}`}
            style={{ perspective: '1400px' }}
        >
            <div
                ref={ref}
                className="relative w-full h-full rounded-[2.5rem] p-[1.5px] transition-transform duration-200 ease-out"
                style={{
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`,
                    transformStyle: 'preserve-3d',
                    zIndex: isHovered ? 40 : 10,
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {/* Iridescent / Prismatic Magnetic Border */}
                <div className="absolute inset-0 bg-slate-200/40 rounded-[2.5rem]" />
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2.5rem]"
                    style={{
                        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(59,130,246,0.8), rgba(168,85,247,0.6), rgba(236,72,153,0.4), transparent 50%)`,
                    }}
                />

                {/* Main Hyper-Glass Body */}
                <div
                    className={`relative w-full h-full rounded-[38.5px] bg-white/[0.85] backdrop-blur-[30px] backdrop-saturate-[1.8] shadow-[0_4px_30px_rgba(0,0,0,0.04)] overflow-hidden border border-white/70 ${className}`}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Spotlight Micro-Grid Reveal */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-[0.15] transition-opacity duration-500 pointer-events-none z-0"
                        style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)`,
                            backgroundSize: '24px 24px',
                            maskImage: `radial-gradient(350px circle at ${x}px ${y}px, black, transparent)`,
                            WebkitMaskImage: `radial-gradient(350px circle at ${x}px ${y}px, black, transparent)`
                        }}
                    />

                    {/* Physical Noise Texture */}
                    <div
                        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                    />

                    {/* Dynamic Glass Refraction Sheen */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay z-0"
                        style={{
                            background: `radial-gradient(800px circle at ${x}px ${y}px, rgba(255,255,255,1), transparent 40%)`,
                        }}
                    />

                    {/* Multi-Layer Parallax Content Container */}
                    <div
                        className="relative z-10 flex flex-col h-full p-8"
                        style={{
                            transform: isHovered ? 'translateZ(50px)' : 'translateZ(0px)',
                            transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Features() {
    return (
        <section className="relative py-32 bg-[#F4F6F9] selection:bg-blue-300/30 selection:text-blue-900 overflow-hidden" id="features">

            {/* Living Matrix Background (Enhanced) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_80%,transparent_100%)] opacity-[0.15] animate-[pan_120s_linear_infinite]" />
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

            {/* Cinematic Liquid Orbs */}
            <div className="absolute top-[-15%] left-[5%] w-[900px] h-[900px] bg-blue-500/10 blur-[160px] rounded-full mix-blend-multiply animate-[blob_20s_infinite_alternate] pointer-events-none" />
            <div className="absolute bottom-[-15%] right-[5%] w-[800px] h-[800px] bg-fuchsia-500/10 blur-[160px] rounded-full mix-blend-multiply animate-[blob_25s_infinite_alternate-reverse] pointer-events-none" />
            <div className="absolute top-[30%] left-[35%] w-[600px] h-[600px] bg-emerald-400/5 blur-[120px] rounded-full mix-blend-multiply animate-[blob_22s_infinite_alternate] pointer-events-none" />

            <div className="max-w-[1240px] mx-auto px-6 relative z-10">

                {/* God-Tier Header */}
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-32 animate-[fadeUp_1s_ease-out_forwards]">
                    <div className="relative inline-flex group mb-8 cursor-default">
                        <div className="absolute transition-all duration-1000 opacity-50 -inset-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500 rounded-full blur-md group-hover:opacity-100 group-hover:-inset-1 animate-tilt"></div>
                        <div className="relative inline-flex items-center gap-2.5 px-6 py-2.5 bg-white/95 backdrop-blur-xl border border-white/50 rounded-full text-xs font-bold text-slate-800 shadow-[0_2px_12px_rgba(0,0,0,0.06)] uppercase tracking-widest">
                            <Cpu className="w-4 h-4 text-blue-500 group-hover:animate-pulse" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500">Quantum Processing Core</span>
                        </div>
                    </div>

                    <h2 className="text-5xl md:text-[5.5rem] font-black text-slate-900 mb-8 tracking-tighter leading-[1.02]">
                        Intelligence that{" "}
                        <span className="relative inline-block px-2">
                            {/* Holographic Text Effect */}
                            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-600 to-fuchsia-600 drop-shadow-[0_0_30px_rgba(79,70,229,0.2)]">
                                shapes the future.
                            </span>
                        </span>
                    </h2>
                    <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
                        A physics-driven ecosystem operating at the speed of thought. Harness zero-latency predictive models and military-grade infrastructure instantly.
                    </p>
                </div>

                {/* Spatial Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[minmax(300px,auto)]">

                    {/* 1. Deep Analytics (Wide - Interactive Chart) */}
                    <SpatialCard containerClassName="md:col-span-2" delay={100}>
                        <div className="flex justify-between items-start">
                            <div className="relative z-20">
                                {/* Floating 3D Icon */}
                                <div className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-b from-white to-blue-50/80 border border-white flex items-center justify-center text-blue-600 mb-8 shadow-[0_16px_32px_rgba(59,130,246,0.2),inset_0_2px_4px_rgba(255,255,255,1)] ring-1 ring-slate-900/5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-z-[30px]">
                                    <Activity className="w-8 h-8" />
                                </div>
                                <h3 className="text-slate-900 font-bold text-3xl tracking-tight mb-4 group-hover:translate-z-[10px] transition-transform duration-500">Predictive Analytics Engine</h3>
                                <p className="text-slate-500 text-base leading-relaxed max-w-md group-hover:translate-z-[5px] transition-transform duration-500">
                                    Stop looking at the past. Our neural engine processes millions of data points to generate hyper-accurate forecasts in real-time.
                                </p>
                            </div>
                        </div>

                        {/* Animated SVG Sparkline & Data Pills */}
                        <div className="mt-12 relative flex-1 flex flex-col justify-end group-hover:translate-z-[20px] transition-transform duration-700">
                            <div className="absolute -inset-x-8 -bottom-8 h-48 bg-gradient-to-t from-blue-50/90 to-transparent pointer-events-none rounded-b-[38.5px]" />

                            {/* Advanced Flowing Line with Data Nodes */}
                            <svg className="absolute -bottom-4 -inset-x-8 w-[calc(100%+4rem)] h-36 opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                                <path
                                    d="M -10 90 C 20 80, 30 100, 50 60 C 70 20, 80 70, 110 30"
                                    fill="none"
                                    stroke="url(#blueGrad)"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    className="drop-shadow-[0_8px_16px_rgba(59,130,246,0.6)] stroke-dasharray-[250] stroke-dashoffset-[250] group-hover:animate-[drawPath_3s_ease-out_forwards]"
                                />
                                <path
                                    d="M -10 90 C 20 80, 30 100, 50 60 C 70 20, 80 70, 110 30 L 110 110 L -10 110 Z"
                                    fill="url(#fadeGrad)"
                                    className="opacity-0 group-hover:animate-[fadeIn_3s_ease-out_forwards]"
                                />
                                {/* Glowing Data Nodes */}
                                <circle cx="50" cy="60" r="2" fill="#fff" className="opacity-0 group-hover:animate-[popIn_0.5s_ease-out_forwards_1.5s] drop-shadow-[0_0_8px_#3b82f6]" />
                                <circle cx="80" cy="70" r="2" fill="#fff" className="opacity-0 group-hover:animate-[popIn_0.5s_ease-out_forwards_2s] drop-shadow-[0_0_8px_#8b5cf6]" />

                                <defs>
                                    <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#3b82f6" />
                                        <stop offset="50%" stopColor="#8b5cf6" />
                                        <stop offset="100%" stopColor="#ec4899" />
                                    </linearGradient>
                                    <linearGradient id="fadeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="rgba(59,130,246,0.25)" />
                                        <stop offset="100%" stopColor="rgba(59,130,246,0)" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            <div className="relative flex flex-wrap items-center gap-3 z-10">
                                <div className="flex items-center gap-2.5 px-4 py-2.5 bg-white/95 backdrop-blur-xl border border-white/60 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(16,185,129,0.2)] hover:-translate-y-1.5 transition-all duration-300">
                                    <div className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">Live WebSockets</span>
                                </div>
                                <div className="flex items-center gap-2.5 px-4 py-2.5 bg-white/95 backdrop-blur-xl border border-white/60 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(139,92,246,0.2)] hover:-translate-y-1.5 transition-all duration-300">
                                    <TrendingUp className="w-4 h-4 text-violet-500" />
                                    <span className="text-sm font-bold text-slate-700">Forecasting AI</span>
                                </div>
                            </div>
                        </div>
                    </SpatialCard>

                    {/* 2. Zero-Trust Security (Square - 3D Gyroscopic Radar) */}
                    <SpatialCard containerClassName="md:col-span-1" delay={200}>
                        <div className="relative w-16 h-16 rounded-[1.25rem] bg-gradient-to-b from-white to-emerald-50/80 border border-white flex items-center justify-center text-emerald-600 mb-8 shadow-[0_16px_32px_rgba(16,185,129,0.2),inset_0_2px_4px_rgba(255,255,255,1)] ring-1 ring-slate-900/5 group-hover:scale-110 transition-transform duration-700 z-20 group-hover:translate-z-[30px]">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-slate-900 font-bold text-2xl tracking-tight mb-3 group-hover:translate-z-[10px] transition-transform duration-500">Military-Grade Core</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-10 group-hover:translate-z-[5px] transition-transform duration-500">
                            Absolute data sovereignty. AES-256 encryption secures your business assets dynamically.
                        </p>

                        {/* 3D Gyroscopic Security Hologram */}
                        <div className="absolute bottom-[-15%] right-[-15%] w-72 h-72 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none flex items-center justify-center group-hover:translate-z-[40px]" style={{ transformStyle: 'preserve-3d' }}>
                            {/* X, Y, Z Axis Rotating Rings */}
                            <div className="absolute inset-4 border-[2px] border-emerald-500/20 rounded-full border-dashed animate-[spin_8s_linear_infinite]" style={{ transform: 'rotateX(60deg)' }} />
                            <div className="absolute inset-4 border-[2px] border-emerald-400/30 rounded-full border-dashed animate-[spin_12s_linear_infinite_reverse]" style={{ transform: 'rotateY(60deg)' }} />
                            <div className="absolute inset-12 border-[1px] border-emerald-500/40 rounded-full animate-[ping_4s_ease-out_infinite]" />
                            <div className="absolute bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(16,185,129,0.15)_360deg)] w-3/4 h-3/4 rounded-full animate-[spin_3s_linear_infinite]" />
                            <Fingerprint className="w-16 h-16 text-emerald-500/60 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
                        </div>

                        <div className="mt-auto space-y-4 relative z-20 group-hover:translate-z-[20px] transition-transform duration-700">
                            {['AES-256 Protocol', 'SOC2 Certified', 'RBAC Identity'].map((text, i) => (
                                <div key={i} className="flex items-center gap-3 transform group-hover:translate-x-3 transition-transform duration-500 ease-out" style={{ transitionDelay: `${i * 100}ms` }}>
                                    <div className="w-6 h-6 rounded-full bg-emerald-50/80 backdrop-blur-sm border border-emerald-200/80 flex items-center justify-center shadow-sm group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-colors duration-300" style={{ transitionDelay: `${i * 100}ms` }}>
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">{text}</span>
                                </div>
                            ))}
                        </div>
                    </SpatialCard>

                    {/* 3. Smart Workflows (Wide - Hyper Active Data Packets) */}
                    <SpatialCard containerClassName="md:col-span-2" delay={300}>
                        <div className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-b from-white to-orange-50/80 border border-white flex items-center justify-center text-orange-600 mb-8 shadow-[0_16px_32px_rgba(249,115,22,0.2),inset_0_2px_4px_rgba(255,255,255,1)] ring-1 ring-slate-900/5 group-hover:scale-110 transition-transform duration-700 group-hover:translate-z-[30px]">
                            <Network className="w-8 h-8" />
                        </div>
                        <h3 className="text-slate-900 font-bold text-3xl tracking-tight mb-4 group-hover:translate-z-[10px] transition-transform duration-500">Neural Workflows</h3>
                        <p className="text-slate-500 text-base leading-relaxed max-w-md mb-8 group-hover:translate-z-[5px] transition-transform duration-500">
                            Build autonomous pipelines. Triggers fire across your entire stack with zero latency, sending payloads instantly to any destination.
                        </p>

                        {/* Hyper-Interactive 3D Data Pipeline */}
                        <div className="mt-auto flex items-center gap-1 p-6 bg-white/60 backdrop-blur-xl rounded-[1.75rem] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04),inset_0_2px_12px_rgba(0,0,0,0.02)] w-full max-w-lg group-hover:translate-z-[40px] transition-transform duration-700">
                            {/* Node 1 */}
                            <div className="relative w-14 h-14 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center shadow-md z-10 shrink-0">
                                <PackageSearch className="w-6 h-6 text-slate-700" />
                            </div>

                            {/* Active Pipeline 1 */}
                            <div className="flex-1 h-2.5 bg-slate-100/80 rounded-full relative overflow-hidden group-hover:bg-blue-50 transition-colors duration-500 mx-1 shadow-inner">
                                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-400 to-blue-600 w-0 group-hover:w-full transition-all duration-[1000ms] ease-in-out" />
                                {/* Glowing Comet */}
                                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-8 h-2.5 bg-gradient-to-r from-transparent via-white to-white shadow-[0_0_15px_rgba(255,255,255,1)] rounded-full opacity-0 group-hover:animate-[comet_1s_ease-in-out_forwards_0.2s]" />
                            </div>

                            {/* Transformation Node */}
                            <div className="relative w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-blue-500 to-indigo-600 border border-blue-400 flex items-center justify-center shadow-[0_12px_30px_rgba(59,130,246,0.4)] z-10 shrink-0 transform group-hover:scale-[1.15] group-hover:rotate-[15deg] transition-all duration-500 delay-[1000ms]">
                                <div className="absolute inset-0 bg-white/30 blur-xl rounded-[1.5rem] opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity delay-[1200ms]" />
                                <Zap className="w-7 h-7 text-white relative z-10 drop-shadow-md" />
                            </div>

                            {/* Active Pipeline 2 */}
                            <div className="flex-1 h-2.5 bg-slate-100/80 rounded-full relative overflow-hidden group-hover:bg-orange-50 transition-colors duration-500 delay-[1000ms] mx-1 shadow-inner">
                                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-400 to-orange-600 w-0 group-hover:w-full transition-all duration-[1000ms] ease-in-out delay-[1200ms]" />
                                {/* Glowing Comet */}
                                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-8 h-2.5 bg-gradient-to-r from-transparent via-white to-white shadow-[0_0_15px_rgba(255,255,255,1)] rounded-full opacity-0 group-hover:animate-[comet_1s_ease-in-out_forwards_1.2s]" />
                            </div>

                            {/* Destination */}
                            <div className="relative w-14 h-14 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center shadow-md z-10 shrink-0 transform group-hover:-translate-y-2 transition-transform duration-500 delay-[2000ms]">
                                <BellRing className="w-6 h-6 text-orange-500 group-hover:animate-[shake_0.5s_ease-in-out_2200ms]" />
                            </div>
                        </div>
                    </SpatialCard>

                    {/* 4. Omni-CRM (Square - Orbital Avatars) */}
                    <SpatialCard containerClassName="md:col-span-1" className="flex flex-col" delay={400}>
                        <div className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-b from-white to-fuchsia-50/80 border border-white flex items-center justify-center text-fuchsia-600 mb-8 shadow-[0_16px_32px_rgba(217,70,239,0.2),inset_0_2px_4px_rgba(255,255,255,1)] ring-1 ring-slate-900/5 group-hover:-translate-y-2 transition-transform duration-700 group-hover:translate-z-[30px]">
                            <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-slate-900 font-bold text-2xl tracking-tight mb-3 group-hover:translate-z-[10px] transition-transform duration-500">Unified CRM</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-10 group-hover:translate-z-[5px] transition-transform duration-500">
                            A 360-degree view of your ecosystem. Track lifecycles, map intent, and build unbreakable relationships automatically.
                        </p>

                        <div className="mt-auto flex items-center justify-between group-hover:translate-z-[25px] transition-transform duration-700">
                            {/* Orbital Avatar Arc */}
                            <div className="relative flex items-center w-32 h-12">
                                {[
                                    { bg: 'bg-blue-100', text: 'bg-blue-500', rot: '-20deg', trans: '-15px' },
                                    { bg: 'bg-emerald-100', text: 'bg-emerald-500', rot: '-5deg', trans: '-5px' },
                                    { bg: 'bg-orange-100', text: 'bg-orange-500', rot: '10deg', trans: '5px' },
                                    { bg: 'bg-fuchsia-100', text: 'bg-fuchsia-500', rot: '25deg', trans: '15px' },
                                ].map((color, i) => (
                                    <div
                                        key={i}
                                        className={`absolute left-0 w-12 h-12 rounded-full border-[3px] border-white ${color.bg} flex items-center justify-center shadow-lg transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom-left cursor-pointer hover:!scale-125 hover:!z-20`}
                                        style={{
                                            zIndex: 4 - i,
                                            transform: `translateX(${i * 18}px)`, // Default overlap
                                        }}
                                        // CSS hack to trigger orbital spread on parent hover
                                        css={`
                                            .group:hover & {
                                                transform: translateX(${i * 12 + 10}px) translateY(${color.trans}) rotate(${color.rot});
                                            }
                                        `}
                                    >
                                        <div className={`w-4 h-4 rounded-full ${color.text} shadow-sm`} />
                                    </div>
                                ))}
                            </div>

                            <a href="#" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-fuchsia-50/80 backdrop-blur-sm border border-fuchsia-100 text-fuchsia-600 hover:bg-gradient-to-tr hover:from-fuchsia-500 hover:to-indigo-500 hover:text-white hover:border-transparent shadow-sm hover:shadow-[0_8px_20px_rgba(217,70,239,0.3)] transition-all duration-500 group/btn">
                                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:scale-110 transition-transform duration-300" />
                            </a>
                        </div>
                    </SpatialCard>

                </div>
            </div>

            {/* Global Keyframes for Ultra-Advanced Animations */}
            <style>{`
                @keyframes drawPath {
                    to { stroke-dashoffset: 0; }
                }
                @keyframes fadeIn {
                    to { opacity: 1; }
                }
                @keyframes popIn {
                    0% { opacity: 0; transform: scale(0); }
                    70% { transform: scale(1.5); }
                    100% { opacity: 1; transform: scale(1); }
                }
                @keyframes comet {
                    0% { opacity: 1; left: 0%; transform: translate(-100%, -50%); }
                    100% { opacity: 0; left: 100%; transform: translate(0%, -50%); }
                }
                .stroke-dasharray-\\[250\\] { stroke-dasharray: 250; }
                .stroke-dashoffset-\\[250\\] { stroke-dashoffset: 250; }
                
                @keyframes pan {
                    0% { background-position: 0% 0%; }
                    100% { background-position: 100% 100%; }
                }
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(40px, -60px) scale(1.1); }
                    66% { transform: translate(-30px, 30px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(50px); scale: 0.95; }
                    to { opacity: 1; transform: translateY(0); scale: 1; }
                }
                @keyframes shake {
                    0%, 100% { transform: rotate(12deg); }
                    25% { transform: rotate(25deg); }
                    75% { transform: rotate(-5deg); }
                }
                .animate-tilt {
                    animation: tilt 10s infinite linear;
                }
                @keyframes tilt {
                    0%, 50%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(1.5deg); }
                    75% { transform: rotate(-1.5deg); }
                }

                /* Hack for Orbital Avatars mapping to group hover */
                .group:hover .absolute.left-0.w-12.h-12:nth-child(1) { transform: translateX(10px) translateY(-15px) rotate(-20deg) !important; }
                .group:hover .absolute.left-0.w-12.h-12:nth-child(2) { transform: translateX(22px) translateY(-5px) rotate(-5deg) !important; }
                .group:hover .absolute.left-0.w-12.h-12:nth-child(3) { transform: translateX(34px) translateY(5px) rotate(10deg) !important; }
                .group:hover .absolute.left-0.w-12.h-12:nth-child(4) { transform: translateX(46px) translateY(15px) rotate(25deg) !important; }
            `}</style>
        </section>
    );
}