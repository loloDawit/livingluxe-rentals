import initializeDatabase from '@/config/db.config'
import User from '@/models/User'
import Property from '@/models/Property'
import { getSessionUser } from '@/utils/getSessionUser'

// POST /api/bookmarks/validate
export const POST = async (req, res) => {
    try {
        await initializeDatabase()
        const session = await getSessionUser()

        if (!session) {
            return new Response('Unauthorized', { status: 401 })
        }

        const { propertyId } = await req.json()
        const userId = session.userId

        const user = await User.findById(session.userId)
        if (!user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const property = await Property.findById(propertyId)
        if (!property) {
            return new Response('Property not found', { status: 404 })
        }

        if (property.owner.toString() === userId) {
            return new Response(
                JSON.stringify({
                    isBookmarked: false,
                }),
                { status: 200 }
            )
        }

        if (user.bookmarks.includes(propertyId)) {
            return new Response(JSON.stringify({ isBookmarked: true }), {
                status: 200,
            })
        }

        // Default response if property is not owned and not bookmarked
        return new Response(JSON.stringify({ isBookmarked: false }), {
            status: 200,
        })
    } catch (error) {
        console.error('error: ', error)
        return new Response(
            JSON.stringify({ message: 'An unexpected error occurred' }),
            { status: 500 }
        )
    }
}
