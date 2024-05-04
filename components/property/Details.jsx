import {
    FaBed,
    FaBath,
    FaRulerCombined,
    FaTimes,
    FaCheck,
    FaMapMarker,
} from 'react-icons/fa'
//   import PropertyMap from '@/components/PropertyMap';

const Details = ({
    property: {
        type,
        name,
        location,
        rates,
        beds,
        baths,
        square_feet,
        description,
        amenities,
    },
}) => {
    return (
        <main>
            <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{type}</div>
                <h1 className="text-3xl font-bold mb-4">{name}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                    <FaMapMarker className="text-lg text-orange-700 mr-2" />
                    <p className="text-orange-700">
                        {location.street}, {location.city} {location.state}
                    </p>
                </div>

                <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
                    Rates & Options
                </h3>
                <div className="flex flex-col md:flex-row justify-around">
                    {['Nightly', 'Weekly', 'Monthly'].map((type) => (
                        <div
                            key={type}
                            className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"
                        >
                            <div className="text-gray-500 mr-2 font-bold">
                                {type}
                            </div>
                            <div className="text-2xl font-bold text-blue-500">
                                {rates[type.toLowerCase()] ? (
                                    `$${rates[type.toLowerCase()].toLocaleString()}`
                                ) : (
                                    <FaTimes className="text-red-700" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">
                    Description & Details
                </h3>
                <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
                    <p>
                        <FaBed className="inline-block mr-2" /> {beds}{' '}
                        <span className="hidden sm:inline">Beds</span>
                    </p>
                    <p>
                        <FaBath className="inline-block mr-2" /> {baths}{' '}
                        <span className="hidden sm:inline">Baths</span>
                    </p>
                    <p>
                        <i className="fa-solid fa-ruler-combined"></i>
                        <FaRulerCombined className="inline-block mr-2" />
                        {square_feet}{' '}
                        <span className="hidden sm:inline">sqft</span>
                    </p>
                </div>
                <p className="text-gray-500 mb-4 text-center">{description}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">Amenities</h3>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none space-y-2">
                    {amenities.map((amenity, index) => (
                        <li key={index}>
                            <FaCheck className="inline-block text-green-600 mr-2" />{' '}
                            {amenity}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                {/* <PropertyMap property={property} /> */}
            </div>
        </main>
    )
}
export default Details
