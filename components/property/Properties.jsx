'use client'

import React, { useCallback, useEffect, useState } from 'react'
import CardView from '../CardView'
import Loading from '../Loading'
import Pagination from './Pagination'

const PAGE_SIZE = 3
const Properties = () => {
    const [properties, setProperties] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const fetchProperties = useCallback(async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`/api/properties?page=${page}&size=${PAGE_SIZE}`)
            if (!response.ok) {
                throw new Error('Failed to fetch properties')
            }
            const data = await response.json()
            setProperties(data.properties)
            setTotalPages(data.totalPages)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }, [page])

    useEffect(() => {
        fetchProperties()
    }, [fetchProperties])

    const handlePageChange = (newPage) => {
        setPage(newPage)
    }

    if (isLoading) {
        return <Loading loading={isLoading} />
    }

    if (error) {
        return <p>{error.message}</p>
    }

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
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </section>
    )
}

export default Properties
