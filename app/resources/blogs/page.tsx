"use client";
import React, { useState, useRef, useEffect } from "react";
import {
    ArrowRight, Sparkles, Search, Command,
    Calendar, Clock, User, ArrowUpRight, BookOpen
} from "lucide-react";

// --- ⚡ DUMMY BLOG DATA (HINDI-LATIN) ---
const blogPosts = [
    {
        id: 1,
        title: "SaaS Business Ko 10x Kaise Scale Karein: Complete Guide",
        excerpt: "Ek successful SaaS startup banane ke liye zaroori strategies, pricing models aur customer retention techniques.",
        category: "Business",
        readTime: "8 min ki reading",
        date: "24 May 2026",
        author: "Rahul Sharma",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600",
        featured: true,
    },
    {
        id: 2,
        title: "Modern UI Design ke 5 Naye Trends (2026)",
        excerpt: "Glassmorphism se lekar spatial design tak, dekhein web design ki duniya mein kya naya chal raha hai.",
        category: "Design",
        readTime: "5 min ki reading",
        date: "20 May 2026",
        author: "Priya Singh",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
        featured: false,
    },
    {
        id: 3,
        title: "React aur Tailwind se Fast Websites Kaise Banayein",
        excerpt: "Performance optimization aur zero-lag animations ke liye React ki advanced techniques.",
        category: "Development",
        readTime: "12 min ki reading",
        date: "18 May 2026",
        author: "Amit Patel",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1600",
        featured: false,
    },
    {
        id: 4,
        title: "Marketing Automation: Samay Bachayein aur Sales Badhayein",
        excerpt: "Apne marketing campaigns ko AI aur automation tools ki madad se auto-pilot par kaise set karein.",
        category: "Marketing",
        readTime: "6 min ki reading",
        date: "15 May 2026",
        author: "Sneha Gupta",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600",
        featured: false,
    },
    {
        id: 5,
        title: "Web Web3.0 aur Blockchain ka Bhavishya",
        excerpt: "Decentralized web applications aur smart contracts kaise internet ko badal rahe hain.",
        category: "Technology",
        readTime: "10 min ki reading",
        date: "10 May 2026",
        author: "Vikram Das",
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1600",
        featured: false,
    },
    {
        id: 6,
        title: "Customer Onboarding ko Seamless Kaise Banayein",
        excerpt: "Naye users ko product sikhane aur unhe lambe samay tak retain karne ke liye behtareen UX patterns.",
        category: "Design",
        readTime: "7 min ki reading",
        date: "05 May 2026",
        author: "Priya Singh",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1600",
        featured: false,
    }
];

const categories = ["Sabhi", "Business", "Design", "Development", "Marketing", "Technology"];

// --- ⚡ ADVANCED AMBIENT BACKGROUND ---
function PremiumBackground() {
    const auraRef = useRef(null);

    useEffect(() => {
        let animationFrameId;
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let currentX = mouseX;
        let currentY = mouseY;

        const onMouseMove = (e) => {
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
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#f8fafc]">
            {/* High-End Micro Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.4] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_20%,#000_60%,transparent_100%)]" />

            {/* Cinematic Glowing Orbs */}
            <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[140px] animate-[blob-pulse_12s_ease-in-out_infinite]" />
            <div className="absolute top-[20%] left-[-5%] w-[500px] h-[500px] rounded-full bg-cyan-400/10 blur-[120px] animate-[blob-pulse_10s_ease-in-out_infinite_1s]" />
            <div className="absolute bottom-[-10%] right-[30%] w-[400px] h-[400px] rounded-full bg-fuchsia-400/5 blur-[120px] animate-[blob-pulse_14s_ease-in-out_infinite_2s]" />

            {/* Dynamic Mouse Aura Spotlight */}
            <div
                ref={auraRef}
                className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/70 rounded-full blur-[80px] will-change-transform mix-blend-overlay hidden md:block"
            />

            {/* Apple-style Matte Noise Texture */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.35] mix-blend-overlay pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <filter id="noise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
        </div>
    );
}

// --- ⚡ MOUSE SPOTLIGHT CARD WRAPPER ---
function SpotlightCard({ children, className = "" }) {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className={`relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
        >
            {/* Smooth Glowing Background Hover */}
            <div
                className="pointer-events-none absolute -inset-px z-30 transition-opacity duration-500"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99,102,241,0.06), transparent 40%)`,
                }}
            />
            {children}
        </div>
    );
}

// --- MAIN BLOGS PAGE ---
export default function BlogsPage() {
    const [activeCategory, setActiveCategory] = useState("Sabhi");
    const [searchQuery, setSearchQuery] = useState("");

    const featuredPost = blogPosts.find(post => post.featured);
    const filteredPosts = blogPosts.filter(post =>
        !post.featured &&
        (activeCategory === "Sabhi" || post.category === activeCategory) &&
        (post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="relative min-h-screen font-sans selection:bg-indigo-500/30 selection:text-indigo-900 bg-[#f8fafc] z-0 pb-24">

            <PremiumBackground />

            {/* --- HEADER & SEARCH SECTION --- */}
            <section className="pt-24 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-[1250px] mx-auto flex flex-col items-center text-center">

                    {/* Glowing Pill Badge */}
                    <div className="animate-fade-in-up" style={{ animationFillMode: 'both' }}>
                        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/80 backdrop-blur-2xl border border-white shadow-[0_4px_12px_rgba(0,0,0,0.04),inset_0_1px_0_white] mb-8 ring-1 ring-slate-900/5 group cursor-pointer hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-[0_2px_8px_rgba(99,102,241,0.4)]">
                                <BookOpen className="w-3.5 h-3.5" />
                            </span>
                            <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-slate-700">Humaare Naye Blogs</span>
                        </div>
                    </div>

                    {/* Immersive Title */}
                    <h1
                        className="text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] font-black text-slate-900 mb-6 tracking-[-0.04em] leading-[0.95] animate-fade-in-up"
                        style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
                    >
                        Naye Updates aur <br className="hidden sm:block" />
                        <span className="relative inline-block pb-2">
                            <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#4f46e5,#0ea5e9,#8b5cf6,#4f46e5)] bg-[length:200%_auto] animate-[gradient-text_6s_linear_infinite]">
                                Behtareen Insights.
                            </span>
                        </span>
                    </h1>

                    <p
                        className="text-slate-500 text-lg md:text-[21px] leading-[1.6] mb-12 max-w-2xl mx-auto font-medium tracking-tight animate-fade-in-up mix-blend-color-burn"
                        style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
                    >
                        Tech, design aur business ko scale karne ke naye tarike seekhein. Humaare experts se judien.
                    </p>

                    {/* Pro Command Palette Search */}
                    <div className="w-full max-w-[600px] mx-auto animate-fade-in-up relative z-30 mb-16" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                        <div className="relative p-[3px] rounded-[36px] bg-[linear-gradient(110deg,#cbd5e1,transparent_25%,#cbd5e1_50%,transparent_75%,#cbd5e1)] bg-[length:200%_100%] animate-[magic-border_4s_linear_infinite] shadow-[0_24px_64px_-16px_rgba(79,70,229,0.15)] hover:shadow-[0_32px_80px_-16px_rgba(79,70,229,0.25)] transition-shadow duration-500">
                            <div className="relative flex items-center p-2 bg-white/95 backdrop-blur-3xl rounded-[33px] overflow-hidden">
                                <div className="pl-5 text-indigo-500 flex items-center justify-center">
                                    <Search className="w-5 h-5 stroke-[2.5]" />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Articles dhundhein..."
                                    className="w-full bg-transparent border-none outline-none px-4 py-3 text-[16px] font-semibold text-slate-800 placeholder:text-slate-400"
                                />
                                <div className="hidden sm:flex items-center gap-1 px-4 text-slate-300 font-medium text-xs">
                                    <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 shadow-[inset_0_-1px_0_rgba(0,0,0,0.1)]">⌘</kbd>
                                    <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 shadow-[inset_0_-1px_0_rgba(0,0,0,0.1)]">K</kbd>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- ADVANCED FEATURED POST (BENTO STYLE) --- */}
            {featuredPost && searchQuery === "" && activeCategory === "Sabhi" && (
                <section className="px-4 sm:px-6 lg:px-8 mb-20 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                    <div className="max-w-[1250px] mx-auto">
                        <SpotlightCard className="group relative rounded-[2.5rem] bg-white/70 backdrop-blur-3xl text-slate-900 shadow-[0_24px_64px_-16px_rgba(15,23,42,0.1),inset_0_1px_0_white] ring-1 ring-slate-200/80 hover:shadow-[0_32px_80px_-16px_rgba(15,23,42,0.15)] overflow-hidden cursor-pointer">
                            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent z-10 pointer-events-none hidden lg:block" />

                            <div className="grid lg:grid-cols-2 gap-0 lg:min-h-[500px] items-center">
                                {/* Text Content */}
                                <div className="p-8 sm:p-12 lg:p-16 relative z-20 flex flex-col justify-center h-full">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-[12px] font-black uppercase tracking-widest ring-1 ring-inset ring-indigo-200">
                                            {featuredPost.category}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-400">
                                            <Clock className="w-4 h-4" /> {featuredPost.readTime}
                                        </span>
                                    </div>
                                    <h2 className="text-[2rem] sm:text-[3rem] font-black text-slate-900 mb-6 tracking-tight leading-[1.1] group-hover:text-indigo-600 transition-colors duration-300">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-slate-500 text-lg leading-relaxed mb-8 font-medium">
                                        {featuredPost.excerpt}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 ring-2 ring-white">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-900">{featuredPost.author}</div>
                                                <div className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" /> {featuredPost.date}
                                                </div>
                                            </div>
                                        </div>
                                        <button className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-indigo-600 transition-colors shadow-lg active:scale-95">
                                            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                                        </button>
                                    </div>
                                </div>

                                {/* Image Container */}
                                <div className="relative h-[300px] lg:h-full w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:w-[60%]">
                                    <div className="absolute inset-0 bg-slate-900/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                                    <img
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                                    />
                                    {/* Subtle Vignette */}
                                    <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.1)] z-20 pointer-events-none" />
                                </div>
                            </div>
                        </SpotlightCard>
                    </div>
                </section>
            )}

            {/* --- CATEGORY FILTERS (MAC-STYLE DOCK) --- */}
            <section className="px-4 sm:px-6 lg:px-8 mb-12 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
                <div className="max-w-[1250px] mx-auto flex justify-center">
                    <div className="flex items-center gap-2 p-2 rounded-full bg-white/50 backdrop-blur-3xl backdrop-saturate-[2] border border-white/80 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.06),inset_0_1px_0_white] ring-1 ring-slate-900/5 overflow-x-auto no-scrollbar max-w-full">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`relative px-5 py-2.5 rounded-full text-[14px] font-bold whitespace-nowrap transition-all duration-300 outline-none
                                    ${activeCategory === cat
                                        ? "text-white shadow-[0_4px_12px_rgba(79,70,229,0.3)]"
                                        : "text-slate-500 hover:text-slate-800 hover:bg-white/60"
                                    }
                                `}
                            >
                                {activeCategory === cat && (
                                    <div className="absolute inset-0 rounded-full bg-slate-900 -z-10" />
                                )}
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- BLOGS GRID --- */}
            <section className="px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
                <div className="max-w-[1250px] mx-auto">
                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                            {filteredPosts.map((post) => (
                                <SpotlightCard key={post.id} className="group flex flex-col h-full rounded-[2rem] bg-white/70 backdrop-blur-3xl text-slate-900 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.04),inset_0_1px_0_white] ring-1 ring-slate-200/80 hover:bg-white hover:-translate-y-2 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.1)] cursor-pointer">

                                    {/* Image Section */}
                                    <div className="relative h-[240px] w-full overflow-hidden rounded-t-[2rem] m-2.5 mb-0 rounded-b-[1rem] bg-slate-100 ring-1 ring-slate-200/50">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transform scale-[1.02] group-hover:scale-110 transition-transform duration-[1s] ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Floating Category Badge */}
                                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-black uppercase tracking-widest shadow-sm">
                                            {post.category}
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="flex flex-col flex-1 p-6 sm:p-8">
                                        <div className="flex items-center gap-3 mb-4 text-xs font-semibold text-slate-400">
                                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                                        </div>

                                        <h3 className="text-[22px] font-black leading-tight text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                                            {post.title}
                                        </h3>

                                        <p className="text-slate-500 text-[15px] font-medium leading-relaxed mb-8 flex-1">
                                            {post.excerpt}
                                        </p>

                                        {/* Card Footer */}
                                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                                                    <User className="w-4 h-4" />
                                                </div>
                                                <div className="text-sm font-bold text-slate-800">{post.author}</div>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors">
                                                Padhein <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white/50 backdrop-blur-xl rounded-[2rem] ring-1 ring-slate-200">
                            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">Koi result nahi mila</h3>
                            <p className="text-slate-500 font-medium">Kripya koi dusra shabd (keyword) search karein.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* --- ADVANCED CSS KEYFRAMES --- */}
            <style>{`
                /* Hide scrollbar for Chrome, Safari and Opera */
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                /* Hide scrollbar for IE, Edge and Firefox */
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                @keyframes blob-pulse {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.1); opacity: 1; }
                }
                @keyframes gradient-text {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(40px); filter: blur(12px); }
                    to { opacity: 1; transform: translateY(0); filter: blur(0); }
                }
                @keyframes magic-border {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }
            `}</style>
        </div>
    );
}