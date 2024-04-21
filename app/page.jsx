import Link from 'next/link'
import React from 'react'
import Hero from '@/components/Hero'
import InfoBoxes from '@/components/InfoBoxes'
import RecentsCardView from '@/components/RecentsCardView'

const Home = () => {
    return (
        <>
            <Hero />
            <InfoBoxes />
            <RecentsCardView />
        </>
    )
}

export default Home
