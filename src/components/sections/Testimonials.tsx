"use client";
import React from "react";

const testimonials = [
    { quote: "BuildFormula transformed how we manage our 3 stores. Real-time inventory sync alone saved us hours every week.", name: "Rajesh Sharma", role: "Owner, Sharma Electronics", avatar: "RS", color: "#2563eb" },
    { quote: "GST billing used to be a nightmare. Now we generate and send invoices in under 10 seconds. Our accountant loves it.", name: "Priya Nair", role: "CFO, Nair Textiles Pvt. Ltd.", avatar: "PN", color: "#1d4ed8" },
    { quote: "The analytics dashboard gives us exactly the insights we need. We could see which products were underperforming immediately.", name: "Sameer Mehta", role: "Co-founder, MehBrew Café", avatar: "SM", color: "#3b82f6" },
    { quote: "Switched from 4 different tools to just BuildFormula. Team adoption was surprisingly fast — the UI is that intuitive.", name: "Ananya Joshi", role: "Operations Lead, QuickKart", avatar: "AJ", color: "#1e40af" },
    { quote: "Customer management is now central to our operations. We know every client's history before we even pick up the phone.", name: "Devang Patel", role: "Director, Patel Motors", avatar: "DP", color: "#2563eb" },
    { quote: "WhatsApp alerts for low stock? Genius. We haven't had a stockout in 3 months since switching to BuildFormula.", name: "Meera Krishnan", role: "Manager, FreshMart Grocers", avatar: "MK", color: "#1d4ed8" },
];

export default function Testimonials() {
    return (
        <section className="py-20 bg-white" id="testimonials">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-600 mb-4">
                        Customer stories
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                        Loved by{" "}
                        <span className="text-blue-600">10,000+ businesses</span>
                    </h2>
                    <p className="text-gray-500 text-base max-w-md mx-auto">
                        Real feedback from real business owners across India.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-1 transition-all duration-200 flex flex-col">
                            <div className="flex gap-1 mb-3">
                                {[1,2,3,4,5].map(s => (
                                    <svg key={s} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <blockquote className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">
                                &ldquo;{t.quote}&rdquo;
                            </blockquote>
                            <div className="flex items-center gap-2.5">
                                <div
                                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                                    style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)` }}
                                >
                                    {t.avatar}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-xs">{t.name}</p>
                                    <p className="text-gray-400 text-xs">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
