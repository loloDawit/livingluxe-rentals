import initializeDatabase from '@/config/db.config'
import Message from '@/models/Message'
import { getSessionUser } from '@/utils/getSessionUser'

export const dynamic = 'force-dynamic'

// PUT /api/messages/:id
export const PUT = async (req, { params }) => {
    try {
        await initializeDatabase()
        const session = await getSessionUser()

        if (!session) {
            return new Response('Unauthorized', { status: 401 })
        }

        const { id } = params
        const message = await Message.findById(id)

        if (!message) {
            return new Response('Message not found', { status: 404 })
        }

        if (message.recipient.toString() !== session.userId) {
            return new Response('Unauthorized', { status: 401 })
        }

        message.isRead = !message.isRead
        await message.save()

        return new Response(JSON.stringify({ message }), {
            status: 200,
        })
    } catch (error) {
        console.error(error)
        return new Response('something went wrong', { status: 500 })
    }
}

// DELETE /api/messages/:id
export const DELETE = async (req, { params }) => {
    try {
        await initializeDatabase()
        const session = await getSessionUser()

        if (!session) {
            return new Response('Unauthorized', { status: 401 })
        }

        const { id } = params
        const message = await Message.findById(id)

        if (!message) {
            return new Response('Message not found', { status: 404 })
        }

        if (message.recipient.toString() !== session.userId) {
            return new Response('Unauthorized', { status: 401 })
        }

        await message.deleteOne()

        return new Response(JSON.stringify({ message: 'success' }), {
            status: 200,
        })
    } catch (error) {
        console.error(error)
        return new Response('something went wrong', { status: 500 })
    }
}
