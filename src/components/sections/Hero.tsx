"use client";
import React from "react";

export default function Hero() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-white to-blue-50">

            {/* ── Background gradient mesh ───────────────────────────── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">

                {/* Base gradient (soft bluish + white blend) */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-blue-200" />

                {/* Top glow */}
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-300/40 blur-[140px] rounded-full" />

                {/* Left soft blob */}
                <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-blue-200/40 blur-[120px] rounded-full" />

                {/* Right purple-ish blue tint (premium look) */}
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-200/30 blur-[120px] rounded-full" />

                {/* Center subtle highlight */}
                <div className="absolute top-1/2 left-1/2 w-[600px] h-[400px] -translate-x-1/2 -translate-y-1/2 bg-blue-100/40 blur-[100px] rounded-full" />

                {/* Floating bubbles */}
                <div className="absolute inset-0 overflow-hidden">

                    {/* Bubble 1 */}
                    <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/40 rounded-full blur-xl animate-floatSlow" />

                    {/* Bubble 2 */}
                    <div className="absolute top-1/3 right-20 w-24 h-24 bg-indigo-400/40 rounded-full blur-xl animate-float" />

                    {/* Bubble 3 */}
                    <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-300/30 rounded-full blur-3xl animate-floatSlow" />

                    {/* Bubble 4 */}
                    <div className="absolute bottom-10 right-1/3 w-28 h-28 bg-blue-300/20 rounded-full blur-lg animate-float" />

                    {/* Gradient bubble */}
                    <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-300/50 to-indigo-300/40 rounded-full blur-xl animate-floatSlow mix-blend-multiply" />

                    {/* Bubble 5 (center soft) */}
                    <div className="absolute top-1/2 left-1/2 w-52 h-52 -translate-x-1/2 -translate-y-1/2 bg-blue-100/30 rounded-full blur-3xl animate-floatSlow" />

                </div>

                {/* Grid overlay (very subtle) */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#3b82f6" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* ── Main content ───────────────────────────────────────── */}
            <div className="relative z-10 flex flex-col items-center text-center pt-28 pb-16 px-6">

                {/* Badge */}
                <a href="/updates" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-sm font-medium text-blue-700 mb-8 hover:bg-blue-100 transition-colors duration-200 animate-fade-in">
                    <span className="flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
                    </span>
                    Smart Pharmacy Management Made Simple,
                    🚀 Trusted by 100+ Pharmacy Owners
                    <span className="font-semibold text-blue-600 flex items-center gap-1">
                        Learn more
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </span>
                </a>

                {/* Heading */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.06] tracking-tight mb-6 max-w-4xl animate-fade-in-up">
                    The fastest tool to{" "}
                    <span className="relative">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                            manage
                        </span>
                    </span>
                    {" "}your pharmacy
                </h1>

                {/* Subtitle */}
                <p className="text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed animate-fade-in-up delay-100">
                    BuildFormula turns operations into clear signals — Manage medicines, billing, expiry alerts, GST, and inventory — all in one powerful pharmacy system.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-16 animate-fade-in-up delay-200">
                    <a
                        href="/signup"
                        id="hero-get-started"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Start Free Trial
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </a>
                    <a
                        href="/demo"
                        id="hero-book-demo"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-gray-700 bg-white border border-gray-200 shadow-sm hover:border-blue-300 hover:text-blue-600 hover:-translate-y-0.5 transition-all duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Watch Pharmacy Demo
                    </a>
                </div>

                {/* Social proof */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 text-sm text-gray-500 animate-fade-in-up delay-300">
                    <div className="flex -space-x-2">
                        {["#3b82f6", "#2563eb", "#1d4ed8", "#60a5fa", "#93c5fd"].map((color, i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm"
                                style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>
                                {["R", "P", "A", "S", "M"][i]}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(i => (
                            <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        ))}
                        <span className="ml-1 font-semibold text-gray-700">4.9/5</span>
                        <span className="ml-1">from 2,400+ reviews</span>
                    </div>
                    <span className="hidden sm:block text-gray-300">·</span>
                    <span>No credit card required</span>
                </div>
            </div>

            {/* ── Dashboard Mockup ──────────────────────────────────── */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 pb-0 animate-fade-in-up delay-500">
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/15 border border-gray-200/80 bg-white">

                    <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                        <div className="mx-auto flex items-center gap-2 px-4 py-1 rounded-md bg-white border border-gray-200 text-xs text-gray-400 w-64">
                            app.buildformula.com
                        </div>
                    </div>

                    <img src="/home.png" alt="Pharmacy Dashboard" className="w-full h-full object-cover" />
                </div>

                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-blue-400/20 blur-lg rounded-full pointer-events-none" />
            </div>

            {/* Wave */}
            <div className="relative mt-16">
                <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none" style={{ height: 60 }}>
                    <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f8fafc" />
                </svg>
            </div>
        </section>
    );
}