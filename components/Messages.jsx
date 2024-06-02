'use client'

import { useState, useEffect } from 'react'
import Message from '@/components/Message'
import Loading from './Loading'

const Messages = () => {
    const [messages, setMessages] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await fetch('/api/messages')

                if (res.status === 200) {
                    const { messages: data } = await res.json()
                    setMessages(data)
                }
            } catch (error) {
                console.log('Error fetching messages: ', error)
            } finally {
                setIsLoading(false)
            }
        }

        getMessages()
    }, [])

    if (isLoading) {
        ;<Loading loading={isLoading} />
    }

    return (
        <section className="bg-blue-50 min-h-screen flex">
            <div className="container pt-16 pb-8 max-w-6xl w-full mx-4 md:mx-auto">
                <div className="bg-white px-6 py-6 py-llmb-4 shadow-md rounded-md border m-4 md:m-0">
                    <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

                    <div className="space-y-4">
                        {messages.length === 0 ? (
                            <p>You have no messages</p>
                        ) : (
                            messages.map((message) => (
                                <Message key={message._id} message={message} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Messages
