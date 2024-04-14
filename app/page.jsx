import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div>

      <h1 className="text-3xl">welcome</h1>
      <Link href="/properties">show properties</Link>
    </div>
  )
}

export default Home