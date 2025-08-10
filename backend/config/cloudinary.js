// import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs'



// const uploadOnCloudinary = async (filepath) => {

//     // Configuration
//     cloudinary.config({
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
//     });

//     try {
//         if(!filepath){
//             return null
//         }
//          const uploadResult = await cloudinary.uploader
//        .upload(filepath)
//        fs.unlinkSync(filepath)
//        return uploadResult.secure_url
//     } catch (error) {
//         fs.unlinkSync(filepath)
//         console.log(error)
//     }

// }

// export default uploadOnCloudinary


import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadOnCloudinary = async (filepath) => {
    console.log("Uploading file from path:", filepath); // debug log

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        if (!filepath) {
            console.error("No file path received!");
            return null;
        }

        const uploadResult = await cloudinary.uploader.upload(filepath);
        console.log("Cloudinary upload result:", uploadResult.secure_url);

        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
            console.log("File deleted from local:", filepath);
        } else {
            console.warn("File not found at unlink time:", filepath);
        }

        return uploadResult.secure_url;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }
    }
};

export default uploadOnCloudinary;
