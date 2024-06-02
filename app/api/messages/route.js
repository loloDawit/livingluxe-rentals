import initializeDatabase from '@/config/db.config'
import Message from '@/models/Message'
import { getSessionUser } from '@/utils/getSessionUser'

// GET /api/messages
export const GET = async (req, res) => {
    try {
        await initializeDatabase()
        const session = await getSessionUser()

        if (!session) {
            return new Response('Unauthorized', { status: 401 })
        }

        const userId = session.userId

        // Fetch messages and unread count in parallel
        const [unreadMessagesCount, messages] = await Promise.all([
            Message.countDocuments({ recipient: userId, isRead: false }),
            Message.find({ recipient: userId })
                .populate('sender', 'username')
                .populate('property', 'name')
                .sort({ createdAt: -1 }),
        ])

        // Attach unread count to the response object
        const response = {
            messages: messages?.map((message) => message.toObject()), // Convert Mongoose documents to plain JavaScript objects
            unreadMessagesCount,
        }

        return new Response(JSON.stringify(response), { status: 200 })
    } catch (error) {
        console.error(error)
        return new Response('something went wrong', { status: 500 })
    }
}

// POST /api/messages
export const POST = async (req, res) => {
    try {
        await initializeDatabase()
        const session = await getSessionUser()

        if (!session) {
            return new Response('Unauthorized', { status: 401 })
        }

        const messageData = await req.json()
        const userId = session?.userId
        const message = new Message({
            ...messageData,
            sender: userId,
            body: messageData.message,
        })
        await message.save()

        return new Response(JSON.stringify({ message: 'success' }), {
            status: 201,
        })
    } catch (error) {
        console.error(error)
        return new Response('something went wrong', { status: 500 })
    }
}
