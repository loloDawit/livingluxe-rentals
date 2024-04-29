import initializeDatabase from '@/config/db.config'
import Property from '@/models/Property'

// GET /api/properties/:id
export const GET = async (req, { params }) => {
    const id = params.id
    try {
        await initializeDatabase()
        const property = await Property.findById(id)

        if (!property) {
            return new Response('Property not found', { status: 404 })
        }

        return new Response(JSON.stringify(property), { status: 200 })
    } catch (error) {
        console.error('Error fetching property:', error)
        return new Response('Something went wrong', { status: 500 })
    }
}
