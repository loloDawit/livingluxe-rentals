'use client'

import Loading from '@/components/Loading'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { toast } from 'react-toastify'

const Bookmark = ({ property }) => {
    const { data: session } = useSession()
    const userId = session?.user?.id || ''
    const [isBookMarked, setIsBookMarked] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!userId) return setIsLoading(false)
        const fetchBookMarkStatus = async () => {
            try {
                const res = await fetch('/api/bookmarks/validate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ propertyId: property._id }),
                })

                if (res.ok) {
                    const data = await res.json()
                    setIsBookMarked(data.isBookmarked)
                } else {
                    const errorData = await res.json()
                    console.error('Error fetching bookmark status:', errorData)
                    toast.error('Failed to fetch bookmark status')
                }
            } catch (error) {
                console.error('Error fetching bookmark status:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchBookMarkStatus()
    }, [property._id, userId])

    const handleClick = async () => {
        if (!session || !userId) {
            return toast.error('Please sign in to bookmark this property')
        }

        try {
            const res = await fetch('/api/bookmarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ propertyId: property._id }),
            })

            console.log(res)

            if (res.ok) {
                const data = await res.json()
                setIsBookMarked(data.isBookmarked)
                toast.success(data.message)
            } else {
                const errorData = await res.json()
                toast.error(errorData.message || 'Failed to bookmark property')
            }
        } catch (error) {
            console.error('Error bookmarking property:', error)
            toast.error('An unexpected error occurred')
        }
    }

    if (isLoading)
        return (
            <div>
                <Loading loading={isLoading} size={12} />
            </div>
        )

    return (
        <button
            onClick={handleClick}
            className="bg-transparent p-2 transition-transform duration-200 ease-in-out"
        >
            {isBookMarked ? (
                <AiFillHeart
                    className="transition-transform duration-200 ease-in-out transform hover:text-rose-700 hover:scale-125 fill-current text-rose-600 stroke-current stroke-2"
                    size={24}
                />
            ) : (
                <AiOutlineHeart
                    className="transition-transform duration-200 ease-in-out transform hover:text-gray-500 hover:scale-125 fill-current text-gray-700 stroke-current stroke-2"
                    size={24}
                />
            )}
        </button>
    )
}

export default Bookmark
