"use client";
import React, { useState, useRef, useEffect } from "react";
import { Check, Sparkles, ArrowRight, ShieldCheck, ArrowUpRight, Zap } from "lucide-react";

// --- ⚡ PRICING DATA ---
const plans = [
    {
        name: "Starter",
        price: "0",
        yearly: "0",
        period: "Free forever",
        desc: "Perfect for solo entrepreneurs just getting started.",
        cta: "Get started free",
        href: "#",
        highlight: false,
        features: [
            "Up to 50 products",
            "100 invoices / month",
            "Basic analytics",
            "WhatsApp notifications",
            "1 user account",
            "Email support"
        ],
    },
    {
        name: "Growth",
        price: "999",
        yearly: "799",
        period: "/ month",
        desc: "Everything a growing business needs to scale efficiently.",
        cta: "Start 14-day trial",
        href: "#",
        highlight: true,
        badge: "Most Popular",
        features: [
            "Unlimited products",
            "Unlimited invoices",
            "Advanced analytics + AI",
            "Multi-location support",
            "Up to 10 users",
            "Priority support",
            "GST filing reports",
            "Customer CRM"
        ],
    },
    {
        name: "Business Pro",
        price: "Custom",
        yearly: "Custom",
        period: "",
        desc: "Tailored solutions for large businesses with complex needs.",
        cta: "Contact sales",
        href: "#",
        highlight: false,
        features: [
            "Everything in Growth",
            "Dedicated account manager",
            "Custom integrations",
            "SSO & SAML",
            "Unlimited users",
            "SLA guarantee",
            "On-premise option",
            "API access"
        ],
    },
];

// --- ⚡ ADVANCED 3D TILT & MAGNETIC GLOW CARD ---
interface PremiumTiltCardProps {
    children: React.ReactNode;
    isPremium: boolean;
    className?: string;
}

function PremiumTiltCard({ children, isPremium, className = "" }: PremiumTiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMousePos({ x, y });

        // 3D Tilt Logic
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3; // Max 3 deg tilt
        const rotateY = ((x - centerX) / centerX) * 3;

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (!cardRef.current) return;
        cardRef.current.style.transform = `perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${className}`}
            style={{ transformStyle: "preserve-3d" }}
        >
            {/* Magnetic Hover Glow (Border & Inner Spotlight) */}
            <div
                className="pointer-events-none absolute -inset-px z-30 transition-opacity duration-300"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${isPremium ? 'rgba(255,255,255,0.15)' : 'rgba(99,102,241,0.08)'
                        }, transparent 40%)`,
                }}
            />
            {/* Magnetic Edge Border Line */}
            <div
                className="pointer-events-none absolute -inset-px z-20 rounded-[inherit] border border-transparent transition-opacity duration-300"
                style={{
                    opacity: isHovered ? 1 : 0,
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                    background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, ${isPremium ? 'rgba(255,255,255,0.8)' : 'rgba(99,102,241,0.5)'
                        }, transparent 40%)`,
                }}
            />
            {children}
        </div>
    );
}

export default function Pricing() {
    const [yearly, setYearly] = useState(false);

    return (
        <div className="relative min-h-screen font-sans selection:bg-indigo-500/30 selection:text-indigo-900 bg-[#f4f7fc] z-0 pb-20">

            {/* --- ULTIMATE AMBIENT BACKGROUND --- */}
            <div className="absolute inset-0 pointer-events-none -z-10 flex justify-center items-center overflow-hidden">
                {/* Cinematic Glowing Orbs */}
                <div className="absolute top-[0%] right-[15%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[150px] animate-[blob-pulse_12s_ease-in-out_infinite]" />
                <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-cyan-400/10 blur-[140px] animate-[blob-pulse_10s_ease-in-out_infinite_1s]" />
                <div className="absolute top-[30%] left-[40%] w-[400px] h-[400px] rounded-full bg-fuchsia-400/5 blur-[120px] animate-[blob-pulse_14s_ease-in-out_infinite_2s]" />

                {/* Premium Frosted Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#f4f7fc]/10 via-transparent to-[#f4f7fc]" />
            </div>

            <section className="pt-28 px-4 sm:px-6 lg:px-8 relative z-10" id="pricing">
                <div className="max-w-[1250px] mx-auto">

                    {/* --- HEADER SECTION --- */}
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        {/* Glowing Pill Badge */}
                        <div className="animate-fade-in-up" style={{ animationFillMode: 'both' }}>
                            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/60 backdrop-blur-3xl backdrop-saturate-[2] border border-white shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06),inset_0_1px_0_white] mb-8 ring-1 ring-slate-900/5 group cursor-pointer hover:shadow-[0_8px_24px_-4px_rgba(99,102,241,0.15)] transition-all duration-300">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-[0_2px_8px_rgba(99,102,241,0.4)]">
                                    <Sparkles className="w-3.5 h-3.5" />
                                </span>
                                <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-slate-800">Pricing Engine 3.0</span>
                            </div>
                        </div>

                        {/* Immersive Title */}
                        <h2
                            className="text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] font-black text-slate-900 mb-6 tracking-[-0.04em] leading-[0.95] animate-fade-in-up"
                            style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
                        >
                            Scale your business <br className="hidden sm:block" />
                            <span className="relative inline-block pb-2">
                                <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#4f46e5,#06b6d4,#8b5cf6,#4f46e5)] bg-[length:200%_auto] animate-[gradient-text_6s_linear_infinite]">
                                    without limits.
                                </span>
                            </span>
                        </h2>

                        {/* Elegant Subtitle */}
                        <p
                            className="text-slate-600 text-lg md:text-[21px] leading-[1.6] mb-14 max-w-2xl mx-auto font-medium tracking-tight animate-fade-in-up mix-blend-color-burn"
                            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
                        >
                            Transparent pricing designed to grow with your revenue. Start building for free, and upgrade as you scale.
                        </p>

                        {/* --- HIGH-END MAC-STYLE 3D TOGGLE SWITCH --- */}
                        <div
                            className="flex flex-col items-center justify-center relative z-20 animate-fade-in-up"
                            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
                        >
                            <div className="relative flex items-center p-1.5 bg-slate-200/50 backdrop-blur-3xl rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.06),0_1px_2px_rgba(255,255,255,0.8)] w-auto ring-1 ring-slate-900/5">

                                {/* Sliding Pill Indicator (Physical Glass Feel) */}
                                <div
                                    className={`absolute inset-y-1.5 w-[140px] bg-white rounded-full shadow-[0_8px_16px_-4px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_2px_rgba(0,0,0,0.05)] ring-1 ring-slate-900/5 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${yearly ? "translate-x-[140px]" : "translate-x-0"
                                        }`}
                                />

                                <button
                                    onClick={() => setYearly(false)}
                                    className={`relative z-10 w-[140px] py-3 text-[15px] font-bold rounded-full transition-colors duration-300 ${!yearly ? "text-slate-900" : "text-slate-500 hover:text-slate-800"
                                        }`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setYearly(true)}
                                    className={`relative z-10 w-[140px] py-3 text-[15px] font-bold rounded-full transition-colors duration-300 ${yearly ? "text-slate-900" : "text-slate-500 hover:text-slate-800"
                                        }`}
                                >
                                    Annually
                                </button>

                                {/* Floating Discount Badge */}
                                <div className={`absolute -right-4 sm:-right-8 top-1/2 -translate-y-1/2 transition-all duration-[600ms] transform origin-left ${yearly ? 'opacity-100 translate-x-12 sm:translate-x-full scale-100' : 'opacity-0 translate-x-4 scale-95 pointer-events-none'
                                    }`}>
                                    <div className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-100 to-green-50 text-emerald-700 px-3.5 py-1.5 rounded-full text-[11px] font-black tracking-[0.1em] ring-1 ring-inset ring-emerald-200 shadow-[0_4px_16px_-4px_rgba(16,185,129,0.3)] whitespace-nowrap">
                                        <Zap className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
                                        SAVE 20%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- PRICING CARDS GRID --- */}
                    <div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-full items-stretch relative animate-fade-in-up"
                        style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
                    >
                        {plans.map((plan) => {
                            const isPremium = plan.highlight;
                            return (
                                <div key={plan.name} className="relative h-full flex flex-col z-10">

                                    {/* Massive Ambient Back Glow for Premium Card */}
                                    {isPremium && (
                                        <div className="absolute inset-0 bg-indigo-500/20 rounded-[2.5rem] blur-[80px] -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
                                    )}

                                    <PremiumTiltCard
                                        isPremium={isPremium}
                                        className={`flex flex-col h-full rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-10 ${isPremium
                                            ? "bg-[#09090b] text-white shadow-[0_32px_64px_-16px_rgba(15,23,42,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] ring-1 ring-white/10"
                                            : "bg-white/60 backdrop-blur-[40px] backdrop-saturate-[1.5] text-slate-900 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1)] ring-1 ring-slate-900/5 hover:bg-white/80"
                                            }`}
                                    >
                                        {/* Animated Shimmer Border for Premium Card */}
                                        {isPremium && (
                                            <div className="absolute inset-0 rounded-[2.5rem] p-[1px] -z-10 overflow-hidden pointer-events-none">
                                                <div className="absolute -inset-10 bg-[conic-gradient(from_0deg,transparent_70%,#6366f1_100%)] animate-[spin_4s_linear_infinite]" />
                                            </div>
                                        )}

                                        {/* Card Header & Badge */}
                                        <div className="mb-8 relative z-10 flex flex-col gap-4 transform-style-3d">
                                            {plan.badge && (
                                                <div className="inline-flex w-max relative group/badge mb-2" style={{ transform: "translateZ(30px)" }}>
                                                    <div className="absolute inset-0 bg-indigo-500 blur-md shadow-lg shadow-indigo-500/50 opacity-80" />
                                                    <span className="relative bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500 bg-[length:200%_auto] animate-[gradient-text_4s_linear_infinite] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.15em] shadow-xl border border-white/20 flex items-center gap-1.5">
                                                        <Sparkles className="w-3 h-3" />
                                                        {plan.badge}
                                                    </span>
                                                </div>
                                            )}
                                            <div>
                                                <h3 className={`text-[32px] font-black tracking-tight mb-3 ${isPremium ? "text-white" : "text-slate-900"}`} style={{ transform: "translateZ(20px)" }}>
                                                    {plan.name}
                                                </h3>
                                                <p className={`text-[15px] leading-relaxed min-h-[44px] font-medium ${isPremium ? "text-slate-400" : "text-slate-500"}`}>
                                                    {plan.desc}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Pricing Display */}
                                        <div className="mb-10 relative z-10">
                                            <div className="flex items-end gap-1.5">
                                                {plan.price !== "Custom" && plan.price !== "0" && (
                                                    <span className={`text-[28px] font-bold mb-1 ${isPremium ? "text-slate-400" : "text-slate-400"}`}>₹</span>
                                                )}
                                                <span className={`text-[56px] sm:text-[64px] font-black tracking-[-0.04em] leading-none transition-all duration-500 ${isPremium ? "text-white" : "text-slate-900"}`}>
                                                    {yearly ? plan.yearly : plan.price}
                                                </span>
                                                {plan.period && (
                                                    <span className={`text-[15px] font-semibold mb-2 ml-1 ${isPremium ? "text-slate-400" : "text-slate-500"}`}>
                                                        {plan.period}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Annually Billed Subtext */}
                                            {yearly && plan.price !== "Custom" && plan.price !== "0" && (
                                                <p className={`mt-2 text-[12px] font-bold tracking-widest uppercase transition-opacity duration-300 ${isPremium ? "text-indigo-400" : "text-indigo-600"}`}>
                                                    ₹{(parseInt(plan.yearly.replace(/,/g, '')) * 12).toLocaleString()} Billed Annually
                                                </p>
                                            )}
                                        </div>

                                        {/* Call to Action Button */}
                                        <div className="mb-10 relative group/btn z-20 mt-auto pt-4" style={{ transform: "translateZ(30px)" }}>
                                            {isPremium && (
                                                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur-md opacity-40 group-hover/btn:opacity-100 transition duration-500" />
                                            )}
                                            <a
                                                href={plan.href}
                                                className={`relative w-full flex justify-center items-center py-4 px-6 rounded-2xl font-bold text-[16px] transition-all duration-300 shadow-sm overflow-hidden
                                                    ${isPremium
                                                        ? "bg-white text-slate-900 hover:scale-[1.02] shadow-[0_4px_24px_rgba(255,255,255,0.2)]"
                                                        : plan.name === "Business Pro"
                                                            ? "bg-slate-900 text-white hover:bg-slate-800 hover:scale-[1.02] shadow-[0_8px_20px_rgba(15,23,42,0.2)]"
                                                            : "bg-white text-slate-900 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 hover:ring-slate-300 hover:scale-[1.02] shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
                                                    }
                                                `}
                                            >
                                                <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:200%_100%] -translate-x-full group-hover/btn:animate-[sweep_1.5s_ease-in-out_infinite]" />
                                                <span className="relative">{plan.cta}</span>
                                                <ArrowRight className={`w-4 h-4 ml-2 relative transition-transform duration-300 group-hover/btn:translate-x-1 ${isPremium ? "text-slate-900" : "text-slate-400 group-hover/btn:text-white"}`} />
                                            </a>
                                        </div>

                                        {/* Separator */}
                                        <div className={`h-px w-full mb-6 ${isPremium ? "bg-white/10" : "bg-slate-900/10"}`} />

                                        {/* Features List */}
                                        <div className="space-y-1 flex-1 relative z-10" style={{ transform: "translateZ(10px)" }}>
                                            <p className={`text-[12px] font-bold uppercase tracking-[0.15em] mb-5 px-1 ${isPremium ? "text-slate-400" : "text-slate-500"}`}>
                                                Features Included
                                            </p>
                                            <ul className="space-y-2">
                                                {plan.features.map(feature => (
                                                    <li key={feature} className={`group/item flex items-center gap-3.5 p-2.5 rounded-xl transition-all duration-300 ${isPremium ? "hover:bg-white/5" : "hover:bg-slate-900/5"}`}>
                                                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/item:scale-110 shadow-sm ${isPremium ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/20" : "bg-white border border-slate-200 text-indigo-600"}`}>
                                                            <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                                        </div>
                                                        <span className={`text-[15px] font-semibold transition-transform duration-300 group-hover/item:translate-x-1 ${isPremium ? "text-slate-300 group-hover/item:text-white" : "text-slate-600 group-hover/item:text-slate-900"}`}>
                                                            {feature}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                    </PremiumTiltCard>
                                </div>
                            );
                        })}
                    </div>

                    {/* --- FOOTER INFO --- */}
                    <div className="mt-24 text-center animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
                        <div className="inline-flex flex-col items-center">
                            <div className="flex items-center justify-center gap-2.5 mb-5 text-[14px] font-semibold text-slate-600 bg-white/60 backdrop-blur-2xl px-6 py-2.5 rounded-full border border-white shadow-[0_4px_16px_rgba(0,0,0,0.04)] ring-1 ring-slate-900/5">
                                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                Secure payment. 14-day free trial. Cancel anytime.
                            </div>
                            <a
                                href="#compare"
                                className="group flex items-center gap-1.5 text-slate-900 hover:text-indigo-600 font-bold text-[15px] transition-colors relative px-4 py-2"
                            >
                                Compare comprehensive feature matrix
                                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left ease-out duration-300" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- ADVANCED CSS KEYFRAMES --- */}
            <style>{`
                @keyframes blob-pulse {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.1); opacity: 1; }
                }
                @keyframes gradient-text {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(40px); filter: blur(12px); }
                    to { opacity: 1; transform: translateY(0); filter: blur(0); }
                }
                @keyframes sweep {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
            `}</style>
        </div>
    );
}