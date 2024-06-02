import React from 'react'
import InfoBox from './InfoBox'

const InfoBoxes = () => {
    const infoBoxData = [
        {
            heading: 'For Renters',
            buttonInfo: {
                text: 'Browse Properties',
                link: '/properties',
                backgroundColor: 'bg-black',
            },
            content:
                'Find your dream rental. Bookmark your favorite listings and contact the owners directly.',
        },
        {
            heading: 'For Property Owners',
            backgroundColor: 'bg-blue-100',
            buttonInfo: {
                text: 'Add Property',
                link: '/properties/add',
                backgroundColor: 'bg-blue-500',
            },
            content:
                'Rent your properties as Airbnb or long-term leases and connect with tenants.',
        },
    ]

    return (
        <div>
            <section>
                <div className="container-xl lg:container m-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                        {infoBoxData.map((info, index) => (
                            <InfoBox
                                key={index}
                                heading={info.heading}
                                backgroundColor={info.backgroundColor}
                                buttonInfo={info.buttonInfo}
                            >
                                {info.content}
                            </InfoBox>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default InfoBoxes
