import { Schema, model, models } from 'mongoose'

const PropertySchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            required: true,
            enum: [
                'House',
                'Apartment',
                'Condo',
                'Cabin or Cottage',
                'Room',
                'Studio',
                'Other',
            ], // Example enum for property types
        },
        description: {
            type: String,
            trim: true,
        },
        location: {
            street: String,
            city: String,
            state: String,
            zipcode: String,
        },
        beds: {
            type: Number,
            required: true,
            min: 1,
        },
        baths: {
            type: Number,
            required: true,
            min: 1,
        },
        square_feet: {
            type: Number,
            required: true,
            min: 1,
        },
        amenities: [String],
        rates: {
            nightly: Number,
            weekly: Number,
            monthly: Number,
        },
        seller_info: {
            name: String,
            email: {
                type: String,
                match: /^\S+@\S+\.\S+$/,
            },
            phone: String,
        },
        images: [String],
        is_featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

// Indexes
PropertySchema.index({ location: '2dsphere' }) // Example index for geospatial queries

// Virtuals
PropertySchema.virtual('fullAddress').get(function () {
    return `${this.location.street}, ${this.location.city}, ${this.location.state}, ${this.location.zipcode}`
})

// Middleware
PropertySchema.pre('save', function (next) {
    // Do something before saving
    next()
})

// Static methods
PropertySchema.statics.findByOwner = function (ownerId) {
    return this.find({ owner: ownerId })
}

// Instance methods
PropertySchema.methods.calculatePriceForDays = function (days) {
    // Example method to calculate price based on nightly rate
    if (!this.rates.nightly) return null
    return this.rates.nightly * days
}

const Property = models.Property || model('Property', PropertySchema)

export default Property
