"use client";
import {
    ArrowRight, Layers, MenuIcon, XIcon, Zap, Shield, Globe,
    ChevronDown, ArrowUpRight, Play, TrendingUp, AlertCircle, Sparkles,
    Box, Activity, Command, Search, CommandIcon, Lock, Users, Cpu, Code2, LineChart,
    Database, Fingerprint
} from "lucide-react";
import React, { useState, useRef, useEffect, useCallback } from "react";

// --- 🌐 Advanced Global Mouse Tracker & Fluid Cursor ---
function MouseTracker({ children }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            const target = e.target;
            setIsHovering(!!(target.closest('button') || target.closest('a') || target.closest('.interactive-hover')));
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Smooth trailing effect for the glowing blob
    useEffect(() => {
        let animationFrameId;
        const updateSmoothPos = () => {
            setSmoothPos((prev) => ({
                x: prev.x + (mousePos.x - prev.x) * 0.1,
                y: prev.y + (mousePos.y - prev.y) * 0.1,
            }));
            animationFrameId = requestAnimationFrame(updateSmoothPos);
        };
        updateSmoothPos();
        return () => cancelAnimationFrame(animationFrameId);
    }, [mousePos]);

    return (
        <div
            className="relative w-full min-h-screen bg-[#f4f7fb] overflow-x-hidden selection:bg-blue-200 selection:text-blue-900"
            style={{ '--mouse-x': `${mousePos.x}px`, '--mouse-y': `${mousePos.y}px` }}
        >
            {/* Dynamic Background Grid that reveals on mouse hover */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:4rem_4rem] transition-opacity duration-300"
                    style={{
                        maskImage: `radial-gradient(400px circle at ${smoothPos.x}px ${smoothPos.y}px, black, transparent)`,
                        WebkitMaskImage: `radial-gradient(400px circle at ${smoothPos.x}px ${smoothPos.y}px, black, transparent)`,
                        opacity: 0.4
                    }}
                />
            </div>

            {/* Huge Soft Trailing Blob */}
            <div
                className="fixed top-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-multiply transform -translate-x-1/2 -translate-y-1/2 will-change-transform"
                style={{ transform: `translate3d(${smoothPos.x}px, ${smoothPos.y}px, 0) translate(-50%, -50%)` }}
            />

            {/* Precision Custom Cursor */}
            <div
                className="fixed top-0 left-0 z-[9999] pointer-events-none hidden lg:flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 will-change-transform"
                style={{ transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) translate(-50%, -50%)` }}
            >
                <div className={`border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full flex items-center justify-center
                    ${isHovering ? 'w-16 h-16 bg-blue-500/10 backdrop-blur-[2px] border-blue-400/50' : 'w-6 h-6 border-blue-500/50'}`}>
                    <div className={`w-1.5 h-1.5 bg-blue-600 rounded-full transition-all duration-300 ${isHovering ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`} />
                </div>
            </div>

            {children}
        </div>
    );
}

// --- 🧲 Advanced Magnetic Element ---
function Magnetic({ children, strength = 15, damping = 0.2 }) {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = useCallback((e) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * (strength / 100), y: middleY * (strength / 100) });
    }, [strength]);

    const reset = useCallback(() => setPosition({ x: 0, y: 0 }), []);

    return React.cloneElement(children, {
        ref,
        onMouseMove: handleMouse,
        onMouseLeave: reset,
        style: {
            transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
            transition: `transform ${damping}s cubic-bezier(0.16, 1, 0.3, 1)`,
            willChange: "transform"
        }
    });
}

// --- ✨ Advanced Liquid Spotlight Button ---
const LiquidButton = React.forwardRef(({ children, className, onClick, ...props }, ref) => {
    return (
        <button
            ref={ref}
            onClick={onClick}
            className={`relative overflow-hidden group active:scale-95 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${className || ''}`}
            {...props}
        >
            <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:200%_100%] -translate-x-full group-hover:animate-[sweep_1.5s_ease-in-out_infinite] z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-blue-600 group-hover:bg-blue-500 transition-colors duration-500 z-0" />
            <div className="relative z-20 flex items-center justify-center w-full h-full">
                {children}
            </div>
        </button>
    );
});
LiquidButton.displayName = 'LiquidButton';

// --- 🌐 Floating Glass Navbar ---
function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const navLinksRef = useRef(null);
    const [hoverIndicator, setHoverIndicator] = useState({ opacity: 0, left: 0, width: 0 });

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleNavHover = (e) => {
        if (!navLinksRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const parentRect = navLinksRef.current.getBoundingClientRect();
        setHoverIndicator({ opacity: 1, left: rect.left - parentRect.left, width: rect.width });
    };

    return (
        <header className={`fixed inset-x-0 top-0 z-[100] flex justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? 'pt-4' : 'pt-8'}`}>
            <nav className={`flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden
                ${scrolled ? "w-[90%] md:w-[75%] max-w-5xl h-[64px] bg-white/70 backdrop-blur-3xl border border-white/80 shadow-[0_20px_40px_-15px_rgba(37,99,235,0.1),inset_0_1px_0_rgba(255,255,255,1)] rounded-full px-4"
                    : "w-full max-w-7xl h-[70px] bg-transparent border-transparent px-8"}`}>

                {/* Logo */}
                <div className="flex items-center z-20">
                    <Magnetic strength={10}>
                        <a href="#" className="flex items-center gap-3 interactive-hover group">
                            <div className="relative flex items-center justify-center w-10 h-10 rounded-[14px] bg-gradient-to-br from-blue-600 to-blue-700 shadow-[0_8px_16px_rgba(37,99,235,0.3)] group-hover:scale-105 group-hover:-rotate-6 transition-all duration-500 overflow-hidden">
                                <Layers className="w-5 h-5 text-white relative z-10" />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.4),transparent)]" />
                            </div>
                            <span className="font-black tracking-[-0.03em] text-slate-900 text-xl hidden sm:block">BuildFormula</span>
                        </a>
                    </Magnetic>
                </div>

                {/* Desktop Links */}
                <div ref={navLinksRef} onMouseLeave={() => setHoverIndicator(p => ({ ...p, opacity: 0 }))} className="hidden lg:flex items-center justify-center gap-2 px-2 py-1.5 bg-slate-200/40 backdrop-blur-md rounded-full border border-white/50 shadow-inner relative">
                    <div className="absolute h-[36px] bg-white rounded-full shadow-sm border border-slate-200/50 pointer-events-none transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"
                        style={{ opacity: hoverIndicator.opacity, left: hoverIndicator.left, width: hoverIndicator.width, transform: `translateY(-50%)`, top: '50%' }} />

                    {["Platform", "Solutions", "Customers", "Pricing"].map((item, idx) => (
                        <a key={idx} onMouseEnter={handleNavHover} className="relative z-10 px-5 py-2 font-bold text-slate-600 hover:text-blue-700 transition-all duration-300 text-[14px] interactive-hover tracking-tight rounded-full">
                            {item}
                        </a>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-5 z-20">
                    <a href="#" className="hidden md:block font-bold text-slate-500 hover:text-slate-900 transition-colors duration-200 text-[14px] interactive-hover">Sign in</a>
                    <Magnetic strength={15}>
                        <LiquidButton className="h-11 px-7 rounded-full text-white font-bold text-[14px] shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] border border-blue-500/50">
                            <span className="flex items-center gap-2">Book Demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-400 ease-out" /></span>
                        </LiquidButton>
                    </Magnetic>
                </div>
            </nav>
        </header>
    );
}

// --- 🍱 Advanced Bento Card ---
function BentoCard({ title, desc, icon, colSpan = 1, rowSpan = 1, featured = false, delay = '0s', children }) {
    const cardRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className={`group relative rounded-[2.5rem] p-8 overflow-hidden transition-all duration-500 border hover:border-blue-300 interactive-hover animate-fade-in-up fill-mode-both
            ${colSpan === 2 ? 'md:col-span-2' : 'col-span-1'}
            ${rowSpan === 2 ? 'md:row-span-2 min-h-[400px]' : 'min-h-[260px]'}
            ${featured ? 'bg-white shadow-[0_20px_40px_-15px_rgba(37,99,235,0.1)] border-blue-100' : 'bg-white/60 backdrop-blur-xl shadow-sm border-slate-200/60 hover:shadow-[0_10px_30px_-10px_rgba(37,99,235,0.1)]'}`}
            style={{ animationDelay: delay }}
        >
            {/* Dynamic Hover Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
                style={{ background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37,99,235,0.06), transparent 100%)` }} />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                    <div className={`p-4 rounded-2xl shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 ${featured ? 'bg-blue-50 border border-blue-100 text-blue-600' : 'bg-white border border-slate-100 text-slate-700'}`}>
                        {icon}
                    </div>
                    {featured && <ArrowUpRight className="w-6 h-6 text-slate-300 group-hover:text-blue-500 transition-colors" />}
                </div>

                <div className="mt-auto relative z-20">
                    <h3 className={`text-2xl font-black tracking-tight mb-2 ${featured ? 'text-slate-900' : 'text-slate-800'}`}>{title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed max-w-[90%]">{desc}</p>
                </div>
            </div>

            {/* Custom Visual Elements Passed as Children */}
            {children}
        </div>
    );
}

const carouselImages = [
    "/home.png",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1000"
];

// --- 🚀 ULTRA-PRO HERO & DASHBOARD ---
export function Hero() {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [parallax, setParallax] = useState({ x: 0, y: 0 });
    const [activeImage, setActiveImage] = useState(carouselImages[0]);
    const imageRef = useRef(null);

    const handleImageMouseMove = useCallback((e) => {
        if (!imageRef.current) return;
        requestAnimationFrame(() => {
            const rect = imageRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const tiltX = ((y / rect.height) - 0.5) * -10;
            const tiltY = ((x / rect.width) - 0.5) * 10;
            setTilt({ x: tiltX, y: tiltY });

            setParallax({ x: ((x / rect.width) - 0.5) * 40, y: ((y / rect.height) - 0.5) * 40 });
        });
    }, []);

    const handleImageMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setParallax({ x: 0, y: 0 });
    };

    return (
        <main className="w-full pt-44 pb-20 px-4 sm:px-6">

            {/* Global CSS Animations */}
            <style>{`
                @keyframes sweep { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
                @keyframes text-shine { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
                .animate-text-shine { background-size: 200% auto; animation: text-shine 6s linear infinite; }
                
                @keyframes fade-in-up { 
                    from { opacity: 0; transform: translateY(30px); filter: blur(8px); } 
                    to { opacity: 1; transform: translateY(0); filter: blur(0); } 
                }
                .animate-fade-in-up { animation: fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
                .fill-mode-both { animation-fill-mode: both; }

                /* Scrolling Marquee */
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-50% - 2rem)); } }
                .animate-marquee { animation: marquee 40s linear infinite; }
            `}</style>

            {/* ── Typography Section ── */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-6xl mx-auto">

                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-blue-100 shadow-[0_2px_10px_rgba(37,99,235,0.08)] text-sm font-bold text-blue-900 mb-10 animate-fade-in-up fill-mode-both interactive-hover cursor-pointer group">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white shadow-inner">
                        <Sparkles className="w-3.5 h-3.5" />
                    </span>
                    Introducing BuildFormula V2.0
                    <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-transform" />
                </div>

                <h1 className="text-[4rem] md:text-[6.5rem] lg:text-[7.5rem] font-black text-slate-900 leading-[0.9] tracking-[-0.04em] mb-8 max-w-[1050px] animate-fade-in-up fill-mode-both" style={{ animationDelay: '0.1s' }}>
                    The modern standard for <br className="hidden md:block" />
                    <span className="relative inline-block mt-2 px-2">
                        <span className="relative bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_auto] text-transparent bg-clip-text animate-text-shine drop-shadow-sm">
                            pharmacy
                        </span>
                        <svg className="absolute w-[110%] h-6 -bottom-2 -left-4 text-blue-300/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                            <path d="M0,10 Q50,25 100,10" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                        </svg>
                    </span>
                    management.
                </h1>

                <p className="text-lg md:text-[22px] text-slate-500 max-w-2xl mx-auto mb-14 font-medium leading-[1.6] tracking-tight animate-fade-in-up fill-mode-both" style={{ animationDelay: '0.2s' }}>
                    Bring billing, inventory, reporting, and team collaboration into one <b className="text-slate-800 font-bold">blazing-fast interface.</b> Built for scale.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-5 animate-fade-in-up fill-mode-both" style={{ animationDelay: '0.3s' }}>
                    <Magnetic strength={15}>
                        <LiquidButton className="h-16 px-10 rounded-full text-white font-bold text-[17px] shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)] border border-blue-500/50 group">
                            <span className="flex items-center gap-3">
                                Start Building Free
                                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white transition-colors">
                                    <ArrowRight className="w-4 h-4 text-white group-hover:text-blue-600 transition-colors" />
                                </span>
                            </span>
                        </LiquidButton>
                    </Magnetic>
                    <Magnetic strength={10}>
                        <button className="h-16 px-10 rounded-full bg-white/60 backdrop-blur-2xl text-slate-800 font-bold text-[17px] flex items-center gap-3 border border-slate-200/80 shadow-[0_8px_20px_-5px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,1)] hover:bg-white hover:border-blue-200 hover:shadow-[0_15px_30px_-10px_rgba(37,99,235,0.15)] transition-all duration-500 interactive-hover group">
                            <span className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors border border-blue-100">
                                <Play className="w-4 h-4 fill-blue-600 text-blue-600 ml-0.5" />
                            </span>
                            Watch Keynote
                        </button>
                    </Magnetic>
                </div>
            </div>



            {/* ── 3D Interactive Dashboard ── */}
            <div className="relative z-20 mt-20 max-w-[1250px] mx-auto animate-fade-in-up fill-mode-both" style={{ animationDelay: '0.5s', perspective: "2500px" }}>

                <div
                    ref={imageRef}
                    onMouseMove={handleImageMouseMove}
                    onMouseLeave={handleImageMouseLeave}
                    className="relative w-full will-change-transform z-10"
                    style={{
                        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`,
                        transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
                        transformStyle: "preserve-3d"
                    }}
                >
                    {/* Dashboard Drop Shadow */}
                    <div
                        className="absolute -bottom-20 left-12 right-12 h-32 bg-blue-900/20 blur-[50px] rounded-[100%] transition-transform duration-150 -z-10"
                        style={{ transform: `translate3d(${tilt.y * -3}px, ${tilt.x * 3}px, -150px)` }}
                    />

                    {/* Left Parallax Widget */}
                    <div className="absolute -left-12 top-32 z-50 p-4 rounded-3xl bg-white/90 backdrop-blur-3xl border border-white shadow-[0_20px_40px_-10px_rgba(37,99,235,0.15)] hidden lg:flex items-center gap-4 pointer-events-none"
                        style={{ transform: `translate3d(${parallax.x}px, ${parallax.y}px, 100px)`, transition: 'transform 0.1s linear' }}>
                        <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl"><LineChart className="w-6 h-6" /></div>
                        <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Live Traffic</p>
                            <p className="text-2xl font-black text-slate-900 tracking-tight">14.2k <span className="text-sm text-emerald-500 font-bold">req/s</span></p>
                        </div>
                    </div>

                    {/* Hardware Frame */}
                    <div className="relative p-2.5 rounded-[2.5rem] bg-white/40 backdrop-blur-3xl shadow-[0_40px_80px_-20px_rgba(37,99,235,0.2),inset_0_1px_0_rgba(255,255,255,1)] border border-white/80">
                        <div className="relative rounded-[2rem] bg-slate-900 shadow-inner overflow-hidden ring-1 ring-slate-900/10 flex flex-col group/mockup">

                            {/* Browser Header */}
                            <div className="flex items-center justify-between px-5 py-3.5 bg-[#1e1e1e] border-b border-white/5 relative z-20 shrink-0">
                                <div className="flex items-center gap-2 w-1/3">
                                    <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
                                    <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
                                </div>
                                <div className="flex items-center justify-center px-4 py-1.5 rounded-md bg-[#000] border border-white/10 text-xs font-medium text-slate-400 w-1/3">
                                    <Lock className="w-3 h-3 text-slate-500 mr-2" /> buildformula.com
                                </div>
                                <div className="w-1/3 flex justify-end text-slate-500"><MenuIcon className="w-4 h-4" /></div>
                            </div>

                            {/* Screen Viewport */}
                            <div className="relative aspect-[16/10] lg:aspect-[16/9] bg-[#0a0a0a] overflow-hidden w-full h-full">
                                <img
                                    src={activeImage}
                                    alt="Interface"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/mockup:scale-[1.02]"
                                />
                            </div>
                        </div>

                        {/* Floating Image Dock */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-50">
                            <div className="p-3 rounded-[2rem] bg-white/60 backdrop-blur-3xl border border-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] flex items-center gap-4">
                                {carouselImages.map((imgSrc, index) => {
                                    const isActive = activeImage === imgSrc;
                                    return (
                                        <div key={index} onClick={() => setActiveImage(imgSrc)} className="relative group/dock cursor-pointer interactive-hover">
                                            <div className={`overflow-hidden rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom
                                                ${isActive ? 'w-[120px] h-[80px] shadow-[0_20px_40px_rgba(37,99,235,0.3)] ring-4 ring-blue-500 scale-110 -translate-y-4'
                                                    : 'w-[90px] h-[60px] ring-1 ring-slate-900/10 hover:w-[100px] hover:h-[70px] hover:-translate-y-2 hover:shadow-xl'}`}>
                                                <img src={imgSrc} className="w-full h-full object-cover" alt="thumbnail" />
                                                <div className={`absolute inset-0 bg-slate-900/40 transition-opacity ${isActive ? 'opacity-0' : 'opacity-100 group-hover/dock:opacity-10'}`} />
                                            </div>
                                            {isActive && <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-900" />}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </main>
    );
}

export default function App() {
    return (
        <MouseTracker>
            <Navbar />
            <Hero />
        </MouseTracker>
    );
}