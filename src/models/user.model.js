import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"


const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String, //cloudinary url
        required: true,
    },
    coverimage: {
        type: String, //cloudinary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "video"
        }
    ],
    password: {
        type: String,
        required: [true, "password is required"]
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true })


//                  this is bcrypt method to encrypt password

//.pre is hook of mongoose and pre is middleware
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    //bcrypt will save password in encrpted way
    this.password = await bcrypt.hash(this.password, 10)
    next()
})


// Schema also give method and we can create our own method and that will go through fn 
userSchema.method.isPasswordCheck = async function (password) {
    // bcrypt.compare will compare user password and this.password (which is encrpted password)
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.genrateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email
    }, process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.genrateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model('User', userSchema)