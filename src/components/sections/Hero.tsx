"use client";
import React from "react";

export default function Hero() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-white">
            {/* ── Background gradient mesh ───────────────────────────── */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50" />
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-100/60 blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-200/40 blur-[100px]" />
                {/* Grid pattern */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2563eb" strokeWidth="1" />
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
                    🎉 AI-powered form builder is now live
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
                    {" "}your business
                </h1>

                {/* Subtitle */}
                <p className="text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed animate-fade-in-up delay-100">
                    BuildFormula turns operations into clear signals — manage inventory,
                    billing, CRM, and analytics all in one powerful platform.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-16 animate-fade-in-up delay-200">
                    <a
                        href="/signup"
                        id="hero-get-started"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Start for free
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </a>
                    <a
                        href="/demo"
                        id="hero-book-demo"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-gray-700 bg-white border border-gray-200 shadow-sm hover:border-blue-300 hover:text-blue-600 hover:-translate-y-0.5 transition-all duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Watch demo
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
                    {/* Browser chrome */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                        <div className="mx-auto flex items-center gap-2 px-4 py-1 rounded-md bg-white border border-gray-200 text-xs text-gray-400 w-64">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
                            app.buildformula.com
                        </div>
                    </div>

                    {/* App content */}
                    <div className="flex h-[420px] md:h-[500px]">
                        {/* Sidebar */}
                        <div className="w-52 shrink-0 border-r border-gray-100 bg-gray-50 hidden md:block">
                            <div className="p-4">
                                <div className="flex items-center gap-2.5 mb-6">
                                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 2L2 7l10 5 10-5-10-5z" /></svg>
                                    </div>
                                    <span className="font-bold text-sm text-gray-800">BuildFormula</span>
                                </div>
                                {[
                                    { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Dashboard", active: true },
                                    { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", label: "Inventory", active: false },
                                    { icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z", label: "Billing", active: false },
                                    { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", label: "Customers", active: false },
                                    { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", label: "Analytics", active: false },
                                ].map(item => (
                                    <div key={item.label} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg mb-1 text-xs font-medium cursor-pointer transition-all ${item.active ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}>
                                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Main panel */}
                        <div className="flex-1 p-5 overflow-hidden bg-white">
                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">Dashboard</h3>
                                    <p className="text-xs text-gray-400 mt-0.5">April 2026 overview</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="px-3 py-1.5 text-xs font-medium text-gray-500 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">Export</button>
                                    <button className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                        New Order
                                    </button>
                                </div>
                            </div>

                            {/* KPI Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                                {[
                                    { label: "Revenue", value: "₹4.2L", change: "+12%", up: true },
                                    { label: "Orders", value: "284", change: "+8%", up: true },
                                    { label: "Customers", value: "1,042", change: "+5%", up: true },
                                    { label: "Pending", value: "₹18K", change: "-3%", up: false },
                                ].map(kpi => (
                                    <div key={kpi.label} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
                                        <p className="text-xs text-gray-400 mb-1">{kpi.label}</p>
                                        <p className="font-bold text-gray-900 text-base">{kpi.value}</p>
                                        <span className={`text-xs font-medium ${kpi.up ? "text-green-600" : "text-red-500"}`}>{kpi.change}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Chart area */}
                            <div className="border border-gray-100 rounded-xl p-4 bg-gray-50 h-[calc(100%-140px)] min-h-[140px]">
                                <div className="flex items-end gap-2 h-full">
                                    {[60, 80, 55, 90, 75, 100, 85, 70, 95, 88, 72, 98].map((h, i) => (
                                        <div key={i} className="flex-1 flex flex-col justify-end">
                                            <div
                                                className="rounded-sm transition-all duration-300"
                                                style={{
                                                    height: `${h}%`,
                                                    background: i === 11 ? "linear-gradient(180deg, #2563eb, #3b82f6)" : i % 3 === 0 ? "#bfdbfe" : "#dbeafe",
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom glow */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-blue-400/20 blur-2xl rounded-full pointer-events-none" />
            </div>

            {/* Wave bottom */}
            <div className="relative mt-16">
                <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none" style={{ height: 60 }}>
                    <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f8fafc" />
                </svg>
            </div>
        </section>
    );
}