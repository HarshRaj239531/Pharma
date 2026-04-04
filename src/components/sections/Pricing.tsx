"use client";
import React, { useState } from "react";

const plans = [
    {
        name: "Starter", price: "₹0", yearly: "₹0", period: "Free forever",
        desc: "Perfect for solo entrepreneurs just getting started.",
        cta: "Get started free", href: "/signup", highlight: false,
        features: ["Up to 50 products","100 invoices/month","Basic analytics","WhatsApp notifications","1 user","Email support"],
    },
    {
        name: "Growth", price: "₹999", yearly: "₹799", period: "/month",
        desc: "Everything a growing business needs to scale efficiently.",
        cta: "Start 14-day trial", href: "/signup?plan=growth", highlight: true, badge: "Most popular",
        features: ["Unlimited products","Unlimited invoices","Advanced analytics + AI","Multi-location support","Up to 10 users","Priority support","GST filing reports","Customer CRM"],
    },
    {
        name: "Enterprise", price: "Custom", yearly: "Custom", period: "",
        desc: "Tailored solutions for large businesses with complex needs.",
        cta: "Contact sales", href: "/demo", highlight: false,
        features: ["Everything in Growth","Dedicated account manager","Custom integrations","SSO & SAML","Unlimited users","SLA guarantee","On-premise option","API access"],
    },
];

export default function Pricing() {
    const [yearly, setYearly] = useState(false);

    return (
        <section className="py-20 bg-slate-50" id="pricing">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-600 mb-4">
                        Simple pricing
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                        Plans that grow{" "}
                        <span className="text-blue-600">with you</span>
                    </h2>
                    <p className="text-gray-500 text-base max-w-md mx-auto mb-7">
                        Start free, upgrade when you need more. No hidden fees.
                    </p>

                    {/* Toggle */}
                    <div className="inline-flex items-center gap-0.5 bg-white border border-gray-200 rounded-full p-1 shadow-sm">
                        <button
                            onClick={() => setYearly(false)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${!yearly ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setYearly(true)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${yearly ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                        >
                            Yearly
                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${yearly ? "bg-white/20 text-white" : "bg-green-100 text-green-700"}`}>
                                Save 20%
                            </span>
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-5 items-start">
                    {plans.map(plan => (
                        <div
                            key={plan.name}
                            className={`relative rounded-2xl p-6 flex flex-col transition-all duration-200 ${
                                plan.highlight
                                    ? "bg-blue-600 shadow-xl shadow-blue-200 border-0"
                                    : "bg-white border border-gray-200 hover:border-blue-200 hover:shadow-md"
                            }`}
                        >
                            {plan.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow whitespace-nowrap">
                                        {plan.badge}
                                    </span>
                                </div>
                            )}

                            <h3 className={`font-bold text-base mb-1 ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                                {plan.name}
                            </h3>
                            <p className={`text-xs mb-5 ${plan.highlight ? "text-blue-100" : "text-gray-500"}`}>
                                {plan.desc}
                            </p>

                            {/* Price */}
                            <div className="mb-5 flex items-end gap-1">
                                <span className={`text-3xl font-black ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                                    {yearly ? plan.yearly : plan.price}
                                </span>
                                {plan.period && (
                                    <span className={`text-sm mb-1 ${plan.highlight ? "text-blue-200" : "text-gray-400"}`}>
                                        {plan.period}
                                    </span>
                                )}
                            </div>

                            <a
                                href={plan.href}
                                className={`w-full text-center py-2.5 rounded-xl font-semibold text-sm mb-6 transition-all duration-200 block ${
                                    plan.highlight
                                        ? "bg-white text-blue-600 hover:bg-blue-50"
                                        : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}
                            >
                                {plan.cta}
                            </a>

                            <div className="space-y-2.5">
                                {plan.features.map(f => (
                                    <div key={f} className="flex items-start gap-2.5">
                                        <svg className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? "text-blue-200" : "text-blue-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className={`text-xs ${plan.highlight ? "text-blue-100" : "text-gray-600"}`}>{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-center text-xs text-gray-400 mt-8">
                    All plans include a 14-day free trial. No credit card required.{" "}
                    <a href="/pricing" className="text-blue-600 hover:underline font-medium">View full comparison →</a>
                </p>
            </div>
        </section>
    );
}
