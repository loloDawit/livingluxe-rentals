'use client'

import { useGlobalContext } from '@/context/GlobalContext'
import React from 'react'

const NotificationBadge = () => {
    const { unreadCount: count } = useGlobalContext()
    return (
        <>
            {count > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {count > 5 ? '5+' : count}
                </span>
            )}
        </>
    )
}

export default NotificationBadge
