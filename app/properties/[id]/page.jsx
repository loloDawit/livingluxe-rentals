'use client'

import { useRouter, useParams } from 'next/navigation'
import React from 'react'

const PropertyPage = () => {
    const router = useRouter
    const parms = useParams()
    console.log('test', parms)
    return <div>PropertyPage</div>
}

export default PropertyPage
