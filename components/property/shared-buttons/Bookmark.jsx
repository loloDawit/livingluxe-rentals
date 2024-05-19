'use client'

import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'

const Bookmark = ({ property }) => {
    const handleClick = () => {}

    return (
        <button
            onClick={handleClick}
            className="bg-transparent p-2 transition-transform duration-200 ease-in-out"
        >
            <AiOutlineHeart
                className="transition-transform duration-200 ease-in-out transform hover:text-gray-500 hover:scale-125 fill-current text-gray-700 stroke-current stroke-2"
                size={24}
            />
        </button>
    )
}

export default Bookmark
