"use client";
import React, { useState, useRef, useEffect } from "react";
import {
    ArrowRight, Layers, Menu, X, Shield, Cloud,
    Cpu, Activity, Database, Sparkles, MoveRight,
    BookOpen, Terminal, Boxes, ChevronDown,
    Video
} from "lucide-react";
import Link from "next/link";

// --- Custom Spotlight Card Component ---
function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isFocused) return;
        const div = divRef.current;
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
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0"
                style={{
                    opacity,
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(99,102,241,0.12), transparent 40%)`,
                }}
            />
            <div className="relative z-10">{children}</div>
        </div>
    );
}

// --- Magnetic Interaction Wrapper ---
function Magnetic({ children, strength = 20, active = true }: { children: React.ReactElement; strength?: number; active?: boolean }) {
    const ref = useRef<HTMLElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        if (!active || !ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
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
            ...(children as any).props?.style,
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
            willChange: "transform"
        }
    });
}

// --- Menu Data ---
const menuData = {
    Features: {
        featured: {
            title: "Billing Software",
            desc: "Next-gen billing with global low latency.",
            icon: <Sparkles className="w-6 h-6 text-indigo-500" />,
            link: "#"
        },
        items: [
            { title: "Inventory", desc: "Global latency <10ms", icon: <Database />, link: "#" },
            { title: "Expiry Tracking", desc: "Enterprise-grade auth", icon: <Shield />, link: "#" },
            { title: "GST Billing", desc: "Serverless execution", icon: <Cloud />, link: "#" },
            { title: "Reports & Analytics", desc: "Pre-built AI models", icon: <Cpu />, link: "#" },
            { title: "Multi-store", desc: "Manage everywhere", icon: <Boxes />, link: "#" },
            { title: "Barcode Support", desc: "Instant scanning", icon: <Activity />, link: "#" }
        ]
    },
    Resources: {
        items: [
            { title: "Blogs", desc: "Start building fast", icon: <BookOpen />, link: "/resources/blogs" },
            { title: "Help Center", desc: "Endpoints & SDKs", icon: <Terminal />, link: "/resources/help_center" },
            { title: "Community", desc: "Connect your stack", icon: <Boxes />, link: "/resources/community" },
            { title: "Videos", desc: "Learn with video tutorials", icon: <Video />, link: "/resources/videos" }
        ]
    }
};

const navLinks = ['Features', 'Solutions', 'Resources', 'Support', 'Schedule Free Demo'];

// --- Navbar Component ---
export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [hoverBox, setHoverBox] = useState({ opacity: 0, left: 0, width: 0 });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navRef = useRef<HTMLDivElement>(null);
    const menuTimer = useRef<NodeJS.Timeout | null>(null);

    // Scroll Handler
    useEffect(() => {
        let frameId: number | null = null;
        const handleScroll = () => {
            if (frameId) return;
            frameId = requestAnimationFrame(() => {
                const isScrolled = window.scrollY > 40;
                setScrolled(prev => {
                    if (prev !== isScrolled) {
                        setHoverBox(h => h.opacity === 0 ? h : { ...h, opacity: 0 });
                        setActiveMenu(null);
                        return isScrolled;
                    }
                    return prev;
                });
                frameId = null;
            });
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (frameId) cancelAnimationFrame(frameId);
        };
    }, []);

    // Hover Tracking using offsetLeft for 100% accuracy (Fixes "age piche" issue)
    const handleNavEnter = (e: React.MouseEvent<HTMLElement>, menuName: string) => {
        if (menuTimer.current) clearTimeout(menuTimer.current);
        const target = e.currentTarget;

        setHoverBox({
            opacity: 1,
            left: target.offsetLeft,
            width: target.offsetWidth,
        });

        if (menuName && (menuData as any)[menuName]) {
            setActiveMenu(menuName);
        } else {
            setActiveMenu(null);
        }
    };

    const handleNavLeave = () => {
        menuTimer.current = setTimeout(() => {
            setHoverBox(prev => ({ ...prev, opacity: 0 }));
            setActiveMenu(null);
        }, 300);
    };

    const handleDropdownEnter = () => {
        if (menuTimer.current) clearTimeout(menuTimer.current);
    };

    return (
        <>
            {/* Mobile Menu Backdrop */}
            <div
                className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90] transition-opacity duration-500 lg:hidden ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setMobileMenuOpen(false)}
            />

            {/* Main Header Container */}
            <header className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-4 pointer-events-none px-4">

                {/* Dynamic Nav Island */}
                <nav
                    className={`
                        pointer-events-auto relative flex items-center justify-between 
                        transition-[max-width,height,padding,background-color,box-shadow] 
                        duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                        w-full
                        ${scrolled
                            ? "max-w-[900px] h-14 rounded-full bg-white ring-1 ring-slate-900/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] px-4"
                            : "max-w-7xl h-20 rounded-2xl bg-transparent px-6"
                        }
                    `}
                >
                    {/* Logo Area */}
                    <div className="flex items-center z-20 shrink-0">
                        <Magnetic strength={15}>
                            <Link href="/" className="flex items-center gap-2 group p-2 rounded-xl transition-all hover:bg-slate-100/50">
                                <div className={`relative flex items-center justify-center bg-slate-950 text-white rounded-[10px] transition-[width,height,transform] duration-500 overflow-hidden shadow-md group-hover:shadow-indigo-500/30 group-hover:-translate-y-0.5 group-hover:rotate-[-2deg] ${scrolled ? 'w-8 h-8' : 'w-10 h-10'}`}>
                                    <Layers className={`relative z-10 transition-transform duration-500 group-hover:scale-110 ${scrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/40 to-purple-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <span className={`font-bold tracking-tight text-slate-950 transition-[font-size] duration-500 ${scrolled ? 'text-base' : 'text-xl'}`}>
                                    Stratum<span className="text-indigo-500">.</span>
                                </span>
                            </Link>
                        </Magnetic>
                    </div>

                    {/* Desktop Links Container */}
                    <div
                        className="hidden lg:flex items-center relative h-full mx-4"
                        ref={navRef}
                        onMouseLeave={handleNavLeave}
                    >
                        {/* Sliding Hover Pill */}
                        <div
                            className="absolute h-9 bg-slate-100/80 rounded-full z-0 transition-all duration-400 ease-out"
                            style={{
                                opacity: hoverBox.opacity,
                                left: `${hoverBox.left}px`,
                                width: `${hoverBox.width}px`,
                                top: '50%',
                                transform: 'translateY(-50%)',
                            }}
                        />

                        {/* Link Items */}
                        <div
                            ref={navRef as React.RefObject<HTMLDivElement>}
                            className="flex items-center gap-1 z-10 relative h-full"
                        >
                            {navLinks.map((item) => (
                                <div
                                    key={item}
                                    onMouseEnter={(e) => handleNavEnter(e, item)}
                                    className="px-4 py-2 cursor-pointer flex items-center gap-1.5 h-full"
                                >
                                    <span className={`font-medium transition-colors duration-200 ${activeMenu === item ? 'text-slate-950' : 'text-slate-600 hover:text-slate-950'} text-[15px]`}>
                                        {item === 'Schedule Free Demo' && scrolled ? 'Demo' : item}
                                    </span>
                                    {(menuData as any)[item] && (
                                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeMenu === item ? 'rotate-180 text-slate-900' : ''}`} />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Mega Menu Dropdown */}
                        <div
                            onMouseEnter={handleDropdownEnter}
                            onMouseLeave={handleNavLeave}
                            className={`
                                absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 pt-2 w-[650px] 
                                transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top
                                ${activeMenu ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-3 scale-95 pointer-events-none'}
                            `}
                        >
                            <div className="bg-white/95 backdrop-blur-3xl rounded-[24px] p-4 border border-slate-200/60 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden">
                                <div className="relative z-10 grid grid-cols-12 gap-3">

                                    {/* Features Menu */}
                                    {activeMenu === 'Features' && (
                                        <>
                                            <Link href={menuData.Features.featured.link} className="col-span-5 block">
                                                <SpotlightCard className="h-full p-6 flex flex-col justify-between group cursor-pointer bg-gradient-to-b from-slate-50 to-white">
                                                    <div>
                                                        <div className="w-12 h-12 bg-white shadow-sm ring-1 ring-slate-100 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                                                            {menuData.Features.featured.icon}
                                                        </div>
                                                        <h4 className="font-bold text-slate-950 text-xl tracking-tight mb-2">{menuData.Features.featured.title}</h4>
                                                        <p className="text-sm text-slate-500 leading-relaxed font-medium">{menuData.Features.featured.desc}</p>
                                                    </div>
                                                    <div className="mt-8 flex items-center text-sm font-bold text-indigo-600">
                                                        Explore Core <MoveRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                                                    </div>
                                                </SpotlightCard>
                                            </Link>

                                            <div className="col-span-7 grid grid-cols-2 gap-2">
                                                {menuData.Features.items.map((sub, i) => (
                                                    <Link key={i} href={sub.link} className="block">
                                                        <SpotlightCard className="p-3 flex flex-col gap-2 group cursor-pointer border-none shadow-none">
                                                            <div className="text-slate-400 group-hover:text-indigo-600 transition-colors w-5 h-5 [&>svg]:w-full [&>svg]:h-full">
                                                                {sub.icon}
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-bold text-slate-900 tracking-tight">{sub.title}</div>
                                                                <div className="text-xs text-slate-500 mt-0.5 font-medium">{sub.desc}</div>
                                                            </div>
                                                        </SpotlightCard>
                                                    </Link>
                                                ))}
                                            </div>
                                        </>
                                    )}

                                    {/* Resources Menu */}
                                    {activeMenu === 'Resources' && (
                                        <div className="col-span-12 grid grid-cols-2 gap-3 p-1">
                                            {menuData.Resources.items.map((sub, i) => (
                                                <Link key={i} href={sub.link || "#"} className="block group">
                                                    <SpotlightCard className="p-4 flex items-start gap-4 cursor-pointer border-none bg-transparent hover:bg-slate-50/80 rounded-xl">
                                                        <div className="p-2.5 bg-white ring-1 ring-slate-200 shadow-sm rounded-xl text-slate-500 group-hover:text-indigo-600 group-hover:shadow-md transition-all duration-500">
                                                            {React.cloneElement(sub.icon, { className: 'w-5 h-5' })}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                                                                {sub.title}
                                                                {(sub as any).badge && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100/80 text-emerald-700 ring-1 ring-emerald-200">{(sub as any).badge}</span>}
                                                            </div>
                                                            <div className="text-xs text-slate-500 mt-1 font-medium">{sub.desc}</div>
                                                        </div>
                                                    </SpotlightCard>
                                                </Link>
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
                                <span className="absolute inset-0 bg-slate-950 rounded-full" />
                                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#cbd5e1_0%,#6366f1_50%,#cbd5e1_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                            className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors focus:outline-none"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Fullscreen Menu */}
            <div className={`
                fixed inset-x-4 top-20 bottom-4 z-[95] lg:hidden
                bg-white/95 backdrop-blur-2xl ring-1 ring-slate-200/50 rounded-3xl shadow-2xl overflow-hidden
                transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${mobileMenuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}
            `}>
                <div className="p-6 h-full flex flex-col overflow-y-auto">
                    <div className="flex flex-col gap-2 flex-1 mt-4">
                        {navLinks.map((item, idx) => (
                            <div
                                key={item}
                                className="group cursor-pointer p-4 rounded-2xl hover:bg-slate-50 transition-colors flex items-center justify-between"
                                style={{
                                    transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${mobileMenuOpen ? (idx * 50) + 100 : 0}ms`,
                                    opacity: mobileMenuOpen ? 1 : 0,
                                    transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                                }}
                            >
                                <span className="text-2xl font-bold tracking-tight text-slate-900">
                                    {item === 'Schedule Free Demo' && scrolled ? 'Demo' : item}
                                </span>
                                <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
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
                            Get Started Free
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

// --- App Wrapper for Demonstration ---
export default function App() {
    return (
        <div className="min-h-[200vh] bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

            <Navbar />

            {/* Dummy Hero Section to test scroll */}
            <main className="pt-40 px-6 max-w-7xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white ring-1 ring-slate-200 shadow-sm text-sm font-medium text-slate-600 mb-8 animate-fade-in-up">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    Introducing Stratum 2.0
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.1] mb-6">
                    The Modern Way to <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                        Manage Your Business
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                    A beautiful, responsive, and robust platform crafted to handle billing, inventory, and analytics in real-time. Scroll down to see the magic navbar in action.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <button className="h-12 px-8 rounded-full bg-slate-950 text-white font-bold hover:bg-slate-900 transition-colors shadow-xl shadow-slate-900/20">
                        Start for free
                    </button>
                    <button className="h-12 px-8 rounded-full bg-white text-slate-900 font-bold ring-1 ring-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
                        View Demo
                    </button>
                </div>

                {/* Scroll Placeholder */}
                <div className="mt-32 w-full max-w-4xl mx-auto aspect-video bg-white/50 ring-1 ring-slate-200 rounded-3xl shadow-2xl backdrop-blur-sm flex items-center justify-center text-slate-400 border-[8px] border-white">
                    <p>Dashboard Preview</p>
                </div>
            </main>
        </div>
    );
}