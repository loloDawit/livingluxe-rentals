import initializeDatabase from '@/config/db.config'
import Property from '@/models/Property'
// GET /api/properties
export const GET = async (req, res) => {
    try {
        await initializeDatabase()
        const properties = await Property.find({})
        return new Response(JSON.stringify(properties), { status: 200 })
    } catch (error) {
        return new Response('something went wring', { status: 500 })
    }
}
