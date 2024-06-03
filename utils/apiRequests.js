const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null

// Fetch all properties
async function fetchProperties({ showFeatured = false } = {}) {
    try {
        // Check if apiDomain is available, return empty array if not
        if (!apiDomain) {
            return []
        }

        // Construct the URL based on whether to show featured properties
        const url = showFeatured
            ? `${apiDomain}/properties/featured`
            : `${apiDomain}/properties`

        // Fetch data with cache disabled
        const res = await fetch(url, { cache: 'no-store' })

        console.log('fetchProperties', res)

        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }

        return res.json()
    } catch (error) {
        console.error('Error fetching properties:', error)
        return []
    }
}

// Fetch single property
async function fetchProperty(id) {
    try {
        // Handle the case where the domain is not available yet
        if (!apiDomain) {
            return null
        }

        const res = await fetch(`${apiDomain}/properties/${id}`, {
            cache: 'no-store',
        })

        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }

        return res.json()
    } catch (error) {
        console.log(error)
        return null
    }
}

export { fetchProperties, fetchProperty }
