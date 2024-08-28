import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema(


    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: [true, "password is required"]
        },
        avatar: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String

        },
        watchHistroy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: " video"
            }
        ]
    },
    {
        timestamps: true
    })

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = bcrypt.hash(this.password, 10)
    next()
})
UserSchema.methods.ispasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKE_EXPIRY
        }
    )
}
UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,

    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIREY
        }
    )
}
export const User = mongoose.model("User", UserSchema)    