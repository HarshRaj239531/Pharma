"use client";
import { ArrowRight, Layers, MenuIcon, XIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";


export function Navbar() {
    const [openMenu, setOpenMenu] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [announcementVisible, setAnnouncementVisible] = useState(true);
    const navRef = useRef(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const handler = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setOpenMenu(null);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={navRef} className="sticky top-0 z-[1000] font-sans">

            {announcementVisible && (
                <div
                    onClick={() => window.open("/updates", "_self")}
                    className="relative flex items-center justify-center gap-2 px-4 py-2 text-white text-xs font-medium bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 hover:from-blue-800 hover:via-blue-700 hover:to-blue-600 cursor-pointer"
                >
                    <span>🎉 New: AI-powered form builder is now live</span>
                    <span className="flex items-center gap-1 font-semibold">
                        Learn more <ArrowRight />
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setAnnouncementVisible(false);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded bg-white/20 hover:bg-white/30"
                    >
                        ×
                    </button>
                </div>
            )}

            <div
                className={`transition-all duration-300 border-b ${scrolled
                    ? "bg-white/85 backdrop-blur-xl shadow-md border-blue-200"
                    : "bg-white/95 border-blue-100"
                    }`}
            >
                {/*navbar */}
                <div className="max-w-full px-4 mx-auto h-[62px] flex items-center justify-between gap-6 relative">

                    <div className="flex items-center gap-2">
                        <Layers size={28} color="blue" />
                        <span className="text-[1.1rem] font-bold text-blue-900">Pharamcy</span>
                    </div>

                    <div className="hidden md:flex items-center gap-1 text-blue-700 font-semibold absolute left-1/2 -translate-x-1/2">
                        <button className="px-3 py-1.5 text-sm rounded-lg hover:bg-blue-100 hover:text-blue-600">Features</button>
                        <a className="px-3 py-1.5 text-sm rounded-lg hover:bg-blue-100 hover:text-blue-600">Pricing</a>
                        <a className="px-3 py-1.5 text-sm rounded-lg hover:bg-blue-100 hover:text-blue-600">Docs</a>
                        <a className="px-3 py-1.5 text-sm rounded-lg hover:bg-blue-100 hover:text-blue-600">Changelogs</a>
                        <a className="px-3 py-1.5 text-sm rounded-lg hover:bg-blue-100 hover:text-blue-600">Status</a>
                    </div>

                    <div className="hidden md:flex items-center gap-2 text-blue-700">
                        <button className="px-4 py-2 text-sm border rounded-lg border-gray-300 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600">Login</button>
                        <button className="px-4 py-2 flex justify-center items-center text-sm h-10 text-white rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md">
                            Get started <span > <ArrowRight /></span>
                        </button>
                    </div>

                    <button
                        className="md:hidden p-2 border rounded-lg text-blue-800 border-gray-300 hover:bg-blue-50"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <XIcon /> : <MenuIcon />}
                    </button>
                </div>

                {mobileOpen && (
                    <div className="bg-white border-t text-blue-700 border-blue-100 px-4 py-3 flex flex-col gap-2 shadow-md">
                        <a className="px-3 py-2 rounded-lg hover:bg-blue-50">Features</a>
                        <a className="px-3 py-2 rounded-lg hover:bg-blue-50">Pricing</a>
                        <a className="px-3 py-2 rounded-lg hover:bg-blue-50">Docs</a>
                        <a className="px-3 py-2 rounded-lg hover:bg-blue-50">Changelogs</a>
                        <a className="px-3 py-2 rounded-lg hover:bg-blue-50">Status</a>

                        <div className="h-px bg-gray-100 my-2" />

                        <div className="flex gap-2 text-blue-700 font-semibold">
                            <a className="flex-1 text-center px-3 py-2 border rounded-lg border-gray-300">Login</a>
                            <a className="flex-1 text-center px-3 py-2 text-white rounded-lg bg-blue-600">Get started</a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
