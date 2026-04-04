export default function Features() {
    const features = [
        {
            title: "Inventory Management",
            desc: "Track stock, get alerts, manage everything easily",
        },
        {
            title: "Smart Billing",
            desc: "Fast and secure billing system",
        },
        {
            title: "Analytics",
            desc: "Get reports and insights instantly",
        },
    ];

    return (
        <section className="py-16 px-6">
            <h2 className="text-3xl font-bold text-center mb-10">
                Powerful Features
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
                {features.map((f, i) => (
                    <div
                        key={i}
                        className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition"
                    >
                        <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                        <p className="text-gray-600">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}