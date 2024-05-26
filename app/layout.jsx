import React from 'react'
import '@/assets/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const metadata = {
    title: 'Discover Your Next Dream Home',
    description: 'Explore a wide range of rental properties to find your perfect home. Whether you are looking for apartments, houses, or condos, we have listings that match your needs and budget.',
    keywords: 'rental properties, find your next home, dream home, apartments for rent, houses for rent, condos for rent, rental listings, property search',
}

const MainLayout = ({ children }) => {
    return (
        <AuthProvider>
            <html lang="en">
                <body>
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                    <ToastContainer />
                </body>
            </html>
        </AuthProvider>
    )
}

export default MainLayout
