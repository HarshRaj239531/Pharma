"use client";
import React, { useState, useRef, useEffect } from "react";
import {
    ArrowRight, Sparkles, Search, Command,
    Calendar, Clock, User, ArrowUpRight, BookOpen,
    Hash
} from "lucide-react";

// --- ⚡ DUMMY BLOG DATA (ENGLISH) ---
const blogPosts = [
    {
        id: 1,
        title: "How to Scale Your SaaS Business 10x: The Complete Guide",
        excerpt: "Essential strategies, advanced pricing models, and proven customer retention techniques to build a highly successful SaaS startup in 2026.",
        category: "Business",
        readTime: "8 min read",
        date: "May 24, 2026",
        author: "Rahul Sharma",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600",
        featured: true,
    },
    {
        id: 2,
        title: "5 Breakthrough Modern UI Design Trends for 2026",
        excerpt: "From advanced glassmorphism to spatial design interfaces, explore the cutting-edge trends shaping the future of web design.",
        category: "Design",
        readTime: "5 min read",
        date: "May 20, 2026",
        author: "Priya Singh",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
        featured: false,
    },
    {
        id: 3,
        title: "Building Blazing Fast Websites with React & Tailwind",
        excerpt: "Deep dive into performance optimization, server components, and zero-lag animations using modern React techniques.",
        category: "Development",
        readTime: "12 min read",
        date: "May 18, 2026",
        author: "Amit Patel",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1600",
        featured: false,
    },
    {
        id: 4,
        title: "Marketing Automation: Save Time & Multiply Sales",
        excerpt: "Learn how to put your marketing campaigns on auto-pilot leveraging the latest AI and workflow automation tools.",
        category: "Marketing",
        readTime: "6 min read",
        date: "May 15, 2026",
        author: "Sneha Gupta",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600",
        featured: false,
    },
    {
        id: 5,
        title: "The Future Landscape of Web3 and Blockchain",
        excerpt: "How decentralized web applications, smart contracts, and tokenomics are fundamentally changing internet infrastructure.",
        category: "Technology",
        readTime: "10 min read",
        date: "May 10, 2026",
        author: "Vikram Das",
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1600",
        featured: false,
    },
    {
        id: 6,
        title: "Crafting a Seamless Customer Onboarding Experience",
        excerpt: "Discover the best UX patterns and psychological triggers to educate new users and retain them for the long haul.",
        category: "Design",
        readTime: "7 min read",
        date: "May 05, 2026",
        author: "Priya Singh",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1600",
        featured: false,
    }
];

const categories = ["All", "Business", "Design", "Development", "Marketing", "Technology"];

// --- ⚡ ADVANCED AMBIENT BACKGROUND ---
function PremiumBackground() {
    const auraRef = useRef(null);

    useEffect(() => {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (auraRef.current) {
                auraRef.current.style.setProperty("--x", `${mouseX}px`);
                auraRef.current.style.setProperty("--y", `${mouseY}px`);
            }
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50/50">
            {/* High-End Micro Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.3] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_20%,#000_60%,transparent_100%)]" />

            {/* Cinematic Glowing Orbs (Refined Colors) */}
            <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[140px] animate-[blob-pulse_12s_ease-in-out_infinite]" />
            <div className="absolute top-[20%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] animate-[blob-pulse_10s_ease-in-out_infinite_1s]" />
            <div className="absolute bottom-[-10%] right-[30%] w-[400px] h-[400px] rounded-full bg-indigo-400/5 blur-[120px] animate-[blob-pulse_14s_ease-in-out_infinite_2s]" />

            {/* Dynamic Mouse Aura Spotlight */}
            <div
                ref={auraRef}
                className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/60 rounded-full blur-[120px] will-change-transform hidden md:block pointer-events-none"
                style={{
                    transform: 'translate3d(calc(var(--x, 50vw) - 50%), calc(var(--y, 50vh) - 50%), 0)',
                    transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
            />

            {/* Matte Grain fallback */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        </div>
    );
}

// --- ⚡ MOUSE SPOTLIGHT CARD WRAPPER ---
function SpotlightCard({ children, className = "" }) {
    const divRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        divRef.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        divRef.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => divRef.current.style.setProperty("--mo", "1")}
            onMouseLeave={() => divRef.current.style.setProperty("--mo", "0")}
            className={`relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px z-30 transition-opacity duration-500 rounded-inherit"
                style={{
                    opacity: "var(--mo, 0)",
                    background: `radial-gradient(800px circle at var(--mx, 0px) var(--my, 0px), rgba(99,102,241,0.08), transparent 40%)`,
                }}
            />
            {children}
        </div>
    );
}

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const featuredPost = blogPosts.find(post => post.featured);
    const filteredPosts = blogPosts.filter(post =>
        !post.featured &&
        (activeCategory === "All" || post.category === activeCategory) &&
        (post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="relative min-h-screen font-sans selection:bg-indigo-500/30 selection:text-indigo-900 bg-[#f8fafc] z-0 pb-24">

            <PremiumBackground />

            {/* --- HEADER & SEARCH SECTION --- */}
            <section className="pt-28 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-[1250px] mx-auto flex flex-col items-center text-center">

                    {/* Glowing Pill Badge */}
                    <div className="animate-fade-in-up" style={{ animationFillMode: 'both' }}>
                        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/80 backdrop-blur-2xl border border-slate-200/50 shadow-[0_4px_24px_rgba(0,0,0,0.04),inset_0_1px_0_white] mb-8 ring-1 ring-slate-900/5 group cursor-pointer hover:shadow-[0_8px_32px_rgba(99,102,241,0.12)] transition-all duration-500">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 text-white shadow-[0_2px_8px_rgba(99,102,241,0.4)] animate-pulse">
                                <Sparkles className="w-3.5 h-3.5" />
                            </span>
                            <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-slate-700">Our Latest Insights</span>
                        </div>
                    </div>

                    {/* Immersive Title */}
                    <h1
                        className="text-[3.5rem] sm:text-[4.5rem] lg:text-[6rem] font-extrabold text-slate-900 mb-6 tracking-tight leading-[1] animate-fade-in-up"
                        style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
                    >
                        Master the Future of <br className="hidden sm:block" />
                        <span className="relative inline-block pb-2">
                            <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#4f46e5,#0ea5e9,#8b5cf6,#4f46e5)] bg-[length:200%_auto] animate-[gradient-text_6s_linear_infinite]">
                                Digital Innovation.
                            </span>
                        </span>
                    </h1>

                    <p
                        className="text-slate-500 text-lg md:text-[22px] leading-[1.6] mb-12 max-w-2xl mx-auto font-medium tracking-tight animate-fade-in-up mix-blend-multiply"
                        style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
                    >
                        Explore cutting-edge strategies to scale tech, design, and business. Connect with expert perspectives and elevate your craft.
                    </p>

                    {/* Pro Command Palette Search */}
                    <div className="w-full max-w-[640px] mx-auto animate-fade-in-up relative z-30 mb-20" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                        <div className="relative p-[3px] rounded-[36px] bg-[linear-gradient(110deg,#e2e8f0,transparent_25%,#e2e8f0_50%,transparent_75%,#e2e8f0)] bg-[length:200%_100%] animate-[magic-border_4s_linear_infinite] shadow-[0_24px_64px_-16px_rgba(79,70,229,0.15)] hover:shadow-[0_32px_80px_-16px_rgba(79,70,229,0.25)] transition-shadow duration-500">
                            <div className="relative flex items-center p-2.5 bg-white/95 backdrop-blur-2xl rounded-[33px] overflow-hidden">
                                <div className="pl-5 text-indigo-500 flex items-center justify-center">
                                    <Search className="w-5 h-5 stroke-[2.5]" />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search articles, topics, or authors..."
                                    className="w-full bg-transparent border-none outline-none px-4 py-3 text-[17px] font-semibold text-slate-800 placeholder:text-slate-400"
                                />
                                <div className="hidden sm:flex items-center gap-1.5 px-4 text-slate-400 font-medium text-xs">
                                    <kbd className="px-2 py-1 rounded-md bg-slate-100 border border-slate-200 shadow-[inset_0_-1px_0_rgba(0,0,0,0.1)] font-sans">⌘</kbd>
                                    <kbd className="px-2 py-1 rounded-md bg-slate-100 border border-slate-200 shadow-[inset_0_-1px_0_rgba(0,0,0,0.1)] font-sans">K</kbd>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- ADVANCED FEATURED POST (BENTO STYLE) --- */}
            {featuredPost && searchQuery === "" && activeCategory === "All" && (
                <section className="px-4 sm:px-6 lg:px-8 mb-24 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                    <div className="max-w-[1250px] mx-auto">
                        <SpotlightCard className="group relative rounded-[2.5rem] bg-white/60 backdrop-blur-2xl text-slate-900 shadow-[0_24px_64px_-16px_rgba(15,23,42,0.08),inset_0_1px_0_white] ring-1 ring-slate-200/80 hover:shadow-[0_32px_80px_-16px_rgba(15,23,42,0.15)] overflow-hidden cursor-pointer">
                            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent z-10 pointer-events-none hidden lg:block" />

                            <div className="grid lg:grid-cols-12 gap-0 lg:min-h-[520px] items-center">
                                {/* Text Content */}
                                <div className="p-8 sm:p-12 lg:p-16 lg:col-span-6 relative z-20 flex flex-col justify-center h-full">
                                    <div className="flex items-center gap-4 mb-8">
                                        <span className="px-4 py-1.5 rounded-full bg-indigo-600 text-white text-[12px] font-black uppercase tracking-widest shadow-md">
                                            Featured
                                        </span>
                                        <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-[12px] font-bold uppercase tracking-widest ring-1 ring-inset ring-indigo-200/60">
                                            {featuredPost.category}
                                        </span>
                                    </div>

                                    <h2 className="text-[2.25rem] sm:text-[3.25rem] font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1] group-hover:text-indigo-600 transition-colors duration-400">
                                        {featuredPost.title}
                                    </h2>

                                    <p className="text-slate-500 text-lg sm:text-[19px] leading-relaxed mb-10 font-medium">
                                        {featuredPost.excerpt}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 ring-4 ring-white shadow-sm">
                                                <User className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="text-[15px] font-bold text-slate-900 mb-0.5">{featuredPost.author}</div>
                                                <div className="text-sm font-semibold text-slate-400 flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" /> {featuredPost.date}
                                                    <span className="w-1 h-1 rounded-full bg-slate-300 mx-1" />
                                                    <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                                                </div>
                                            </div>
                                        </div>
                                        <button className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-indigo-600 transition-all duration-300 shadow-xl group-hover:shadow-indigo-500/30 active:scale-95">
                                            <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
                                        </button>
                                    </div>
                                </div>

                                {/* Image Container */}
                                <div className="relative h-[350px] lg:h-full w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:w-[55%] lg:col-span-6">
                                    <div className="absolute inset-0 bg-slate-900/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                                    <img
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                                    />
                                    {/* Cinematic Vignette */}
                                    <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.15)] z-20 pointer-events-none" />
                                </div>
                            </div>
                        </SpotlightCard>
                    </div>
                </section>
            )}

            {/* --- CATEGORY FILTERS (MAC-STYLE DOCK) --- */}
            <section className="px-4 sm:px-6 lg:px-8 mb-14 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
                <div className="max-w-[1250px] mx-auto flex justify-center">
                    <div className="flex items-center gap-2 p-2 rounded-full bg-white/70 backdrop-blur-2xl backdrop-saturate-[2] border border-white/80 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.06),inset_0_1px_0_white] ring-1 ring-slate-900/5 overflow-x-auto no-scrollbar max-w-full">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`relative px-6 py-2.5 rounded-full text-[14px] font-bold whitespace-nowrap transition-all duration-300 outline-none flex items-center gap-2
                                    ${activeCategory === cat
                                        ? "text-white shadow-[0_4px_16px_rgba(79,70,229,0.4)]"
                                        : "text-slate-500 hover:text-slate-900 hover:bg-white/80"
                                    }
                                `}
                            >
                                {activeCategory === cat && (
                                    <div className="absolute inset-0 rounded-full bg-slate-900 -z-10" />
                                )}
                                {cat === "All" ? <Hash className="w-4 h-4 opacity-70" /> : null}
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- BLOGS GRID --- */}
            <section className="px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-[1250px] mx-auto">
                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                            {filteredPosts.map((post, index) => (
                                <div
                                    key={post.id}
                                    className="animate-fade-in-up"
                                    style={{ animationDelay: `${0.6 + index * 0.1}s`, animationFillMode: 'both' }}
                                >
                                    <SpotlightCard className="group flex flex-col h-full rounded-[2rem] bg-white/60 backdrop-blur-2xl text-slate-900 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.04),inset_0_1px_0_white] ring-1 ring-slate-200/80 hover:bg-white/90 hover:-translate-y-2 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.1)] cursor-pointer">

                                        {/* Image Section */}
                                        <div className="relative h-[250px] w-full overflow-hidden rounded-t-[2rem] m-2 mb-0 rounded-b-[1.25rem] bg-slate-100 ring-1 ring-slate-200/50">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transform scale-[1.03] group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                            {/* Floating Category Badge */}
                                            <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-black uppercase tracking-widest shadow-sm">
                                                {post.category}
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="flex flex-col flex-1 p-7 sm:p-8">
                                            <div className="flex items-center gap-3 mb-4 text-[13px] font-bold text-slate-400">
                                                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
                                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
                                            </div>

                                            <h3 className="text-[22px] font-extrabold leading-snug text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                                                {post.title}
                                            </h3>

                                            <p className="text-slate-500 text-[16px] font-medium leading-relaxed mb-8 flex-1">
                                                {post.excerpt}
                                            </p>

                                            {/* Card Footer */}
                                            <div className="mt-auto flex items-center justify-between pt-5 border-t border-slate-200/60">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 ring-2 ring-white">
                                                        <User className="w-4 h-4" />
                                                    </div>
                                                    <div className="text-sm font-bold text-slate-800">{post.author}</div>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[14.5px] font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors">
                                                    Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white/60 backdrop-blur-2xl rounded-[2.5rem] ring-1 ring-slate-200 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="w-10 h-10 text-slate-400" />
                            </div>
                            <h3 className="text-3xl font-extrabold text-slate-900 mb-3">No results found</h3>
                            <p className="text-slate-500 text-lg font-medium">Please try searching with a different keyword or category.</p>
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
                    from { opacity: 0; transform: translateY(40px) scale(0.98); filter: blur(12px); }
                    to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
                }
                @keyframes magic-border {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }
            `}</style>
        </div>
    );
}