import React from 'react'
import EditForm from '@/components/property/EditForm';

const UpdateProperty = () => {
    return (
        <section className="bg-blue-50">
            <div className="container m-auto max-w-2xl py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <EditForm />
                </div>
            </div>
        </section>
    )
}

export default UpdateProperty
