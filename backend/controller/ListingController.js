import uploadOnCloudinary from "../config/cloudinary.js";
import Listing from './../model/ListingModel.js';
import User from './../model/UserModel.js'; 




export const addListing = async (req, res) => {
    try {
        let host = req.userId;
        let { title, description, rent, city, landMark, category } = req.body
        let image1 = await uploadOnCloudinary(req.files.image1[0].path)
        let image2 = await uploadOnCloudinary(req.files.image2[0].path)
        let image3 = await uploadOnCloudinary(req.files.image3[0].path)


        let listing = await Listing.create({
            title, description, rent, city, landMark, category, image1, image2, image3, host
        })

        let user = await User.findByIdAndUpdate(host, { $push: { listing: listing.Id } }, { new: true })
        if (!user) {
            res.status(404).json({ message: "user is not found " })
        }
        res.status(200).json(listing)
    } catch (error) {
        res.status(500).json({ message: `AddListing error ${error}` })
    }
}





export const getListing = async (req, res) =>{
    try {
        let listing = await Listing.find().sort({createAd:-1})
        res.status(200).json(listing)
    } catch (error) {
        res.status(500).json({message:`getListing error ${error}`})
    }
}