import initializeDatabase from '@/config/db.config'
import User from '@/models/User'
import Property from '@/models/Property'
import { getSessionUser } from '@/utils/getSessionUser'

export const dynamic = "force-dynamic";

// POST /api/bookmarks
export const POST = async (req, res) => {
    try {
        await initializeDatabase()
        const session = await getSessionUser()

        if (!session) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const { propertyId } = await req.json()
        const userId = session.userId

        const user = await User.findById(userId)
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const property = await Property.findById(propertyId)
        if (!property) {
            return res.status(404).json({message: 'Property not found'})
        }

        if (user.bookmarks.includes(propertyId)) {
            user.bookmarks.pull(propertyId);
            await user.save()
            return res.status(201).json({
                message: 'Property already bookmarked, removed now',
                isBookmarked: false,
            })
        }

        user.bookmarks.push(propertyId)
        await user.save()

        return res.status(201).json({ message: 'success', isBookmarked:true })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'something went wrong' })
    }
}