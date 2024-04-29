import { Schema, model, models } from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            match: /^\S+@\S+\.\S+$/,
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        image: String,
        bookmarks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Property',
            },
        ],
    },
    {
        timestamps: true,
    }
)

// Indexes
UserSchema.index({ email: 1, username: 1 })

// Middleware
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10) // Hash password before saving
    }
    next()
})

// Static methods
UserSchema.statics.findByEmail = function (email) {
    return this.findOne({ email })
}

UserSchema.statics.findByUsername = function (username) {
    return this.findOne({ username })
}

// Instance methods
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password) // Compare hashed password
}

const User = models.User || model('User', UserSchema)

export default User
