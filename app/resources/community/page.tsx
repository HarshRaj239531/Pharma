"use client";
import React from "react";
import {
    Users, MessageSquare, Heart, Award,
    Share2, Zap, Globe, MessageCircle, Info,
    Plus, Sparkles, Terminal
} from "lucide-react";

// --- ⚡ AMBIENT BACKGROUND ---    
function PremiumBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#fafcff]">
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.15] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_30%,transparent_100%)]" />
            <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-blue-100/30 blur-[150px]" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-indigo-100/30 blur-[130px]" />
        </div>
    );
}

export default function CommunityPage() {
    return (
        <div className="relative min-h-screen font-sans bg-[#fafcff] selection:bg-indigo-500/30 selection:text-indigo-900 pb-24">
            <PremiumBackground />

            {/* --- HERO SECTION --- */}
            <section className="pt-32 pb-20 px-4 relative z-10">
                <div className="max-w-[1200px] mx-auto text-center">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8 ring-1 ring-slate-900/5">
                        <Users className="w-4 h-4 text-indigo-500" />
                        <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-600">Join the Collective</span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-[5rem] font-black text-slate-900 mb-8 tracking-tight leading-[1]">
                        Built for <span className="text-indigo-600">Builders.</span>
                    </h1>

                    <p className="text-slate-500 text-lg md:text-[21px] leading-[1.6] max-w-2xl mx-auto font-medium mb-12">
                        Connect with thousands of developers, designers, and entrepreneurs. Share your work, get feedback, and grow together.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2">
                            <Plus className="w-5 h-5" /> Join Community
                        </button>
                        <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-700 font-bold border border-slate-200 hover:bg-slate-50 transition-all">
                            Browse Discussions
                        </button>
                    </div>
                </div>
            </section>

            {/* --- FEED SECTION (PLACEHOLDER) --- */}
            <section className="px-4 relative z-10">
                <div className="max-w-[1200px] mx-auto grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-sm font-sans">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Community Stats</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500 font-medium">Total Members</span>
                                    <span className="text-lg font-bold text-slate-900">12.4k+</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500 font-medium">Monthly Projects</span>
                                    <span className="text-lg font-bold text-slate-900">450+</span>
                                </div>
                                <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                                    <span className="text-sm text-slate-500 font-medium">Active Now</span>
                                    <span className="text-lg font-bold text-indigo-600 flex items-center gap-2 animate-pulse">
                                        <div className="w-2 h-2 rounded-full bg-indigo-600" /> 154
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                            <h3 className="text-lg font-bold mb-4">Follow us</h3>
                            <div className="flex gap-3">
                                <button className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                                    <MessageCircle className="w-5 h-5" />
                                </button>
                                <button className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                                    <Terminal className="w-5 h-5" />
                                </button>
                                <button className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                                    <Globe className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Posts Placeholder */}
                    <div className="lg:col-span-2 space-y-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-200/50 shadow-sm hover:bg-white transition-all cursor-pointer">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-slate-200 to-slate-300 shadow-sm" />
                                    <div>
                                        <div className="font-bold text-slate-900">Alex Rivera</div>
                                        <div className="text-xs font-semibold text-slate-400">2 hours ago in #Design</div>
                                    </div>
                                    <div className="ml-auto px-3 py-1 bg-white border border-slate-100 rounded-full text-[11px] font-black text-indigo-600 uppercase tracking-widest">
                                        Project Share
                                    </div>
                                </div>
                                <h4 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight leading-tight hover:text-indigo-600 transition-colors">
                                    Just finished the new workflow orchestration dashboard. Any feedback on the glassmorphism effects?
                                </h4>
                                <div className="flex items-center gap-6 mt-10 border-t border-slate-100 pt-6">
                                    <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600">
                                        <Heart className="w-4 h-4" /> 24
                                    </button>
                                    <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600">
                                        <MessageSquare className="w-4 h-4" /> 8
                                    </button>
                                    <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 ml-auto">
                                        <Share2 className="w-4 h-4" /> Share
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
