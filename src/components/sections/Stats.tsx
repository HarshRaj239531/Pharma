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
        <section className="py-20 bg-slate-50">
            {/* Logo Marquee */}
            <p className="text-center text-xs font-semibold text-gray-400 mb-8 tracking-[0.15em] uppercase">
                Trusted by teams at industry leaders
            </p>

            <div className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-slate-50 to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-slate-50 to-transparent" />
                <div className="flex gap-16 items-center animate-marquee w-max">
                    {[...logos, ...logos].map((logo, i) => (
                        <div key={i}
                            className="text-xl font-black text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-default select-none flex-shrink-0 tracking-tight"
                        >
                            {logo.text}
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="max-w-5xl mx-auto px-6 mt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                    {[
                        { value: "10,000+", label: "Businesses trust us", sub: "Across India & growing fast" },
                        { value: "₹50Cr+", label: "Revenue managed monthly", sub: "On our platform" },
                        { value: "99.9%", label: "Uptime guaranteed", sub: "Enterprise-grade reliability" },
                    ].map((stat) => (
                        <div key={stat.label} className="group text-center px-8 py-8">
                            <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2 group-hover:scale-105 transition-transform duration-300 inline-block">
                                {stat.value}
                            </div>
                            <p className="font-semibold text-gray-800 text-base mb-1">{stat.label}</p>
                            <p className="text-sm text-gray-400">{stat.sub}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}