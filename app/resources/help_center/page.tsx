"use client";
import React, { useState, useRef, useEffect } from "react";
import { 
    Search, Book, Zap, MessageCircle, HelpCircle, 
    ChevronRight, ArrowRight, LifeBuoy, FileText, 
    Shield, Settings, Users
} from "lucide-react";

// --- ⚡ DUMMY KNOWLEDGE BASE DATA ---
const categories = [
    {
        title: "Getting Started",
        icon: <Zap className="w-6 h-6 text-amber-500" />,
        articles: ["Quick Start Guide", "Account Setup", "Installation", "Basic Features"],
        desc: "Everything you need to know to get up and running."
    },
    {
        title: "Platform Features",
        icon: <Book className="w-6 h-6 text-blue-500" />,
        articles: ["Workflow Automation", "Advanced Analytics", "Custom Dashboards", "Team Management"],
        desc: "In-depth guides on every tool and feature."
    },
    {
        title: "Security & Privacy",
        icon: <Shield className="w-6 h-6 text-emerald-500" />,
        articles: ["2FA Setup", "Data Encryption", "Privacy Policy", "Compliance"],
        desc: "Learn how we protect your information."
    },
    {
        title: "Account & Billing",
        icon: <Settings className="w-6 h-6 text-slate-500" />,
        articles: ["Subscription Plans", "Payment Methods", "Invoices", "Cancellations"],
        desc: "Manage your account and billing preferences."
    }
];

// --- ⚡ AMBIENT BACKGROUND ---
function PremiumBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50">
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.4] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_20%,#000_60%,transparent_100%)]" />
            <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] rounded-full bg-blue-400/10 blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-indigo-400/10 blur-[120px]" />
        </div>
    );
}

export default function HelpCenterPage() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="relative min-h-screen font-sans bg-slate-50 selection:bg-blue-500/30 selection:text-blue-900 pb-24">
            <PremiumBackground />

            {/* --- HERO SECTION --- */}
            <section className="pt-32 pb-16 px-4 relative z-10">
                <div className="max-w-[1000px] mx-auto text-center">
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-blue-50 shadow-sm mb-8 ring-1 ring-slate-900/5">
                        <LifeBuoy className="w-4 h-4 text-blue-500" />
                        <span className="text-[12px] font-bold uppercase tracking-widest text-slate-600">Support Center</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tight">
                        How can we <span className="text-blue-600">help you?</span>
                    </h1>

                    <div className="max-w-xl mx-auto relative group">
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center p-2 bg-white rounded-2xl shadow-xl border border-blue-50">
                            <Search className="w-5 h-5 ml-4 text-slate-400" />
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for guides, features, and more..."
                                className="w-full bg-transparent border-none outline-none px-4 py-3 text-slate-700 font-medium placeholder:text-slate-400"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MAIN GRID --- */}
            <section className="px-4 relative z-10">
                <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-6 lg:gap-8">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="group bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-sm hover:shadow-xl hover:bg-white hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {cat.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{cat.title}</h3>
                            <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">
                                {cat.desc}
                            </p>
                            <ul className="space-y-3">
                                {cat.articles.map((art, i) => (
                                    <li key={i}>
                                        <a href="#" className="flex items-center justify-between text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">
                                            {art}
                                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- CONTACT CTA --- */}
            <section className="pt-24 px-4 relative z-10">
                <div className="max-w-[1100px] mx-auto">
                    <div className="bg-slate-900 rounded-[3rem] p-10 sm:p-16 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px]" />
                        <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Still need help?</h2>
                        <p className="text-slate-400 font-medium mb-10 max-w-xl mx-auto relative z-10">
                            Our support experts are available 24/7 to help you with any questions or technical issues you might have.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                                <MessageCircle className="w-5 h-5" /> Chat with Support
                            </button>
                            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                                Email Us <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
