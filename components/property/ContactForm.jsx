'use client'

import { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'

const ContactForm = ({ property }) => {
    const { data: session } = useSession()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    })
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            ...formData,
            recipient: property.owner,
            property: property._id,
        }

        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (res.ok) {
                toast.success('Message sent successfully')
                setIsSubmitted(true)
            } else {
                const errorData = await res.json()
                toast.error(errorData.message || 'Error sending form')
            }
        } catch (error) {
            console.error(error)
            toast.error('Error sending form')
        } finally {
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
            })
        }
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
            {!session ? (
                <p>You must be logged in to send a message</p>
            ) : isSubmitted ? (
                <p className="text-green-500 mb-4">
                    Your message has been sent successfully
                </p>
            ) : (
                <form onSubmit={handleSubmit}>
                    {['name', 'email', 'phone', 'message'].map((field) => (
                        <div key={field} className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor={field}
                            >
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                                :
                            </label>
                            {field === 'message' ? (
                                <textarea
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                                    id={field}
                                    placeholder={`Enter your ${field}`}
                                    value={formData[field]}
                                    onChange={handleChange}
                                />
                            ) : (
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id={field}
                                    type={field === 'email' ? 'email' : 'text'}
                                    placeholder={`Enter your ${field}`}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    required={field !== 'phone'}
                                />
                            )}
                        </div>
                    ))}
                    <div>
                        <button
                            className="bg-sky-500 hover:bg-sky-800 text-white py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                            type="submit"
                        >
                            <FaPaperPlane className="mr-2" /> Send Message
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default ContactForm
