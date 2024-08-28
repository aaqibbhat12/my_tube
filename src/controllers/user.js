import asynchandler from "../utils/asynchandler.js";
import ApiError from "../utils/ApiError.js"
import { User } from "../models/User.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import ApiResponse from "../utils/ApiResponse.js";




const RegisterUser = asynchandler(async (req, res) => {
    const { username, email, password } = req.body
    if (username == "") {
        throw new ApiError(400, "username is required")
    }
    if (email == "") {
        throw new ApiError(400, "email is required")
    }
    if (password == "") {
        throw new ApiError(400, "password is required")
    }

    const exitedUser = await User.findOne({ email })
    if (exitedUser) {
        throw new ApiError(409, "User with this email already exists")
    }

    const avatarLocalPath = req.file?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar file is required ")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if (!avatar) {
        throw new ApiError(400, "avatar file is required")
    }

    const user = await User.create(
        {
            username,
            email,
            password,
            avatar: avatar.url,

        }
    )
    const createduser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createduser) {
        throw new ApiError(500, "something went wrong while registering the User")
    }
    return res.status(201).json(
        new ApiResponse(201, createduser, "User registered Successfully ")
    )


})


export default RegisterUser