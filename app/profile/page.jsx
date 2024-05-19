'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import defaultProfile from '@/assets/images/profile.png'
import { useEffect, useState } from 'react'
import Loading from '@/components/Loading'
import { toast } from 'react-toastify'

const ProfilePage = () => {
    const { data: session } = useSession()
    const user = session?.user || {}
    const {
        image: userProfileImage,
        name: userName,
        email: userEmail,
        id: userId,
    } = user

    const [currentUserProperties, setCurrentUserProperties] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)

    useEffect(() => {
        const fetchUserProperties = async () => {
            setIsLoading(true)
            if (!userId) return
            try {
                const response = await fetch(`/api/properties/user/${userId}`)
                if (!response.ok)
                    throw new Error('Failed to fetch user properties')
                const data = await response.json()
                setCurrentUserProperties(data)
            } catch (error) {
                console.error('Error fetching user properties:', error)
                setIsError(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchUserProperties()
    }, [userId])

    const handleDeleteProperty = async (propertyId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete?')
        if (!confirmDelete) return

        try {
            const response = await fetch(`/api/properties/${propertyId}`, {
                method: 'DELETE',
            })
            if (!response.ok) throw new Error('Failed to delete property')
            const updatedProperties = currentUserProperties.filter(
                (property) => property._id !== propertyId
            )

            setCurrentUserProperties(updatedProperties)
            toast.success('Property deleted')
        } catch (error) {
            console.error('Error deleting property:', error)
            toast.error('Failed to delete property')
            setIsError(error)
        }
    }

    if (isLoading) return <Loading loading={isLoading} />

    if (isError) return <p>Error: {isError.message}</p>

    const showNoListing = () => {
        if (!isLoading && currentUserProperties.length === 0)
            return <p>You have no listings yet!</p>
        return null
    }

    return (
        <section className="bg-blue-50">
            <div className="container m-auto py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 mx-20 mt-10">
                            <div className="mb-4">
                                <Image
                                    className="h-32 w-32 md:h-25 md:w-25 rounded-full mx-auto md:mx-0"
                                    src={userProfileImage || defaultProfile}
                                    width={100}
                                    height={100}
                                    alt="User"
                                />
                            </div>
                            <h2 className="text-l mb-4">
                                <span className="font-bold block">Name: </span>{' '}
                                {userName}
                            </h2>
                            <h2 className="text-l">
                                <span className="font-bold block">Email: </span>{' '}
                                {userEmail}
                            </h2>
                        </div>

                        <div className="md:w-3/4 md:pl-4">
                            <h2 className="text-xl font-semibold mb-4">
                                Your Listings
                            </h2>
                            {showNoListing()}
                            {currentUserProperties.map((property) => (
                                <div key={property._id} className="mb-10">
                                    <Link href={`/properties/${property._id}`}>
                                        <Image
                                            className="h-32 w-full rounded-md object-cover"
                                            src={property.images[0]}
                                            alt=""
                                            width={500}
                                            height={100}
                                            priority={true}
                                        />
                                    </Link>
                                    <div className="mt-2">
                                        <p className="text-lg font-semibold">
                                            {property.name}
                                        </p>
                                        <p className="text-gray-600">
                                            Address: {property.location.street}
                                            {', '}
                                            {property.location.city}
                                            {', '}
                                            {property.location.state}
                                        </p>
                                    </div>
                                    <div className="mt-2">
                                        <Link
                                            href={`/properties/${property._id}/edit`}
                                            className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDeleteProperty(
                                                    property._id
                                                )
                                            }
                                            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                                            type="button"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProfilePage
