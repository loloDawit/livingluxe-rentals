'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useGlobalContext } from '@/context/GlobalContext'

const Message = ({ message }) => {
    const [isMessageRead, setIsMessageRead] = useState(message.isRead)
    const [isDeleted, setIsDeleted] = useState(false)

    const { setUnreadCount } = useGlobalContext()

    const updateMessageStatus = async (method, errorMessage) => {
        try {
            const res = await fetch(`/api/messages/${message._id}`, { method })
            if (res.status === 200) {
                return await res.json()
            }
            throw new Error()
        } catch (error) {
            console.error(error)
            toast.error(errorMessage)
            return null
        }
    }

    const handleReadClick = async () => {
        const data = await updateMessageStatus('PUT', 'Something went wrong')

        if (data) {
            const isRead = data?.message?.isRead
            setIsMessageRead(isRead)
            setUnreadCount((prevCount) =>
                isRead ? prevCount - 1 : prevCount + 1
            )
            toast.success(isRead ? 'Marked as read' : 'Marked as new')
        }
    }

    const handleDeleteClick = async () => {
        const success = await updateMessageStatus(
            'DELETE',
            'Message was not deleted'
        )
        if (success) {
            setIsDeleted(true)
            setUnreadCount((prevCount) => prevCount - 1)
            toast.success('Message Deleted')
        }
    }

    if (isDeleted) return null

    return (
        <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
            {!isMessageRead && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
                    New
                </div>
            )}
            <h2 className="text-xl mb-4">
                <span className="font-bold">Property Inquiry:</span>{' '}
                {message.property.name}
            </h2>
            <p className="text-gray-700">{message.body}</p>

            <ul className="mt-4">
                <li>
                    <strong>Name:</strong> {message.sender.username}
                </li>

                <li>
                    <strong>Reply Email:</strong>{' '}
                    <a
                        href={`mailto:${message.email}`}
                        className="text-blue-500"
                    >
                        {message.email}
                    </a>
                </li>
                <li>
                    <strong>Reply Phone:</strong>{' '}
                    <a href={`tel:${message.phone}`} className="text-blue-500">
                        {message.phone}
                    </a>
                </li>
                <li>
                    <strong>Received:</strong>{' '}
                    {new Date(message.createdAt).toLocaleString()}
                </li>
            </ul>
            <button
                onClick={handleReadClick}
                className={`mt-4 mr-3 ${
                    isMessageRead ? 'bg-gray-300' : 'bg-blue-500 text-white'
                } py-1 px-3 rounded-md`}
            >
                {isMessageRead ? 'Mark As New' : 'Mark As Read'}
            </button>
            <button
                onClick={handleDeleteClick}
                className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
            >
                Delete
            </button>
        </div>
    )
}
export default Message
