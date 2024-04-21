import properties from '@/properties.json'
import CardView from './CardView'
import Link from 'next/link'

const RecentsCardView = () => {
    const recentProperties = properties
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
    return (
        <>
            <section className="px-4 py-6">
                <div className="container-xl lg:container m-auto">
                    <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
                        Recent Properties
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recentProperties.length === 0 ? (
                            <p>No properties found.</p>
                        ) : (
                            recentProperties.map((recentProperty) => (
                                <CardView
                                    key={recentProperty._id}
                                    property={recentProperty}
                                />
                            ))
                        )}
                    </div>
                </div>
            </section>

            <section class="m-auto max-w-lg my-10 px-6">
                <Link
                    href="/properties"
                    class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
                >
                    View All Properties
                </Link>
            </section>
        </>
    )
}

export default RecentsCardView
