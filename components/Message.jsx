'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { useGlobalContext } from '@/context/GlobalContext'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

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
        <Card className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
            {!isMessageRead && (
                <Badge variant="new" className="absolute top-2 right-2">
                    New
                </Badge>
            )}
            <CardHeader>
                <CardTitle className="text-xl mb-2">
                    <span className="font-bold">Property Inquiry:</span>{' '}
                    {message.property.name}
                </CardTitle>
                <CardDescription className="text-gray-700">
                    {message.body}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="mt-2">
                    <li>
                        <strong>Name:</strong> {message.sender.username}
                    </li>
                    <li>
                        <strong>Email: </strong>
                        <a
                            href={`mailto:${message.email}`}
                            className="text-blue-500"
                        >
                            {message.email}
                        </a>
                    </li>
                    <li>
                        <strong>Phone: </strong>
                        <a
                            href={`tel:${message.phone}`}
                            className="text-blue-500"
                        >
                            {message.phone}
                        </a>
                    </li>
                    <li>
                        <strong>Received:</strong>{' '}
                        {new Date(message.createdAt).toLocaleString()}
                    </li>
                </ul>
                <Button
                    onClick={handleReadClick}
                    variant={isMessageRead ? 'outline' : 'default'}
                    className="mt-4 mr-3"
                >
                    {isMessageRead ? 'Mark As New' : 'Mark As Read'}
                </Button>
                <Button
                    onClick={handleDeleteClick}
                    variant="destructive"
                    className="mt-4"
                >
                    Delete
                </Button>
            </CardContent>
        </Card>
    )
}
export default Message
