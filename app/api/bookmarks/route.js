import initializeDatabase from '@/config/db.config'
import User from '@/models/User'
import Property from '@/models/Property'
import { getSessionUser } from '@/utils/getSessionUser'

// GET /api/bookmarks
export const GET = async (req, res) => {
    try {
        await initializeDatabase()
        const session = await getSessionUser()

        if (!session) {
            return new Response('Unauthorized', { status: 401 })
        }

        const userId = session.userId
        const user = await User.findById(userId)
        if (!user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const properties = await Property.find({
            _id: { $in: user.bookmarks },
        })

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
// POST /api/bookmarks
export const POST = async (req, res) => {
    try {
        await initializeDatabase()
        const session = await getSessionUser()

        if (!session) {
            return new Response('Unauthorized', { status: 401 })
        }

        const { propertyId } = await req.json()
        const userId = session.userId

        const user = await User.findById(userId)
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
                    message: 'You cannot bookmark your own property',
                    isBookmarked: false,
                }),
                { status: 400 }
            )
        }

        if (user.bookmarks.includes(propertyId)) {
            user.bookmarks.pull(propertyId)
            await user.save()
            return new Response(
                JSON.stringify({
                    message: 'Bookmark removed successfully',
                    isBookmarked: false,
                }),
                { status: 201 }
            )
        }

        user.bookmarks.push(propertyId)
        await user.save()

        return new Response(
            JSON.stringify({ message: 'success', isBookmarked: true }),
            {
                status: 201,
            }
        )
    } catch (error) {
        console.error(error)
        return new Response('something went wrong', { status: 500 })
    }
}
