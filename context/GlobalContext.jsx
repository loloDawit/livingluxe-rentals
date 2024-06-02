'use client'
import { createContext, useContext, useEffect, useState } from 'react'

// Create context
const GlobalContext = createContext()

// Create a provider
export function GlobalProvider({ children }) {
    const [unreadCount, setUnreadCount] = useState(0)

    useEffect(() => {
        const fetchUnreadMessages = async () => {
            const res = await fetch('/api/messages')
            if (res.status === 200) {
                const { unreadMessagesCount: count } = await res.json()
                setUnreadCount(count)
            }
        }
        fetchUnreadMessages()
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                unreadCount,
                setUnreadCount,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

// Create a custom hook to access context
export function useGlobalContext() {
    return useContext(GlobalContext)
}
