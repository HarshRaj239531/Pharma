"use client";
import React from "react";

const features = [
    {
        icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
        badge: "Popular",
        title: "Smart Analytics",
        desc: "Get instant insights on sales, inventory turns, and customer behavior with our AI-powered analytics engine.",
    },
    {
        icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
        badge: null,
        title: "Inventory Control",
        desc: "Track stock in real-time, get low-stock alerts, and auto-generate purchase orders before you run out.",
    },
    {
        icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
        badge: "New",
        title: "Smart Billing",
        desc: "Generate GST-compliant invoices in seconds. Supports multiple payment modes and automated reminders.",
    },
    {
        icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
        badge: null,
        title: "Customer Management",
        desc: "Build loyalty with a full CRM — track customer history, preferences, and outstanding balances effortlessly.",
    },
    {
        icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
        badge: null,
        title: "Smart Notifications",
        desc: "Never miss a thing — receive alerts for low stock, overdue payments, and daily summaries on WhatsApp.",
    },
    {
        icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
        badge: null,
        title: "Bank-Level Security",
        desc: "Your data is encrypted at rest and in transit. Role-based access control ensures only the right people see the right data.",
    },
];

export default function Features() {
    return (
        <section className="py-28 bg-white" id="features">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-xs font-semibold text-blue-700 mb-5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        Everything you need
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-5 tracking-tight">
                        Powerful features,{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                            zero complexity
                        </span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
                        From day-one operations to enterprise scale — BuildFormula grows with your business.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-200 transition-all duration-300"
                        >
                            {/* Hover glow */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/0 to-blue-100/0 group-hover:from-blue-50/80 group-hover:to-blue-50/30 transition-all duration-300 pointer-events-none" />

                            <div className="relative z-10">
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-100 transition-colors duration-200">
                                    {feature.icon}
                                </div>

                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-gray-900 font-bold text-lg">{feature.title}</h3>
                                    {feature.badge && (
                                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-blue-100 text-blue-700">
                                            {feature.badge}
                                        </span>
                                    )}
                                </div>

                                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>

                                <a href="#" className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700 group/link">
                                    Learn more
                                    <svg className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}