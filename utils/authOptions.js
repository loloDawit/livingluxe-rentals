import initializeDatabase from '@/config/db.config'
import User from '@/models/User'

import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
    providers: [
        // Google OAuth Provider configuration
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    // Request user consent on sign in
                    prompt: 'consent',
                    // Request offline access to refresh token
                    access_type: 'offline',
                    // Response type for authorization code flow
                    response_type: 'code',
                },
            },
        }),
    ],
    callbacks: {
        // Callback invoked after successful sign-in
        async signIn({ profile }) {
            // Initialize database connection
            await initializeDatabase()

            // Check if user exists in the database
            const userExists = await User.findOne({ email: profile.email })

            // If user doesn't exist, add them to the database
            if (!userExists) {
                // Truncate user name if too long
                const username = profile.name.slice(0, 20)

                // Create a new user in the database
                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture,
                })
            }
            // Return true to allow sign in
            return true
        },
        // Callback to modify the session object
        async session({ session }) {
            // Fetch user from the database
            const user = await User.findOne({ email: session.user.email })

            // Assign user id to the session
            session.user.id = user._id.toString()

            // Return the modified session
            return session
        },
    },
}
