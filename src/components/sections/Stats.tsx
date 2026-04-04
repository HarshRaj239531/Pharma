export default function Stats() {
    return (
        <section className="bg-gray-100 py-16 px-6 text-center">
            <div className="grid md:grid-cols-3 gap-6">
                <div>
                    <h2 className="text-3xl font-bold">10K+</h2>
                    <p className="text-gray-600">Users</p>
                </div>

                <div>
                    <h2 className="text-3xl font-bold">50K+</h2>
                    <p className="text-gray-600">Orders Managed</p>
                </div>

                <div>
                    <h2 className="text-3xl font-bold">99%</h2>
                    <p className="text-gray-600">Uptime</p>
                </div>
            </div>
        </section>
    );
}