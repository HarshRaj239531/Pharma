"use client";
import {
    ArrowRight, Layers, MenuIcon, XIcon, Zap, Shield, Globe, ChevronDown, ArrowUpRight,
    Cpu, Sparkles, Activity, Lock, Cloud, Code, Database, Gauge
} from "lucide-react";
import React, { useState, useRef, useEffect, useCallback } from "react";


// --- 🧲 Magnetic Interaction Wrapper ---
function Magnetic({ children, strength = 15 }) {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * (strength / 100), y: middleY * (strength / 100) });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return React.cloneElement(children, {
        ref,
        onMouseMove: handleMouse,
        onMouseLeave: reset,
        style: {
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
            willChange: "transform"
        }
    });
}

// --- ✨ Scroll Reveal Hook ---
function useScrollReveal(threshold = 0.1) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );
        const currentRef = ref.current;
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, [threshold]);

    return [ref, isVisible];
}

// --- 🍱 Advanced Bento Spotlight Card ---
function AdvancedBentoCard({ icon, title, desc, colSpan = 1, rowSpan = 1, featured = false, badge, delay = 0 }) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);
    const [revealRef, isVisible] = useScrollReveal();

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={revealRef}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
            }}
            className={`
                ${colSpan === 2 ? 'col-span-1 md:col-span-2' : 'col-span-1'} 
                ${rowSpan === 2 ? 'row-span-1 md:row-span-2' : 'row-span-1'}
                h-full w-full
            `}
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`
                    group/bento relative p-8 rounded-[2rem] bg-white border border-slate-200/60 
                    transition-all duration-500 cursor-pointer overflow-hidden h-full flex flex-col justify-between
                    shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_-10px_rgba(99,102,241,0.15)]
                    hover:-translate-y-1 hover:border-indigo-300/50
                    ${featured ? 'bg-gradient-to-b from-indigo-50/50 to-white' : ''}
                `}
            >
                {/* Spotlight Effect */}
                <div
                    className="absolute inset-0 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                    style={{ background: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.06), transparent 100%)` }}
                />

                {/* Border Glow Effect */}
                <div
                    className="absolute inset-0 z-0 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
                        maskImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'none\' stroke=\'white\' stroke-width=\'4\' rx=\'32\'/%3E%3C/svg%3E")',
                        WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'none\' stroke=\'white\' stroke-width=\'4\' rx=\'32\'/%3E%3C/svg%3E")',
                    }}
                />

                <div className="relative z-10 flex items-start justify-between w-full">
                    <div className={`
                        p-3.5 rounded-2xl transition-all duration-500 shadow-sm
                        group-hover/bento:scale-110 group-hover/bento:-rotate-3 group-hover/bento:shadow-[0_8px_20px_rgba(99,102,241,0.25)]
                        ${featured ? 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white' : 'bg-slate-50 border border-slate-100 text-indigo-600'}
                    `}>
                        {React.cloneElement(icon, { className: `w-6 h-6 ${featured ? 'text-white' : 'text-indigo-600'}` })}
                    </div>

                    {badge && (
                        <div className="px-3 py-1 rounded-full bg-slate-100/80 text-slate-600 text-xs font-semibold backdrop-blur-sm border border-slate-200">
                            {badge}
                        </div>
                    )}

                    {!badge && featured && (
                        <ArrowUpRight className="w-6 h-6 text-indigo-300 group-hover/bento:text-indigo-600 group-hover/bento:translate-x-1 group-hover/bento:-translate-y-1 transition-all duration-300" />
                    )}
                </div>

                <div className="relative z-10 mt-12">
                    <div className={`font-extrabold tracking-tight mb-2.5 ${featured ? 'text-2xl text-slate-900' : 'text-xl text-slate-900'}`}>
                        {title}
                    </div>
                    <div className={`leading-relaxed font-medium ${featured ? 'text-base text-slate-600' : 'text-sm text-slate-500'}`}>
                        {desc}
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- 🌐 Main Navbar Component ---
export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [hoverIndicator, setHoverIndicator] = useState({ opacity: 0, left: 0, width: 0 });
    const navRef = useRef(null);
    const lastScrollY = useRef(0);
    const navLinksRef = useRef(null);

    const navLinks = [
        { name: "Products", hasMenu: true },
        { name: "Solutions" },
        { name: "Developers" },
        { name: "Pricing" },
        { name: "Company" }
    ];

    useEffect(() => {
        const onScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight > 0) setScrollProgress((currentScrollY / scrollHeight) * 100);

            setScrolled(currentScrollY > 20);

            if (currentScrollY > 150 && Math.abs(currentScrollY - lastScrollY.current) > 5) {
                setVisible(currentScrollY < lastScrollY.current);
            } else if (currentScrollY <= 150) {
                setVisible(true);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "unset";
    }, [mobileOpen]);

    const handleNavHover = (e) => {
        if (!navLinksRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const parentRect = navLinksRef.current.getBoundingClientRect();
        setHoverIndicator({
            opacity: 1,
            left: rect.left - parentRect.left,
            width: rect.width,
        });
    };

    const handleNavLeave = () => {
        setHoverIndicator((prev) => ({ ...prev, opacity: 0 }));
    };

    return (
        <div
            ref={navRef}
            className={`fixed inset-x-0 top-0 z-[100] font-sans pointer-events-none transition-transform duration-700 spring-transition ${visible ? "translate-y-0" : "-translate-y-[120%]"}`}
        >
            {/* Scroll Progress Tube */}
            <div className="absolute top-0 left-0 h-[3px] w-full z-[101] overflow-hidden bg-transparent">
                <div
                    className="h-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 transition-all duration-150 ease-out shadow-[0_0_15px_rgba(99,102,241,0.8)] relative"
                    style={{ width: `${scrollProgress}%` }}
                >
                    <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-r from-transparent to-white/80" />
                </div>
            </div>

            {/* Main Navbar Pill */}
            <div className={`pointer-events-auto w-full transition-all duration-700 spring-transition ${scrolled ? "pt-5 px-4 sm:px-6" : "pt-2"}`}>
                <div
                    className={`mx-auto flex items-center justify-between relative transition-all duration-700 spring-transition
                    ${scrolled
                            ? "h-[60px] max-w-5xl bg-white/75 backdrop-blur-2xl backdrop-saturate-[1.8] border border-white/50 shadow-[0_8px_32px_rgba(15,23,42,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] rounded-full px-5"
                            : "h-[88px] max-w-7xl bg-transparent border-transparent px-6"
                        }`}
                >
                    {/* --- LEFT: Magnetic Logo --- */}
                    <div className="flex flex-1 items-center justify-start z-20">
                        <Magnetic strength={20}>
                            <div className="flex items-center gap-3 cursor-pointer group">
                                <div className={`relative flex items-center justify-center transition-all duration-500 rounded-[14px] bg-slate-900 shadow-lg shadow-slate-900/10 group-hover:shadow-indigo-500/40 group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:scale-105 group-hover:-rotate-3 overflow-hidden ${scrolled ? 'w-8 h-8' : 'w-11 h-11'}`}>
                                    <div className="absolute inset-0 bg-noise mix-blend-overlay"></div>
                                    <Layers size={scrolled ? 16 : 22} className="text-white relative z-10 transition-all duration-500" />
                                </div>
                                <span className={`font-black tracking-tight text-slate-900 transition-all duration-500 ${scrolled ? 'text-lg' : 'text-2xl'}`}>
                                    Pharmacy<span className="text-indigo-600">.</span>
                                </span>
                            </div>
                        </Magnetic>
                    </div>

                    {/* --- CENTER: Desktop Navigation --- */}
                    <div
                        ref={navLinksRef}
                        onMouseLeave={handleNavLeave}
                        className="hidden lg:flex items-center justify-center relative z-10 shrink-0 h-full"
                    >
                        {/* Gliding Background Pill */}
                        <div
                            className="absolute h-[38px] bg-slate-100/80 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.6)] border border-slate-200/50 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] z-0"
                            style={{
                                opacity: hoverIndicator.opacity,
                                left: hoverIndicator.left,
                                width: hoverIndicator.width,
                                transform: `translateY(-50%)`,
                                top: '50%'
                            }}
                        />

                        {navLinks.map((item) => (
                            <div
                                key={item.name}
                                onMouseEnter={handleNavHover}
                                className={`relative group/navitem flex h-full items-center px-1.5 ${item.hasMenu ? 'cursor-default' : 'cursor-pointer'} z-10`}
                            >
                                <a className={`relative flex items-center gap-1.5 px-4 py-2 font-bold text-slate-600 group-hover/navitem:text-slate-900 transition-colors duration-300 ${scrolled ? 'text-[14px]' : 'text-[15px]'}`}>
                                    {item.name}
                                    {item.hasMenu && <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover/navitem:text-slate-900 transition-all duration-300 group-hover/navitem:rotate-180" />}
                                </a>

                                {/* Advanced Mega Menu */}
                                {item.hasMenu && (
                                    <div className="absolute top-[calc(100%-4px)] left-1/2 -translate-x-1/2 pt-6 opacity-0 translate-y-4 invisible group-hover/navitem:opacity-100 group-hover/navitem:translate-y-0 group-hover/navitem:visible transition-all duration-400 spring-transition z-50">
                                        <div className="w-[700px] bg-white/90 backdrop-blur-3xl backdrop-saturate-[2] rounded-[2rem] border border-slate-200/60 p-3 shadow-[0_40px_80px_-20px_rgba(15,23,42,0.1),0_10px_20px_-5px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,1)] relative overflow-hidden">
                                            <div className="absolute inset-0 bg-noise mix-blend-overlay z-0" />

                                            <div className="grid grid-cols-2 gap-2 relative z-10">
                                                <div className="p-5 rounded-3xl hover:bg-slate-50 transition-colors cursor-pointer group/item flex gap-4">
                                                    <div className="p-3 bg-indigo-50 rounded-xl h-fit text-indigo-600 group-hover/item:scale-110 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all duration-300">
                                                        <Zap size={20} />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-900 mb-1">AI Workflows</div>
                                                        <div className="text-sm text-slate-500 leading-snug">Drag and drop automation powered by advanced neural nets.</div>
                                                    </div>
                                                </div>
                                                <div className="p-5 rounded-3xl hover:bg-slate-50 transition-colors cursor-pointer group/item flex gap-4">
                                                    <div className="p-3 bg-emerald-50 rounded-xl h-fit text-emerald-600 group-hover/item:scale-110 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-all duration-300">
                                                        <Shield size={20} />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-900 mb-1">Enterprise Security</div>
                                                        <div className="text-sm text-slate-500 leading-snug">Bank-grade encryption with SOC2 compliance built-in.</div>
                                                    </div>
                                                </div>
                                                <div className="p-5 rounded-3xl hover:bg-slate-50 transition-colors cursor-pointer group/item flex gap-4">
                                                    <div className="p-3 bg-blue-50 rounded-xl h-fit text-blue-600 group-hover/item:scale-110 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-300">
                                                        <Globe size={20} />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-900 mb-1">Global Edge CDN</div>
                                                        <div className="text-sm text-slate-500 leading-snug">Sub-50ms latency content delivery worldwide.</div>
                                                    </div>
                                                </div>
                                                <div className="p-5 rounded-3xl hover:bg-slate-50 transition-colors cursor-pointer group/item flex gap-4">
                                                    <div className="p-3 bg-purple-50 rounded-xl h-fit text-purple-600 group-hover/item:scale-110 group-hover/item:bg-purple-600 group-hover/item:text-white transition-all duration-300">
                                                        <Database size={20} />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-900 mb-1">Vector Database</div>
                                                        <div className="text-sm text-slate-500 leading-snug">Lightning fast semantic search for AI applications.</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-2 p-4 bg-slate-900 rounded-[1.5rem] flex items-center justify-between group/bottom cursor-pointer hover:bg-slate-800 transition-colors relative overflow-hidden">
                                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/bottom:animate-[sweep_1.5s_ease-in-out_infinite] pointer-events-none" />
                                                <div className="flex flex-col relative z-10 pl-2">
                                                    <span className="text-sm font-bold text-white mb-0.5">Explore full documentation</span>
                                                    <span className="text-xs text-slate-400 font-medium">Guides, API references, and SDKs.</span>
                                                </div>
                                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/bottom:bg-indigo-500 transition-colors relative z-10">
                                                    <ArrowRight className="w-4 h-4 text-white group-hover/bottom:translate-x-0.5 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* --- RIGHT: Desktop Actions --- */}
                    <div className="hidden lg:flex flex-1 items-center justify-end gap-3 z-20">
                        {scrolled && (
                            <div className="flex items-center justify-center relative group cursor-pointer mr-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 transition-colors">
                                <div className="absolute w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-75 left-3" />
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
                                <span className="text-xs font-bold text-emerald-700">All systems operational</span>
                            </div>
                        )}

                        <button className={`font-bold text-slate-600 hover:text-slate-900 transition-colors duration-300 focus:outline-none ${scrolled ? 'text-[14px]' : 'text-[15px]'}`}>
                            Sign in
                        </button>

                        <Magnetic strength={10}>
                            <button className={`relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none group active:scale-95 transition-transform duration-200 shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_rgba(79,70,229,0.3)] ${scrolled ? 'h-9' : 'h-11'}`}>
                                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e2e8f0_0%,#6366f1_50%,#e2e8f0_100%)] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className={`relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-900 font-bold text-white transition-all duration-300 group-hover:bg-slate-800 gap-2 z-10 overflow-hidden ${scrolled ? 'text-[14px] px-5' : 'text-[15px] px-6'}`}>
                                    <span className="relative z-10 flex items-center gap-2">
                                        Start Building
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 text-indigo-300" />
                                    </span>
                                </span>
                            </button>
                        </Magnetic>
                    </div>

                    {/* --- MOBILE: Hamburger Toggle --- */}
                    <div className="flex flex-1 items-center justify-end lg:hidden z-[101]">
                        <button
                            className={`relative rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-800 hover:bg-slate-50 transition-all ${scrolled ? 'w-10 h-10' : 'w-12 h-12'}`}
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            <div className="relative w-5 h-5 flex items-center justify-center">
                                <span className={`absolute transition-all duration-500 spring-transition ${mobileOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}><MenuIcon size={20} /></span>
                                <span className={`absolute transition-all duration-500 spring-transition ${mobileOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`}><XIcon size={20} /></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Fullscreen Menu */}
            <div className={`fixed inset-0 z-[100] lg:hidden pointer-events-auto transition-all duration-700 spring-transition ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
                <div className="absolute inset-0 bg-white/90 backdrop-blur-[40px] backdrop-saturate-[2.5]" />
                <div className="absolute inset-0 bg-noise mix-blend-overlay pointer-events-none" />
                <div className={`absolute inset-0 flex flex-col justify-center px-6 transition-transform duration-700 delay-100 spring-transition ${mobileOpen ? "translate-y-0" : "translate-y-12"}`}>
                    <div className="flex flex-col gap-6 max-w-sm mx-auto w-full relative z-10">
                        {navLinks.map((item, i) => (
                            <a key={item.name} style={{ transitionDelay: `${150 + i * 50}ms` }} className={`text-4xl font-black text-slate-900 tracking-tight transition-all duration-500 ease-out hover:text-indigo-600 flex items-center justify-between group cursor-pointer ${mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
                                {item.name}
                                {item.hasMenu && <ChevronDown className="w-8 h-8 text-slate-300 group-hover:text-indigo-400 transition-colors" />}
                            </a>
                        ))}
                        <div className={`h-px bg-slate-200 my-4 transition-all duration-700 delay-500 ${mobileOpen ? "opacity-100 w-full" : "opacity-0 w-0"}`} />
                        <div className={`flex flex-col gap-4 transition-all duration-700 delay-500 ${mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                            <button className="w-full py-4 text-lg font-bold text-slate-700 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm">
                                Sign In
                            </button>
                            <button className="w-full relative flex items-center justify-center gap-2 py-4 text-lg font-bold text-white bg-slate-900 rounded-2xl overflow-hidden hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all active:scale-[0.98]">
                                <span>Get Started Free</span>
                                <ArrowRight className="w-5 h-5 text-indigo-300" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Main App Component ---
export default function App() {
    const [heroRef, heroVisible] = useScrollReveal(0.1);

    return (
        <div className="min-h-screen bg-[#fafbfc] w-full relative overflow-hidden font-sans selection:bg-indigo-200 selection:text-indigo-900">
            <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

            {/* Global Noise Overlay */}
            <div className="fixed inset-0 z-50 bg-noise mix-blend-overlay pointer-events-none"></div>

            {/* Premium Grid Background */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
                    backgroundSize: '48px 48px',
                    maskImage: 'radial-gradient(circle at center 20%, black, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(circle at center 20%, black, transparent 80%)',
                    opacity: 0.5
                }}
            />

            {/* Glowing Orbs (Aurora Effect) */}
            <div className="absolute top-0 inset-x-0 h-[1000px] overflow-hidden pointer-events-none z-0 flex justify-center">
                <div className="absolute -top-[20%] left-1/4 w-[800px] h-[600px] rounded-[100%] bg-blue-400/20 blur-[120px] mix-blend-multiply animate-float" style={{ animationDuration: '10s' }} />
                <div className="absolute top-[10%] right-1/4 w-[600px] h-[600px] rounded-[100%] bg-indigo-400/20 blur-[120px] mix-blend-multiply animate-float" style={{ animationDuration: '14s', animationDelay: '2s' }} />
                <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-[100%] bg-purple-400/15 blur-[120px] mix-blend-multiply" />
            </div>

            <Navbar />

            <main className="pt-48 md:pt-60 pb-32 px-6 max-w-7xl mx-auto relative z-10 flex flex-col items-center">

                {/* Hero Section */}
                <div ref={heroRef} className={`text-center flex flex-col items-center transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <Magnetic strength={20}>
                        <div className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-indigo-200/60 shadow-[0_4px_20px_rgba(79,70,229,0.1)] text-indigo-800 text-sm font-bold mb-10 cursor-pointer overflow-hidden hover:bg-white/80 transition-colors">
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-indigo-100/50 to-transparent translate-x-[-100%] group-hover:animate-[sweep_2s_ease-in-out_infinite]" />
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
                            </span>
                            <span className="relative z-10 flex items-center gap-2">
                                v2.0 Architecture Deployed
                                <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </div>
                    </Magnetic>

                    <h1 className="text-6xl sm:text-7xl md:text-[6.5rem] font-black tracking-tighter text-slate-900 leading-[1.05] max-w-5xl mb-8">
                        Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-900">faster.</span> <br />
                        <span className="relative inline-block">
                            <span className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-20 blur-2xl rounded-full"></span>
                            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 drop-shadow-sm">
                                Scale infinitely.
                            </span>
                        </span>
                    </h1>

                    <p className="text-lg md:text-2xl text-slate-500 max-w-2xl font-medium leading-relaxed mb-12">
                        The complete platform for modern development teams. We've completely removed legacy code, resulting in a <b>crash-free, sub-50ms</b> experience.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-lg shadow-[0_8px_30px_rgba(15,23,42,0.2)] hover:shadow-[0_15px_40px_rgba(79,70,229,0.3)] transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
                            <Cloud className="w-5 h-5 text-indigo-300" />
                            Deploy Now
                        </button>
                        <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-2xl font-bold text-lg shadow-sm transition-all flex items-center justify-center gap-3 group">
                            <Code className="w-5 h-5 text-slate-400 group-hover:text-slate-700 transition-colors" />
                            Read the Docs
                        </button>
                    </div>
                </div>

                {/* --- Advanced Bento Grid Feature Section --- */}
                <div className="mt-40 w-full">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">Powerful out of the box</h2>
                        <p className="text-slate-500 font-medium mt-3 text-lg">Everything you need to build production-ready applications.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">

                        <AdvancedBentoCard
                            icon={<Zap />}
                            title="Instant Cold Starts"
                            desc="Our revolutionary V8 engine architecture completely eliminates cold starts. Your functions run instantly, globally, every single time."
                            colSpan={2}
                            rowSpan={2}
                            featured={true}
                            badge="NEW PIPELINE"
                            delay={100}
                        />

                        <AdvancedBentoCard
                            icon={<Cpu />}
                            title="Edge Compute"
                            desc="Run your code within milliseconds of your users across our 275+ global points of presence."
                            delay={200}
                        />

                        <AdvancedBentoCard
                            icon={<Lock />}
                            title="Zero Trust Auth"
                            desc="Built-in SOC2 compliant authentication with biometric passkey support out of the box."
                            delay={300}
                        />

                        <AdvancedBentoCard
                            icon={<Activity />}
                            title="Real-time Analytics"
                            desc="Sub-second metric ingestion. Monitor your application's vitals without performance penalty."
                            delay={400}
                        />

                        <AdvancedBentoCard
                            icon={<Network />}
                            title="Global State"
                            desc="Synchronize state across the globe with our multi-region CRDT implementation."
                            colSpan={2}
                            delay={500}
                        />

                    </div>
                </div>
            </main>
        </div>
    );
}

// Icon Fallback for Network (since it wasn't imported at top to save space, mapping it here)
function Network(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="16" y="16" width="6" height="6" rx="1"></rect>
            <rect x="2" y="16" width="6" height="6" rx="1"></rect>
            <rect x="9" y="2" width="6" height="6" rx="1"></rect>
            <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"></path>
            <path d="M12 12V8"></path>
        </svg>
    )
}