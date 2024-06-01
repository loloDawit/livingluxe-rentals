'use client'

import Loading from '@/components/Loading'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import CardView from '@/components/CardView'
import Search from '@/components/Search'


const SearchResult = () => {
    const searchParams = useSearchParams()
    const getSearchParam = (param) =>
        searchParams.get(param.trim().toLowerCase())
    const location = getSearchParam('location')
    const propertyType = getSearchParam('propertyType')
    const [searchResult, setSearchResult] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    console.log({ location, propertyType });

    useEffect(() => {
        const fetchSearchResult = async () => {
            try {
                const response = await fetch(`/api/properties/search?location=${location}&propertytype=${propertyType}`)
                const data = await response.json()
                setSearchResult(data)
            } catch (error) {
                setError(true)
            } finally {
                setIsLoading(false)
            }
        }

        fetchSearchResult()
    }, [location, propertyType])
    
    if (isLoading) return <Loading loading={isLoading} />

    if (error) return <p>Error: {error.message}</p>

    return (
        <>
          <section className='bg-blue-700 py-4'>
            <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
              <Search />
            </div>
          </section>
            <section className='px-4 py-6'>
              <div className='container-xl lg:container m-auto px-4 py-6'>
                <Link
                  href='/properties'
                  className='flex items-center text-blue-500 hover:underline mb-3'
                >
                  <FaArrowAltCircleLeft className='mr-2 mb-1' /> Back To Properties
                </Link>
                <h1 className='text-2xl mb-4'>Search Results</h1>
                {searchResult.length === 0 ? (
                  <p>No search results found</p>
                ) : (
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {searchResult.map((property) => (
                      <CardView key={property._id} property={property} />
                    ))}
                  </div>
                )}
              </div>
            </section>
        </>
      );
}

export default SearchResult