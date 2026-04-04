export default function Hero() {
    return (
        <section className="bg-[rgb(var(--color-secondary))] text-white py-24 px-6 text-center">
            <h1 className="text-5xl font-bold mb-6">
                Manage Your Business Like a Pro 🚀
            </h1>

            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Smart dashboard, inventory, and automation tools — everything in one place.
            </p>

            <div className="flex justify-center gap-4">
                <button className="px-6 py-3 bg-[rgb(var(--color-primary))] rounded-xl">
                    Get Started
                </button>

                <button className="px-6 py-3 border border-white rounded-xl">
                    Book Demo
                </button>
            </div>
        </section>
    );
}