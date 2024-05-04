const extractLocationData = (formData) => ({
    street: formData.get('location.street'),
    city: formData.get('location.city'),
    state: formData.get('location.state'),
    zipcode: formData.get('location.zipcode'),
})

const extractRatesData = (formData) => ({
    weekly: formData.get('rates.weekly'),
    monthly: formData.get('rates.monthly'),
    nightly: formData.get('rates.nightly'),
})

const extractSellerInfo = (formData) => ({
    name: formData.get('seller_info.name'),
    email: formData.get('seller_info.email'),
    phone: formData.get('seller_info.phone'),
})

export const extractFormData = async (req) => {
    const formData = await req.formData()
    const amenities = formData.getAll('amenities')
    const images = formData
        .getAll('images')
        .filter((image) => image.name !== '')

    return {
        type: formData.get('type'),
        name: formData.get('name'),
        description: formData.get('description'),
        location: extractLocationData(formData),
        beds: formData.get('beds'),
        baths: formData.get('baths'),
        square_feet: formData.get('square_feet'),
        amenities,
        rates: extractRatesData(formData),
        seller_info: extractSellerInfo(formData),
        images,
    }
}
