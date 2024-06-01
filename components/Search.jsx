'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const propertyTypes = [
    'All',
    'Apartment',
    'Studio',
    'Condo',
    'House',
    'Cabin or Cottage',
    'Loft',
    'Room',
    'Other',
]

const Search = () => {
    const router = useRouter()
    const [location, setLocation] = useState('')
    const [propertyType, setPropertyType] = useState('All')

    const handleSubmit = (e) => {
        e.preventDefault()
        const trimmedLocation = location.trim().toLocaleLowerCase()

        if (!trimmedLocation) return

        const path =
            trimmedLocation && propertyType === 'All'
                ? '/properties'
                : `/properties/search?location=${trimmedLocation}&propertytype=${propertyType.toLocaleLowerCase()}`

        router.push(path)
    }

    return (
        <form
            className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
            onSubmit={handleSubmit}
        >
            <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
                <label htmlFor="location" className="sr-only">
                    Location
                </label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    id="location"
                    placeholder="Enter Location (City, State, Postal Code)"
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>
            <div className="w-full md:w-2/5 md:pl-2">
                <label htmlFor="property-type" className="sr-only">
                    Property Type
                </label>
                <select
                    id="property-type"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
                >
                    {propertyTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            <button
                type="submit"
                className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
            >
                Search
            </button>
        </form>
    )
}

export default Search
