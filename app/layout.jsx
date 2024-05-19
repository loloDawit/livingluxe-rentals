import React from 'react'
import '@/assets/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const metadata = {
    title: 'Find your next home',
    description: 'Find your dream home',
    keywords: 'Find rental, find your next home',
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
