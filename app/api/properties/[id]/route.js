import initializeDatabase from '@/config/db.config'
import Property from '@/models/Property'
import { getSessionUser } from '@/utils/getSessionUser'
import { extractFormData } from '@/utils/helpers/common'

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

// PUT /api/properties/:id
export const PUT = async (req, { params }) => {
    try {
        const propertyData = await extractFormData(req)
        const { images, ...propertyDataWithoutImages } = propertyData
        const id = params.id

        await initializeDatabase()
        const session = await getSessionUser()

        if (!session) {
            return new Response('Unauthorized', { status: 401 })
        }

        const userId = session.userId
        const property = await Property.findById(id)

        if (!property) {
            return new Response('Property not found', { status: 404 })
        }

        if (property.owner.toString() !== userId) {
            return new Response('Unauthorized', { status: 401 })
        }

        const updatedProperty = await Property.findByIdAndUpdate(
            id,
            propertyDataWithoutImages
        )

        return new Response(
            JSON.stringify({ message: 'success', updatedProperty }),
            {
                status: 200,
            }
        )
    } catch (error) {
        console.log(error)
        return new Response('something went wrong', { status: 500 })
    }
}

// DELETE /api/properties/:id
export const DELETE = async (req, { params }) => {
    const { id } = params

    try {
        await initializeDatabase()
        const session = await getSessionUser()

        if (!session || !session.userId) {
            return new Response('Unauthorized', { status: 401 })
        }

        const userId = session.userId
        const property = await Property.findById(id)

        if (!property) {
            return new Response('Property not found', { status: 404 })
        }

        if (property.owner.toString() !== userId) {
            return new Response('Unauthorized', { status: 401 })
        }

        await property.deleteOne()
        return new Response('Property deleted', { status: 200 })
    } catch (error) {
        console.error('Error deleting property:', error)
        return new Response('Something went wrong', { status: 500 })
    }
}
