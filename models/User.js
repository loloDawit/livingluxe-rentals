import { Schema, model, models } from 'mongoose'

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

// Static methods
UserSchema.statics.findByEmail = function (email) {
    return this.findOne({ email })
}

UserSchema.statics.findByUsername = function (username) {
    return this.findOne({ username })
}

const User = models.User || model('User', UserSchema)

export default User
