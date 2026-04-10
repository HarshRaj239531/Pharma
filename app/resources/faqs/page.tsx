"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import {
    ChevronDown,
    Search,
    LifeBuoy,
    Terminal,
    CreditCard,
    Globe,
    Zap,
    ShieldCheck,
    Command,
    BookOpen,
    Sparkles,
    ThumbsUp,
    ThumbsDown,
    ArrowUpRight
} from "lucide-react";

// --- Advanced FAQ Data ---
const faqData = [
    {
        id: 1,
        category: "General",
        icon: <Globe className="w-5 h-5" />,
        question: "How does the <10ms global latency work?",
        answer: "We utilize a globally distributed edge network combined with intelligent routing. Your data is cached and processed at the node closest to your user, ensuring lightning-fast response times regardless of their physical location."
    },
    {
        id: 2,
        category: "General",
        icon: <Zap className="w-5 h-5" />,
        question: "Can I manage multiple store locations?",
        answer: "Absolutely. Stratum is built for scale. Our Omnichannel Sync engine allows you to manage inventory, pricing, and analytics across thousands of physical and digital storefronts from a single unified dashboard."
    },
    {
        id: 3,
        category: "Technical",
        icon: <Terminal className="w-5 h-5" />,
        question: "What hardware is compatible with your POS?",
        answer: "Our software is highly adaptable and supports 99% of industry-standard POS hardware, including barcode scanners, receipt printers, and cash drawers. We also offer native iOS and Android companion apps."
    },
    {
        id: 4,
        category: "Technical",
        icon: <ShieldCheck className="w-5 h-5" />,
        question: "Is my business data secure and compliant?",
        answer: "Security is our top priority. All data is encrypted at rest and in transit using AES-256. We are fully compliant with PCI-DSS, GDPR, and localized tax regulations like GST."
    },
    {
        id: 5,
        category: "Billing",
        icon: <CreditCard className="w-5 h-5" />,
        question: "How does the pricing and billing cycle work?",
        answer: "We offer transparent, usage-based pricing with no hidden fees. You are billed monthly based on transaction volume and active storefronts. Annual plans are available with a 20% discount."
    },
    {
        id: 6,
        category: "Billing",
        icon: <BookOpen className="w-5 h-5" />,
        question: "Can I switch plans or cancel anytime?",
        answer: "Yes, you have full control over your subscription. You can upgrade, downgrade, or cancel your plan at any time directly from your billing dashboard. Changes are prorated automatically."
    }
];

const categories = ["All", "General", "Technical", "Billing"];
const popularSearches = ["Latency", "API Keys", "Billing", "Hardware Integration"];

// --- Types ---
interface FaqItem {
    id: number;
    category: string;
    icon: React.ReactNode;
    question: string;
    answer: string;
}

interface FaqCardProps {
    item: FaqItem;
    isOpen: boolean;
    onClick: () => void;
}

// --- Advanced Floating FAQ Card ---
function FaqCard({ item, isOpen, onClick }: FaqCardProps) {
    const [feedback, setFeedback] = useState<string | null>(null); // 'up', 'down', or null

    return (
        <div
            className={`
        relative group transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] overflow-hidden
        rounded-[24px] bg-white border
        ${isOpen
                    ? 'border-indigo-200/80 shadow-[0_8px_30px_-12px_rgba(79,70,229,0.15)] ring-4 ring-indigo-50/50 scale-[1.005] z-10 my-1'
                    : 'border-slate-200/60 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.04)] hover:border-indigo-200/60 hover:shadow-[0_12px_30px_-12px_rgba(79,70,229,0.12)] hover:-translate-y-0.5'
                }
      `}
        >
            <button
                className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left focus:outline-none relative z-20"
                onClick={onClick}
            >
                <div className="flex items-center gap-5 pr-4">
                    <div className={`hidden sm:flex items-center justify-center w-12 h-12 rounded-[16px] transition-all duration-500 shrink-0
            ${isOpen
                            ? 'bg-gradient-to-br from-indigo-50 to-blue-50 text-indigo-600 shadow-inner border border-indigo-100/50'
                            : 'bg-slate-50 text-slate-400 border border-slate-100 group-hover:bg-indigo-50/50 group-hover:text-indigo-500'
                        }`}
                    >
                        {item.icon}
                    </div>
                    <span className={`text-[16px] sm:text-[17px] font-bold tracking-tight transition-colors duration-300 
            ${isOpen ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'}
          `}>
                        {item.question}
                    </span>
                </div>

                <div className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-500 shrink-0 
          ${isOpen
                        ? 'bg-indigo-600 text-white rotate-180 shadow-md shadow-indigo-600/20'
                        : 'bg-slate-50 border border-slate-200 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-200'
                    }`}
                >
                    <ChevronDown className="w-4 h-4" />
                </div>
            </button>

            <div
                className={`grid transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <div className="pb-6 px-6 sm:px-8 sm:pl-[88px] relative flex flex-col">
                        <p className="text-[15px] text-slate-500 font-medium leading-relaxed pr-4 sm:pr-8">
                            {item.answer}
                        </p>

                        {/* Interactive Feedback Section */}
                        <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[13px] font-semibold text-slate-400">Was this article helpful?</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setFeedback(feedback === 'up' ? null : 'up'); }}
                                    className={`p-2 rounded-xl transition-all duration-300 flex items-center gap-2 text-[13px] font-bold
                    ${feedback === 'up' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 border border-transparent'}
                  `}
                                >
                                    <ThumbsUp className="w-4 h-4" /> <span className="hidden sm:inline">Yes</span>
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setFeedback(feedback === 'down' ? null : 'down'); }}
                                    className={`p-2 rounded-xl transition-all duration-300 flex items-center gap-2 text-[13px] font-bold
                    ${feedback === 'down' ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 border border-transparent'}
                  `}
                                >
                                    <ThumbsDown className="w-4 h-4" /> <span className="hidden sm:inline">No</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Main Help Center Wrapper ---
export default function App() {
    const [openIndex, setOpenIndex] = useState(1);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const searchInputRef = useRef<HTMLInputElement>(null);

    const filteredFaqs = useMemo(() => {
        return faqData.filter((faq) => {
            const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
            const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { All: faqData.length };
        categories.forEach(cat => {
            if (cat !== "All") {
                counts[cat] = faqData.filter(f => f.category === cat).length;
            }
        });
        return counts;
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="min-h-screen bg-[#fafbfc] selection:bg-indigo-100 selection:text-indigo-900 font-sans relative overflow-x-hidden antialiased">

            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-24 px-6 overflow-hidden">
                {/* Advanced Hero Background */}
                <div className="absolute inset-0 z-0 pointer-events-none flex justify-center overflow-hidden bg-white">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_100%_at_50%_0%,#000_60%,transparent_100%)]"></div>

                    {/* Complex Mesh Gradient */}
                    <div className="absolute top-[-40%] left-[10%] w-[60%] h-[80%] rounded-[100%] bg-[conic-gradient(from_90deg_at_50%_50%,#e0e7ff_0%,#f3e8ff_50%,#e0e7ff_100%)] blur-[100px] opacity-60 animate-[spin_20s_linear_infinite]" />
                    <div className="absolute top-[10%] right-[10%] w-[40%] h-[60%] rounded-full bg-indigo-400/10 blur-[120px] mix-blend-multiply" />

                    {/* Bottom Fade out */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fafbfc] to-transparent z-10" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50/50 border border-indigo-100/50 backdrop-blur-md text-indigo-700 text-[13px] font-bold tracking-wide shadow-sm mb-8 ring-1 ring-white/50">
                        <Sparkles className="w-4 h-4 text-indigo-500" />
                        Support Center
                    </div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-[-0.04em] mb-8 leading-[1.05]">
                        How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-500">help you?</span>
                    </h1>

                    {/* Advanced Search Command Bar */}
                    <div className="relative group w-full max-w-2xl mx-auto">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-[28px] blur-xl opacity-20 group-focus-within:opacity-40 transition-opacity duration-700" />
                        <div className="relative flex items-center bg-white/90 backdrop-blur-2xl border border-slate-200/80 rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,1)] transition-all duration-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 h-16 sm:h-20">
                            <Search className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-500 ml-6 sm:ml-8 shrink-0" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Ask a question or search for topics..."
                                className="w-full h-full px-4 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none text-[16px] sm:text-[18px] font-medium"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setOpenIndex(-1);
                                }}
                            />
                            <div className="mr-6 hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-[12px] font-bold text-slate-500 border border-slate-200 shadow-sm">
                                <Command className="w-3.5 h-3.5" /><span>K</span>
                            </div>
                        </div>
                    </div>

                    {/* Popular Searches */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <span className="text-[13px] font-medium text-slate-500 mr-2">Popular:</span>
                        {popularSearches.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSearchQuery(tag)}
                                className="px-3 py-1.5 rounded-full bg-white border border-slate-200/80 text-slate-600 text-[13px] font-medium hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors shadow-sm"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CONTENT SECTION --- */}
            <section className="max-w-[1300px] mx-auto px-6 pb-24 relative z-10 -mt-6">
                {/* Asymmetrical Two-Column Layout */}
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

                    {/* Left Column: Vertical Navigation & Support Card */}
                    <div className="w-full lg:w-[300px] shrink-0 lg:sticky lg:top-8 flex flex-col gap-6">

                        {/* Vertical Category Nav */}
                        <div className="flex flex-col gap-1.5">
                            <h3 className="px-4 text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-2">Categories</h3>
                            {categories.map((category) => {
                                const isActive = activeCategory === category;
                                return (
                                    <button
                                        key={category}
                                        onClick={() => {
                                            setActiveCategory(category);
                                            setOpenIndex(-1);
                                        }}
                                        className={`
                      w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-[15px] font-semibold transition-all duration-300 border
                      ${isActive
                                                ? 'bg-white border-indigo-100 shadow-[0_4px_20px_-4px_rgba(79,70,229,0.1)] text-indigo-700'
                                                : 'bg-transparent border-transparent text-slate-600 hover:bg-white hover:border-slate-200/60 hover:shadow-sm'
                                            }
                    `}
                                    >
                                        <span className="flex items-center gap-3 relative">
                                            {/* Animated active indicator */}
                                            <span className={`absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-0 bg-indigo-600 rounded-r-full transition-all duration-300 ${isActive ? 'h-6' : 'h-0'}`} />
                                            {category}
                                        </span>
                                        <span className={`
                      px-2.5 py-1 rounded-lg text-[12px] font-bold transition-colors
                      ${isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}
                    `}>
                                            {categoryCounts[category]}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Premium Support Bento Card */}
                        <div className="mt-4 p-[2px] rounded-[28px] bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 relative overflow-hidden group shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-500">
                            <div className="absolute inset-0 bg-slate-950 transition-opacity duration-500" />
                            <div className="relative bg-slate-950/90 backdrop-blur-xl rounded-[26px] p-7 h-full flex flex-col gap-5 overflow-hidden">
                                {/* Decorative Mesh in card */}
                                <div className="absolute -top-16 -right-16 w-40 h-40 bg-indigo-500/30 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />

                                <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/20 shadow-inner">
                                    <LifeBuoy className="w-6 h-6 text-indigo-300" />
                                </div>

                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-2 text-white">Need human help?</h3>
                                    <p className="text-slate-400 text-[14px] font-medium leading-relaxed">
                                        Our technical support team is available 24/7 to solve your most complex issues.
                                    </p>
                                </div>

                                <button className="relative z-10 inline-flex items-center justify-center gap-2 w-full py-3.5 mt-2 rounded-[16px] bg-white text-slate-900 font-bold text-[14px] hover:bg-indigo-50 transition-colors shadow-sm group/btn overflow-hidden">
                                    <span className="relative flex items-center gap-2 z-10">
                                        Contact Support <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover/btn:text-indigo-600 transition-colors" />
                                    </span>
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Dynamic FAQ Cards */}
                    <div className="w-full lg:flex-1 flex flex-col gap-5 pt-2">

                        <div className="mb-4 px-2 flex items-center justify-between border-b border-slate-200/60 pb-4">
                            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                {searchQuery ? (
                                    <>Search results for <span className="text-indigo-600">"{searchQuery}"</span></>
                                ) : (
                                    `${activeCategory} Articles`
                                )}
                            </h2>
                            <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[13px] font-bold text-slate-500 shadow-sm">
                                {filteredFaqs.length} results
                            </span>
                        </div>

                        <div className="flex flex-col gap-4">
                            {filteredFaqs.length > 0 ? (
                                filteredFaqs.map((item) => (
                                    <FaqCard
                                        key={item.id}
                                        item={item}
                                        isOpen={openIndex === item.id}
                                        onClick={() => setOpenIndex(openIndex === item.id ? -1 : item.id)}
                                    />
                                ))
                            ) : (
                                // Premium Empty State
                                <div className="py-24 px-8 text-center flex flex-col items-center bg-white/40 backdrop-blur-md border border-slate-200/80 rounded-[32px] border-dashed shadow-sm">
                                    <div className="w-20 h-20 rounded-[20px] bg-slate-100 flex items-center justify-center mb-6 text-slate-400 shadow-inner rotate-3">
                                        <Search className="w-10 h-10 -rotate-3" />
                                    </div>
                                    <h3 className="text-xl font-extrabold text-slate-900 mb-3">No articles found</h3>
                                    <p className="text-slate-500 text-[16px] font-medium max-w-md mx-auto leading-relaxed">
                                        We couldn't find anything matching "<span className="text-slate-900 font-semibold">{searchQuery}</span>". Try using different keywords or check out our popular topics.
                                    </p>
                                    <button
                                        onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                                        className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/20"
                                    >
                                        Clear Search
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}