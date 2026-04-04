export default function Button({ children }: { children: React.ReactNode }) {
    return (
        <button className="px-6 py-3 rounded-[var(--radius)] bg-[rgb(var(--color-primary))] text-white font-semibold hover:scale-105 transition">
            {children}
        </button>
    );
}