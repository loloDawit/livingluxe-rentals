'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Loading from '@/components/Loading'
import PropertyHeaderImage from '@/components/property/HeaderImage'
import { fetchProperty } from '@/utils/apiRequests'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa'
import Details from '@/components/property/Details'
import DetailImages from '@/components/property/DetailImages'
import Share from '@/components/property/shared-buttons/Share'
import ContactForm from '@/components/property/ContactForm'

const PropertyPage = () => {
    const { data: session } = useSession()
    const user = session?.user || {}
    const { id } = useParams()
    const [property, setProperty] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProperty(id)
                setProperty(data)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }

        if (id) {
            fetchData()
        }
    }, [id])

    if (loading) {
        return <Loading loading={loading} />
    }

    if (error) {
        return <p>Error: {error.message}</p>
    }

    if (!property && !loading) {
        return (
            <h1 className="text-center text-2xl font-bold mt-10">
                Property Not Found
            </h1>
        )
    }

    return (
        <>
            {!loading && property ? (
                <>
                    <PropertyHeaderImage image={property?.images[0]} />
                    <section>
                        <div className="container m-auto py-6 px-6">
                            <Link
                                href="/properties"
                                className="text-blue-500 hover:text-blue-600 flex items-center"
                            >
                                <FaArrowLeft className="mr-2" /> Back to
                                Properties
                            </Link>
                        </div>
                    </section>

                    <section className="bg-blue-50">
                        <div className="container m-auto py-10 px-6">
                            <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                                <Details
                                    property={property}
                                    shouldShowBookMark={
                                        property?.owner?.toString() !== user.id
                                    }
                                />
                                <aside className="space-y-4">
                                    {property?.owner?.toString() !==
                                        user.id && (
                                        <ContactForm property={property} />
                                    )}
                                    <Share property={property} />
                                </aside>
                            </div>
                        </div>
                    </section>
                    <DetailImages images={property.images} />
                </>
            ) : (
                <p>No property found</p>
            )}
        </>
    )
}

export default PropertyPage
