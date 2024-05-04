import initializeDatabase from '@/config/db.config'
import Property from '@/models/Property'
import { getSessionUser } from '@/utils/getSessionUser'
import { extractFormData } from '@/utils/helpers/common'
import cloudinary from '@/config/cloudinary'

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

// POST /api/properties
export const POST = async (req, res) => {
    try {
        const propertyData = await extractFormData(req)
        console.log(propertyData.images)

        await initializeDatabase()
        const session = await getSessionUser()
        console.log(session)

        if (!session) {
            return new Response('Unauthorized', { status: 401 })
        }

        const imageUploadPromises = []

        for (const image of propertyData.images) {
            console.log(image)
            const imageBuffer = await image.arrayBuffer()
            const imageArray = Array.from(new Uint8Array(imageBuffer))
            const imageData = Buffer.from(imageArray).toString('base64')
            const uploadedImage = await cloudinary.uploader.upload(
                `data:image/jpeg;base64,${imageData}`,
                { folder: 'airbnb-clone' }
            )
            imageUploadPromises.push(uploadedImage.secure_url)
        }
        // Wait for all images to upload
        const uploadedImages = await Promise.all(imageUploadPromises)
        // Add uploaded images to the propertyData object
        propertyData.images = uploadedImages

        const userId = session.userId
        const property = new Property({ ...propertyData, owner: userId })
        await property.save()

        console.log(property)

        return Response.redirect(
            `${process.env.NEXTAUTH_URL}/properties/${property._id}`
        )
        // return new Response(JSON.stringify({ message: 'success' }), {
        //     status: 201,
        // })
    } catch (error) {
        console.log(error)
        return new Response('something went wrong', { status: 500 })
    }
}
