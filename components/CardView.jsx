import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link'
import {
    FaBed,
    FaBath,
    FaRulerCombined,
    FaMoneyBill,
    FaMapMarker,
} from 'react-icons/fa'

const CardView = ({
    property: {
        type,
        name,
        images,
        beds,
        baths,
        square_feet,
        rates,
        location,
        _id,
    },
}) => {
    const getRateDisplay = () => {
        const rateTypes = ['monthly', 'weekly', 'nightly']
        const rate = rateTypes.find((rateType) => rates[rateType])
        if (rate) {
            const type = rate === 'nightly' ? 'night' : rate.slice(0, 2)
            const value = rates[rate]
            return `${value.toLocaleString()}/${type}`
        }
        return ''
    }

    return (
        <div className="rounded-xl shadow-md relative">
            <Image
                src={images[0]}
                alt=""
                sizes="100vw"
                width={0}
                height={0}
                className="w-full h-auto rounded-t-xl"
            />
            <div className="p-4">
                <div className="text-left md:text-center lg:text-left mb-6">
                    <div className="text-gray-600">{type}</div>
                    <h3 className="text-xl font-bold">{name}</h3>
                </div>
                <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
                    ${getRateDisplay()}
                </h3>

                <div className="flex justify-center gap-4 text-gray-500 mb-4">
                    <p>
                        <FaBed className="inline mr-2"></FaBed> {beds}{' '}
                        <span className="md:hidden lg:inline">Beds</span>
                    </p>
                    <p>
                        <FaBath className="inline mr-2"></FaBath> {baths}{' '}
                        <span className="md:hidden lg:inline">Baths</span>
                    </p>
                    <p>
                        <FaRulerCombined className="inline mr-2"></FaRulerCombined>
                        {square_feet}{' '}
                        <span className="md:hidden lg:inline">sqft</span>
                    </p>
                </div>

                <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
                    {Object.entries(rates).map(([type]) => (
                        <p key={type}>
                            <FaMoneyBill className="inline mr-2"></FaMoneyBill>{' '}
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </p>
                    ))}
                </div>

                <div className="border border-gray-100 mb-5"></div>

                <div className="flex flex-col lg:flex-row justify-between mb-4">
                    <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                        <FaMapMarker className="text-orange-700 mt-1"></FaMapMarker>
                        <span className="text-orange-700">
                            {location.city} {location.state}{' '}
                        </span>
                    </div>
                    <Link
                        href={`/properties/${_id}`}
                        className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

CardView.propTypes = {
    property: PropTypes.shape({
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        beds: PropTypes.number.isRequired,
        baths: PropTypes.number.isRequired,
        square_feet: PropTypes.number.isRequired,
        rates: PropTypes.shape({
            monthly: PropTypes.number,
            weekly: PropTypes.number,
            nightly: PropTypes.number,
        }).isRequired,
        location: PropTypes.shape({
            city: PropTypes.string.isRequired,
            state: PropTypes.string.isRequired,
        }).isRequired,
        _id: PropTypes.string.isRequired,
    }).isRequired,
}

export default CardView
