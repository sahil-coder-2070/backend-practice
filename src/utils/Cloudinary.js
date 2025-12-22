import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import { fileURLToPath } from 'url';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // upload file on cloudinary
        const uploadResult = await cloudinary.uploader
            .upload(
                localFilePath, {
                resource_type: "auto"
            }
            )

        // file has been uploaded
        console.log("File is uploaded on cloudinary");
        console.log(uploadResult.url);

        return uploadResult;

    } catch (error) {
        fs.unlinkSync(fileURLToPath) //remove the locally saved temporary files as the upload operation failed
        return null;
        console.log(error);
    }
}
export default uploadOnCloudinary