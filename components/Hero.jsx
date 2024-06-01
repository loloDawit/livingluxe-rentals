import React from 'react'
import Search from './Search'

const Hero = () => {
    return (
        <section className="bg-blue-900 py-20 mb-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                    Discover Your Ideal Rental
                </h1>
                <p className="my-4 text-xl text-white">
                    Locate the perfect home tailored to your needs
                </p>
                <Search />
            </div>
        </section>
    )
}

export default Hero
