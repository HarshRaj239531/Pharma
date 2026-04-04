"use client";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-[rgb(var(--color-secondary))] text-white">
            <h1 className="text-xl font-bold">LitCart</h1>

            <div className="flex gap-4">
                <button className="hover:text-gray-300">Home</button>
                <button className="hover:text-gray-300">Login</button>
            </div>
        </nav>
    );
}