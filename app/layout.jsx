import React from 'react'
import '@/assets/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GlobalProvider } from '@/context/GlobalContext'

export const metadata = {
    title: 'Discover Your Next Dream Home',
    description:
        'Explore diverse rentals to find your perfect home. From apartments to houses and condos, we have listings for every need and budget.',
    keywords:
        'rental properties, find your next home, dream home, apartments for rent, houses for rent, condos for rent, rental listings, property search',
}

const MainLayout = ({ children }) => {
    return (
        <GlobalProvider>
            <AuthProvider>
                <head>
                    <link rel="icon" href="/favicon.ico" sizes="any" />
                    <link
                        rel="apple-touch-icon"
                        href="/apple-icon?<generated>"
                        type="image/<generated>"
                        sizes="<generated>"
                    />
                    <link
                        rel="icon"
                        href="/icon?<generated>"
                        type="image/<generated>"
                        sizes="<generated>"
                    />
                </head>
                <html lang="en">
                    <body>
                        <Navbar />
                        <main>{children}</main>
                        <Footer />
                        <ToastContainer />
                    </body>
                </html>
            </AuthProvider>
        </GlobalProvider>
    )
}

export default MainLayout
