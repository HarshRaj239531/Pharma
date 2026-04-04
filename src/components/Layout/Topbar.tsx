"use client";
// Topbar hidden — announcement banner style (optional)
export default function Topbar() {
    return (
        <div className="w-full bg-zinc-900 text-white text-xs py-2 text-center font-medium tracking-wide">
            🎉 &nbsp; Introducing BuildFormula 2.0 —{" "}
            <a href="#" className="underline underline-offset-2 hover:text-green-400 transition-colors">
                See what&apos;s new
            </a>
        </div>
    );
}