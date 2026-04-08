"use client";
import React, { useState, useRef, useEffect } from "react";
import {
    ArrowRight, Layers, Menu, X, Zap, Shield, Globe, ChevronDown,
    Cpu, Activity, Lock, Cloud, Code, Database, Sparkles, MoveRight,
    PlayCircle, BookOpen, MessageCircle, Terminal, Boxes
} from "lucide-react";
import Link from "next/link";

// --- Custom Spotlight Card Component ---
// Creates a glowing highlight that follows the mouse
function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const divRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!divRef.current || isFocused) return;
        const div = divRef.current as HTMLDivElement;
        const rect = div.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => { setIsFocused(true); setOpacity(1); };
    const handleBlur = () => { setIsFocused(false); setOpacity(0); };
    const handleMouseEnter = () => { setOpacity(1); };
    const handleMouseLeave = () => { setOpacity(0); };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-white/50 transition-colors hover:bg-white/80 ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(99,102,241,0.12), transparent 40%)`,
                }}
            />
            {children}
        </div>
    );
}

// --- Magnetic Interaction Wrapper ---
function Magnetic({ children, strength = 20, active = true }: { children: React.ReactElement; strength?: number; active?: boolean }) {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        if (!active || !ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = (ref.current as HTMLElement).getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * (strength / 100), y: middleY * (strength / 100) });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    return React.cloneElement(children as React.ReactElement<any>, {
        ref,
        onMouseMove: handleMouse,
        onMouseLeave: reset,
        style: {
            ...(children as React.ReactElement<any>).props.style,
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
            willChange: "transform"
        }
    });
}

// --- Menu Data ---
const menuData: Record<string, any> = {
    Features: {
        featured: {
            title: "Billing Software",
            desc: "Global latency <10ms",
            icon: <Sparkles className="w-6 h-6 text-indigo-500" />,
            link: "#"
        },
        items: [
            { title: "Inventory Management", desc: "Global latency <10ms", icon: <Database /> },
            { title: "Expiry Tracking", desc: "Enterprise-grade auth", icon: <Shield /> },
            { title: "GST Billing", desc: "Serverless execution", icon: <Cloud /> },
            { title: "Reports & Analytics", desc: "Pre-built AI models", icon: <Cpu /> },
            { title: "Multi-store Management", desc: "Pre-built AI models", icon: <Cpu /> },
            { title: "Barcode Support", desc: "Pre-built AI models", icon: <Cpu /> }
        ]
    },
    Resources: {
        items: [
            { title: "Blogs", desc: "Start building fast", icon: <BookOpen /> },
            { title: "Help Center / Docs", desc: "Endpoints & SDKs", icon: <Terminal /> },
            { title: "FAQs", desc: "Connect your stack", icon: <Boxes /> },
            { title: "Case Studies", desc: "All systems operational", icon: <Activity />, badge: "99.99%" }
        ]
    }
};

// --- Navbar Component ---
export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [hoverBox, setHoverBox] = useState({ opacity: 0, left: 0, width: 0 });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navRef = useRef(null);
    const menuTimer = useRef(null);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;



        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 60);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavEnter = (e: React.MouseEvent, menuName: string | null) => {
        clearTimeout(menuTimer.current as any);
        if (!navRef.current) return;

        const target = e.currentTarget as HTMLElement;
        const parent = (navRef.current as HTMLElement).getBoundingClientRect();
        const child = target.getBoundingClientRect();

        setHoverBox({
            opacity: 1,
            left: child.left - parent.left,
            width: child.width,
        });

        if (menuName) setActiveMenu(menuName as any);
    };

    const handleNavLeave = () => {
        menuTimer.current = setTimeout(() => {
            setHoverBox(prev => ({ ...prev, opacity: 0 }));
            setActiveMenu(null);
        }, 300) as any;
    };

    const handleDropdownEnter = () => {
        clearTimeout(menuTimer.current as any);
    };

    return (
        <>
            {/* Spacer for sticky mobile menu backdrop */}
            <div
                className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90] transition-opacity duration-500 lg:hidden ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setMobileMenuOpen(false)}
            />

            {/* Main Header Container */}
            <header className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-4 pointer-events-none px-4">

                {/* Dynamic Nav Island */}
                <nav
                    ref={navRef}
                    onMouseLeave={handleNavLeave}
                    className={`
            pointer-events-auto relative flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top will-change-[width,height,border-radius,padding,transform,background-color] transform-gpu
            ${scrolled
                            ? "w-[min(850px,95vw)] h-14 rounded-full bg-white/80 backdrop-blur-xl ring-1 ring-slate-900/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] px-5 translate-z-0"
                            : "w-full max-w-7xl h-20 rounded-2xl bg-transparent border-transparent px-6 translate-z-0"
                        }
          `}
                >
                    {/* Logo Area */}
                    <div className="flex items-center gap-2 z-20 shrink-0">
                        <Magnetic strength={15}>
                            <a href="#" className="flex items-center gap-2 group p-2 -ml-2 rounded-xl transition-all hover:bg-slate-100/50">
                                <div className={`relative flex items-center justify-center bg-slate-950 text-white rounded-[10px] transition-all duration-500 overflow-hidden shadow-md shadow-slate-900/20 group-hover:shadow-indigo-500/30 group-hover:-translate-y-0.5 group-hover:rotate-[-2deg] ${scrolled ? 'w-8 h-8' : 'w-10 h-10'}`}>
                                    <Layers className={`relative z-10 transition-transform duration-500 group-hover:scale-110 ${scrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/40 to-purple-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <span className={`font-bold tracking-tight text-slate-950 transition-all duration-500 ${scrolled ? 'text-base' : 'text-xl'}`}>
                                    Stratum<span className="text-indigo-500">.</span>
                                </span>
                            </a>
                        </Magnetic>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center relative h-full">
                        {/* Sliding Hover Pill */}
                        <div
                            className="absolute h-9 bg-slate-100/80 rounded-full z-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            style={{
                                opacity: hoverBox.opacity,
                                left: hoverBox.left,
                                width: hoverBox.width,
                                top: '50%',
                                transform: 'translateY(-50%)',
                            }}
                        />

                        <div className="flex items-center gap-1 z-10">
                            {['Features', 'Solutions', 'Resources', 'Pricing', 'About Us', 'Contact Us'].map((item) => (
                                <div
                                    key={item}
                                    onMouseEnter={(e) => handleNavEnter(e, (menuData as any)[item] ? item : null)}
                                    onClick={(e) => {
                                        if ((menuData as any)[item]) {
                                            e.stopPropagation();
                                            setActiveMenu(prev => prev === item ? null : item);
                                        }
                                    }}
                                    className="px-4 py-2 cursor-pointer flex items-center gap-1.5"
                                >
                                    <span className={`font-medium transition-colors duration-200 ${activeMenu === item ? 'text-slate-950' : 'text-slate-600 hover:text-slate-950'} text-[15px]`}>
                                        {item}
                                    </span>
                                    {menuData[item] && (
                                        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeMenu === item ? 'rotate-180 text-slate-900' : ''}`} />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Mega Menu Dropdown */}
                        <div
                            onMouseEnter={handleDropdownEnter}
                            onMouseLeave={handleNavLeave}
                            className={`
                absolute top-[calc(100%+1rem)] left-1/2 -translate-x-1/2 pt-2 w-[650px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${activeMenu ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}
              `}
                        >
                            <div className="bg-white/90 backdrop-blur-3xl rounded-[24px] p-4 border border-slate-200/60 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,1)] relative overflow-hidden">
                                <div className="relative z-10 grid grid-cols-12 gap-3">

                                    {activeMenu === 'Features' && (
                                        <>
                                            {/* Featured Spotlight Card */}
                                            <SpotlightCard className="col-span-5 p-6 flex flex-col justify-between group cursor-pointer bg-gradient-to-b from-slate-50 to-white">
                                                <div>
                                                    <div className="w-12 h-12 bg-white shadow-sm ring-1 ring-slate-100 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                                        {menuData.Features.featured.icon}
                                                    </div>
                                                    <h4 className="font-bold text-slate-950 text-xl tracking-tight mb-2">{menuData.Features.featured.title}</h4>
                                                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{menuData.Features.featured.desc}</p>
                                                </div>
                                                <div className="mt-8 flex items-center text-sm font-bold text-indigo-600">
                                                    Explore Core <MoveRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                                                </div>
                                            </SpotlightCard>

                                            {/* Grid Column */}
                                            <div className="col-span-7 grid grid-cols-2 gap-2">
                                                {menuData.Features.items.map((sub: any, i: number) => (
                                                    <SpotlightCard key={i} className="p-4 flex flex-col gap-3 group cursor-pointer">
                                                        <div className="text-slate-400 group-hover:text-indigo-600 transition-colors w-5 h-5 [&>svg]:w-full [&>svg]:h-full">
                                                            {sub.icon}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-bold text-slate-900 tracking-tight">{sub.title}</div>
                                                            <div className="text-xs text-slate-500 mt-0.5 font-medium">{sub.desc}</div>
                                                        </div>
                                                    </SpotlightCard>
                                                ))}
                                            </div>
                                        </>
                                    )}

                                    {activeMenu === 'Resources' && (
                                        <div className="col-span-12 grid grid-cols-2 gap-3 p-1">
                                            {menuData.Resources.items.map((sub: any, i: number) => (
                                                <SpotlightCard key={i} className="p-4 flex items-start gap-4 group cursor-pointer border-none bg-transparent hover:bg-slate-50/80 rounded-xl">
                                                    <div className="p-2.5 bg-white ring-1 ring-slate-200 shadow-sm rounded-xl text-slate-500 group-hover:text-indigo-600 group-hover:shadow-md transition-all duration-500">
                                                        {React.cloneElement(sub.icon, { className: 'w-5 h-5' })}
                                                    </div>
                                                    <div>
                                                        <Link href="/resources/blogs">
                                                            <div className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                                                                {sub.title}
                                                                {sub.badge && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100/80 text-emerald-700 ring-1 ring-emerald-200">{sub.badge}</span>}
                                                            </div>
                                                        </Link>
                                                        <div className="text-xs text-slate-500 mt-1 font-medium">{sub.desc}</div>
                                                    </div>
                                                </SpotlightCard>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Actions (Desktop) */}
                    <div className="hidden lg:flex items-center gap-3 shrink-0 z-20">
                        <button className={`font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-2 ${scrolled ? 'text-sm' : 'text-[15px]'}`}>
                            Log in
                        </button>
                        <Magnetic strength={15}>
                            <button className={`
                relative flex items-center justify-center gap-2 rounded-full font-semibold
                transition-all duration-300 active:scale-95 group overflow-hidden
                ${scrolled ? 'h-9 px-4 text-sm' : 'h-11 px-6 text-[15px]'}
              `}>
                                {/* Animated Border */}
                                <span className="absolute inset-0 bg-slate-950 rounded-full" />
                                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#cbd5e1_0%,#6366f1_50%,#cbd5e1_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Button Inner */}
                                <span className="absolute inset-[1px] rounded-full bg-slate-950 transition-colors group-hover:bg-slate-900" />
                                <span className="relative flex items-center gap-2 text-white">
                                    Get Started
                                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                                </span>
                            </button>
                        </Magnetic>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden flex items-center z-20">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 -mr-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors focus:outline-none"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </nav>
            </header >

            {/* Mobile Fullscreen Menu */}
            < div className={`
        fixed inset-x-4 top-20 bottom-4 z-[95] lg:hidden
        bg-white/95 backdrop-blur-2xl ring-1 ring-slate-200/50 rounded-3xl shadow-2xl overflow-hidden
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${mobileMenuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}
      `}>
                <div className="p-6 h-full flex flex-col overflow-y-auto">
                    <div className="flex flex-col gap-2 flex-1 mt-4">
                        {['Features', 'Solutions', 'Resources', 'Pricing', 'About Us', 'Contact Us'].map((item, idx) => (
                            <div
                                key={item}
                                className="group cursor-pointer p-4 rounded-2xl hover:bg-slate-50 transition-colors"
                                style={{
                                    transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${mobileMenuOpen ? (idx * 50) + 100 : 0}ms`,
                                    opacity: mobileMenuOpen ? 1 : 0,
                                    transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold tracking-tight text-slate-900">{item}</span>
                                    <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div
                        className="mt-8 flex flex-col gap-3"
                        style={{
                            transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${mobileMenuOpen ? 400 : 0}ms`,
                            opacity: mobileMenuOpen ? 1 : 0,
                            transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                        }}
                    >
                        <button className="w-full py-4 text-center text-lg font-bold text-slate-700 bg-slate-50 ring-1 ring-slate-200 rounded-2xl active:bg-slate-100 transition-colors">
                            Log in
                        </button>
                        <button className="w-full py-4 text-center text-lg font-bold text-white bg-slate-950 rounded-2xl active:bg-slate-900 transition-colors relative overflow-hidden">
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[sweep_2s_infinite]" />
                            Get Started Free
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
}
