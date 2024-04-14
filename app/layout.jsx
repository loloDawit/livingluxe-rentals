import React from 'react'

export const metadata = {
    title : "Find your next home",
    description: 'Find your dream home',
    keywords: "Find rental, find your next home"
}

const MainLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
        <div>{children}</div>
        </body>
    </html>
  )
}

export default MainLayout