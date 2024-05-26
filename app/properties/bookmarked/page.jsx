'use client'

import CardView from '@/components/CardView'
import Loading from '@/components/Loading'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const BookMarkedProperties = () => {
    const [bookMarkedProperties, setBookMarkedProperties] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchBookMarkedProperties = async () => {
            try {
                const response = await fetch('/api/bookmarks')
                if (!response.ok)
                    throw new Error('Failed to fetch bookmarked properties')
                const data = await response.json()
                setBookMarkedProperties(data)
            } catch (error) {
                toast.error('Error fetching bookmarked properties')
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchBookMarkedProperties()
    }, [])

    if (isLoading) return <Loading loading={isLoading} />

    if (error) return <p>Error: {error.message}</p>

    return (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
                <h1 className="text-2xl mb-4">Saved Properties</h1>
                {bookMarkedProperties.length === 0 ? (
                    <p>No saved properties</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {bookMarkedProperties.map((property) => (
                            <CardView key={property._id} property={property} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default BookMarkedProperties
