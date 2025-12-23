import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiErr.js";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/Cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
    // res.status(200).json({
    //     message: "server is running"
    // })

    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    const { email, fullname, username, password } = req.body
    console.log("email: ", email);
    if (
        [email, fullname, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Fullname is required")
    }


    // this or opt is use for or conditions and findone will find the user
    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "This use is already Existed")
    }

    //req have all the data, we have given middleware to route so will also have some middleware access like files
    // multer will give the path of image

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    // uploading on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar required")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        username,
        password,
    })

    const createuser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createuser) {
        throw new ApiError(500, "Error while creating user")
    }

    return res.status(200, (
        new ApiResponse(
            200,
            createuser,
            "user registered successfully"

        )
    ))

})

export default registerUser