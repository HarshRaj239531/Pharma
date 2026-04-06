"use client";
import React from "react";

const logos = [
    { name: "Tata", text: "TATA" },
    { name: "Reliance", text: "Reliance" },
    { name: "Infosys", text: "infosys" },
    { name: "HDFC", text: "HDFC" },
    { name: "Flipkart", text: "flipkart" },
    { name: "Zomato", text: "zomato" },
    { name: "Zepto", text: "zepto" },
    { name: "Meesho", text: "meesho" },
];

export default function Stats() {
    return (
        <section className="relative py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">

            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-200/30 blur-[120px] rounded-full pointer-events-none" />

            {/* Title */}
            <p className="text-center text-xs font-semibold text-gray-400 mb-10 tracking-[0.2em] uppercase">
                Trusted by teams at industry leaders
            </p>

            {/* Logo Marquee */}
            <div className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

                <div className="flex gap-20 items-center animate-marquee w-max hover:[animation-play-state:paused]">
                    {[...logos, ...logos].map((logo, i) => (
                        <div
                            key={i}
                            className="text-xl md:text-2xl font-black text-gray-300 hover:text-blue-500 transition-all duration-300 cursor-default select-none flex-shrink-0 tracking-tight hover:scale-110"
                        >
                            {logo.text}
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="max-w-6xl mx-auto px-6 mt-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {[
                        {
                            value: "10,000+",
                            label: "Businesses trust us",
                            sub: "Across India & growing fast"
                        },
                        {
                            value: "₹50Cr+",
                            label: "Revenue managed monthly",
                            sub: "On our platform"
                        },
                        {
                            value: "99.9%",
                            label: "Uptime guaranteed",
                            sub: "Enterprise-grade reliability"
                        },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="group relative text-center px-8 py-10 rounded-2xl bg-white/70 backdrop-blur-lg border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                        >

                            {/* Glow on hover */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-xl" />

                            {/* Value */}
                            <div className="relative text-4xl md:text-5xl font-black text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                                {stat.value}
                            </div>

                            {/* Label */}
                            <p className="relative font-semibold text-gray-800 text-base mb-1">
                                {stat.label}
                            </p>

                            {/* Subtext */}
                            <p className="relative text-sm text-gray-400">
                                {stat.sub}
                            </p>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}