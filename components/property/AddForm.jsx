'use client'

import React, { useState } from 'react'

const AddForm = () => {
    const [fields, setFields] = useState({
        type: '',
        name: '',
        description: '',
        location: {
            street: '',
            city: '',
            state: '',
            zipcode: '',
        },
        beds: '',
        baths: '',
        square_feet: '',
        amenities: [],
        rates: {
            weekly: '',
            monthly: '',
            nightly: '',
        },
        seller_info: {
            name: '',
            email: '',
            phone: '',
        },
        images: [],
    })

    const amenitiesData = [
        { id: 'amenity_wifi', value: 'Wifi', label: 'Wifi' },
        { id: 'amenity_kitchen', value: 'Full Kitchen', label: 'Full kitchen' },
        {
            id: 'amenity_washer_dryer',
            value: 'Washer & Dryer',
            label: 'Washer & Dryer',
        },
        {
            id: 'amenity_free_parking',
            value: 'Free Parking',
            label: 'Free Parking',
        },
        { id: 'amenity_pool', value: 'Swimming Pool', label: 'Swimming Pool' },
        { id: 'amenity_hot_tub', value: 'Hot Tub', label: 'Hot Tub' },
        {
            id: 'amenity_24_7_security',
            value: '24/7 Security',
            label: '24/7 Security',
        },
        {
            id: 'amenity_wheelchair_accessible',
            value: 'Wheelchair Accessible',
            label: 'Wheelchair Accessible',
        },
        {
            id: 'amenity_elevator_access',
            value: 'Elevator Access',
            label: 'Elevator Access',
        },
        { id: 'amenity_dishwasher', value: 'Dishwasher', label: 'Dishwasher' },
        {
            id: 'amenity_gym_fitness_center',
            value: 'Gym/Fitness Center',
            label: 'Gym/Fitness Center',
        },
        {
            id: 'amenity_air_conditioning',
            value: 'Air Conditioning',
            label: 'Air Conditioning',
        },
        {
            id: 'amenity_balcony_patio',
            value: 'Balcony/Patio',
            label: 'Balcony/Patio',
        },
        { id: 'amenity_smart_tv', value: 'Smart TV', label: 'Smart TV' },
        {
            id: 'amenity_coffee_maker',
            value: 'Coffee Maker',
            label: 'Coffee Maker',
        },
    ]

    const handleOnChange = (e) => {
        const { name, value } = e.target
        if (name.includes('.')) {
            const [parent, child] = name.split('.')
            setFields((prevFields) => ({
                ...prevFields,
                [parent]: {
                    ...prevFields[parent],
                    [child]: value,
                },
            }))
            return
        }
        setFields((prevFields) => ({
            ...prevFields,
            [name]: value,
        }))
    }

    const handleOnAmenitiesChange = (e) => {
        const { value, checked } = e.target
        setFields((prevFields) => ({
            ...prevFields,
            amenities: checked
                ? [...prevFields.amenities, value]
                : prevFields.amenities.filter((amenity) => amenity !== value),
        }))
    }

    const handleOnImageChange = (e) => {
        const { files } = e.target
        setFields((prevFields) => ({
            ...prevFields,
            images: Array.from(files),
        }))
    }

    return (
        <form
            action="/api/properties"
            method="POST"
            encType="multipart/form-data"
        >
            <h2 className="text-3xl text-center font-semibold mb-6">
                Add Property
            </h2>

            <div className="mb-4">
                <label
                    htmlFor="type"
                    className="block text-gray-700 font-bold mb-2"
                >
                    Property Type
                </label>
                <select
                    id="type"
                    name="type"
                    className="border rounded w-full py-2 px-3"
                    required
                    value={fields.type}
                    onChange={handleOnChange}
                >
                    <option value="Apartment">Apartment</option>
                    <option value="Condo">Condo</option>
                    <option value="House">House</option>
                    <option value="Cabin Or Cottage">Cabin or Cottage</option>
                    <option value="Room">Room</option>
                    <option value="Studio">Studio</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Listing Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="eg. Beautiful Apartment In Miami"
                    required
                    value={fields.name}
                    onChange={handleOnChange}
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="description"
                    className="block text-gray-700 font-bold mb-2"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    className="border rounded w-full py-2 px-3"
                    rows="4"
                    placeholder="Add an optional description of your property"
                    value={fields.description}
                    onChange={handleOnChange}
                ></textarea>
            </div>

            <div className="mb-4 bg-blue-50 p-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Location
                </label>
                <input
                    type="text"
                    id="street"
                    name="location.street"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Street"
                    value={fields.location.street}
                    onChange={handleOnChange}
                />
                <input
                    type="text"
                    id="city"
                    name="location.city"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="City"
                    required
                    value={fields.location.city}
                    onChange={handleOnChange}
                />
                <input
                    type="text"
                    id="state"
                    name="location.state"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="State"
                    required
                    value={fields.location.state}
                    onChange={handleOnChange}
                />
                <input
                    type="text"
                    id="zipcode"
                    name="location.zipcode"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Zipcode"
                    value={fields.location.zipcode}
                    onChange={handleOnChange}
                />
            </div>

            <div className="mb-4 flex flex-wrap">
                <div className="w-full sm:w-1/3 pr-2">
                    <label
                        htmlFor="beds"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Beds
                    </label>
                    <input
                        type="number"
                        id="beds"
                        name="beds"
                        className="border rounded w-full py-2 px-3"
                        required
                        value={fields.beds}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="w-full sm:w-1/3 px-2">
                    <label
                        htmlFor="baths"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Baths
                    </label>
                    <input
                        type="number"
                        id="baths"
                        name="baths"
                        className="border rounded w-full py-2 px-3"
                        required
                        value={fields.baths}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="w-full sm:w-1/3 pl-2">
                    <label
                        htmlFor="square_feet"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Square Feet
                    </label>
                    <input
                        type="number"
                        id="square_feet"
                        name="square_feet"
                        className="border rounded w-full py-2 px-3"
                        required
                        value={fields.square_feet}
                        onChange={handleOnChange}
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Amenities
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {amenitiesData.map((amenity) => (
                        <div key={amenity.id}>
                            <input
                                type="checkbox"
                                id={amenity.id}
                                name="amenities"
                                value={amenity.value}
                                className="mr-2"
                                checked={fields.amenities.includes(
                                    amenity.value
                                )}
                                onChange={handleOnAmenitiesChange}
                            />
                            <label htmlFor={amenity.id}>{amenity.label}</label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-4 bg-blue-50 p-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Rates (Leave blank if not applicable)
                </label>
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center">
                        <label htmlFor="weekly_rate" className="mr-2">
                            Weekly
                        </label>
                        <input
                            type="number"
                            id="weekly_rate"
                            name="rates.weekly"
                            className="border rounded w-full py-2 px-3"
                            value={fields.rates.weekly}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="monthly_rate" className="mr-2">
                            Monthly
                        </label>
                        <input
                            type="number"
                            id="monthly_rate"
                            name="rates.monthly"
                            className="border rounded w-full py-2 px-3"
                            value={fields.rates.monthly}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="nightly_rate" className="mr-2">
                            Nightly
                        </label>
                        <input
                            type="number"
                            id="nightly_rate"
                            name="rates.nightly"
                            className="border rounded w-full py-2 px-3"
                            value={fields.rates.nightly}
                            onChange={handleOnChange}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <label
                    htmlFor="seller_name"
                    className="block text-gray-700 font-bold mb-2"
                >
                    Seller Name
                </label>
                <input
                    type="text"
                    id="seller_name"
                    name="seller_info.name"
                    className="border rounded w-full py-2 px-3"
                    placeholder="Name"
                    required
                    value={fields.seller_info.name}
                    onChange={handleOnChange}
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="seller_email"
                    className="block text-gray-700 font-bold mb-2"
                >
                    Seller Email
                </label>
                <input
                    type="email"
                    id="seller_email"
                    name="seller_info.email"
                    className="border rounded w-full py-2 px-3"
                    placeholder="Email address"
                    required
                    value={fields.seller_info.email}
                    onChange={handleOnChange}
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="seller_phone"
                    className="block text-gray-700 font-bold mb-2"
                >
                    Seller Phone
                </label>
                <input
                    type="tel"
                    id="seller_phone"
                    name="seller_info.phone"
                    className="border rounded w-full py-2 px-3"
                    placeholder="Phone"
                    value={fields.seller_info.phone}
                    onChange={handleOnChange}
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="images"
                    className="block text-gray-700 font-bold mb-2"
                >
                    Images (Select up to 4 images)
                </label>
                <input
                    type="file"
                    id="images"
                    name="images"
                    className="border rounded w-full py-2 px-3"
                    accept="image/*"
                    required
                    multiple
                    onChange={handleOnImageChange}
                />
            </div>

            <div>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Add Property
                </button>
            </div>
        </form>
    )
}

export default AddForm
