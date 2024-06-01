import initializeDatabase from '@/config/db.config'
import User from '@/models/User'
import Property from '@/models/Property'
import { getSessionUser } from '@/utils/getSessionUser'

// GET /api/properties/search
export const GET = async (req, res) => {
    try {
        await initializeDatabase()
        const { searchParams } = new URL(req.url)
        const { valid, message, location, propertyType } = validateSearchParams(searchParams);

        if (!valid) {
            return new Response(message, { status: 400 });
        }

        let query = {
            $or: [
                { location: { $regex: location, $options: 'i' } },
                { description: { $regex: location, $options: 'i' } },
                { 'location.city': { $regex: location, $options: 'i' } },
                { 'location.state': { $regex: location, $options: 'i' } },
            ],
        }

        if (propertyType !== 'all') {
            query.type = { $regex: String(propertyType), $options: 'i' }
        }

        const properties = await Property.find(query).exec()

        return new Response(
            JSON.stringify(properties),
            {
                headers: { 'Content-Type': 'application/json' },
            },
            { status: 200 }
        )
    } catch (error) {
        console.error(error)
        return new Response('something went wrong', { status: 500 })
    }
}

const validateSearchParams = (searchParams) => {
    const getSearchParam = (param) =>
        searchParams.get(param.trim().toLowerCase())
    const location = getSearchParam('location')
    const propertyType = getSearchParam('propertyType')

    if (!location) {
        return { valid: false, message: 'Location is required' };
    }
    if (!propertyType) {
        return { valid: false, message: 'Property type is required' };
    }

    return { valid: true, location, propertyType };
};