import React from 'react'
import CardView from '@/components/CardView'
import { fetchProperties } from '@/utils/api.requests'

const PropertiesPage = async () => {
    const properties = await fetchProperties()
    return (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
                {properties.length === 0 ? (
                    <p>No properties found</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {properties.map((property) => (
                            <CardView key={property._id} property={property} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default PropertiesPage
