"use client";
import React from "react";

const steps = [
    {
        step: "01",
        title: "Sign up in seconds",
        desc: "Create your account for free — no credit card required. Your workspace is ready instantly.",
        icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    },
    {
        step: "02",
        title: "Import your data",
        desc: "Bring in your products, customers, and existing records in minutes with our smart import tools.",
        icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>,
    },
    {
        step: "03",
        title: "Manage & automate",
        desc: "Start billing, managing inventory, and analyzing growth — all in one intuitive dashboard.",
        icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    },
    {
        step: "04",
        title: "Scale with confidence",
        desc: "As your business grows, unlock advanced features like multi-location, teams, and enterprise integrations.",
        icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    },
];

export default function HowItWorks() {
    return (
        <section className="py-28 bg-gradient-to-b from-slate-50 to-white" id="how-it-works">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-xs font-semibold text-blue-700 mb-5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                        How it works
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-5 tracking-tight">
                        Up and running in{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                            minutes
                        </span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-xl mx-auto">
                        No long onboarding, no complex setup. Get started and see value immediately.
                    </p>
                </div>

                {/* Steps */}
                <div className="relative">
                    {/* Connector line */}
                    <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 pointer-events-none" />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, i) => (
                            <div key={i} className="group flex flex-col items-center text-center">
                                {/* Step icon */}
                                <div className="relative mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-blue-200 flex items-center justify-center text-blue-600 shadow-lg shadow-blue-100 group-hover:border-blue-400 group-hover:shadow-blue-200 group-hover:-translate-y-1 transition-all duration-300">
                                        {step.icon}
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                                        {i + 1}
                                    </div>
                                </div>
                                <div className="text-xs font-bold text-blue-400 tracking-widest mb-2">{step.step}</div>
                                <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
