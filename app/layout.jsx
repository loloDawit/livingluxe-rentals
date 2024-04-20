import React from 'react'
import '@/assets/styles/globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
    title: 'Find your next home',
    description: 'Find your dream home',
    keywords: 'Find rental, find your next home',
}

const MainLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <main>{children}</main>
            </body>
        </html>
    )
}

export default MainLayout
