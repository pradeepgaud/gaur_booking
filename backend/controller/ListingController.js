import uploadOnCloudinary from "../config/cloudinary.js";
import Listing from '../model/ListingModel.js';
import User from '../model/UserModel.js';

export const addListing = async (req, res) => {
    try {
        let host = req.userId;
        let { title, description, rent, city, landMark, category } = req.body;

        // Better validation for required files
        if (!req.files || !req.files.image1 || !req.files.image2 || !req.files.image3) {
            return res.status(400).json({
                message: "All three images (image1, image2, image3) are required"
            });
        }

        // Additional validation for file arrays
        if (!req.files.image1[0] || !req.files.image2[0] || !req.files.image3[0]) {
            return res.status(400).json({
                message: "Invalid image files provided"
            });
        }

        // Upload images with error handling
        let image1, image2, image3;

        try {
            image1 = await uploadOnCloudinary(req.files.image1[0].path);
            image2 = await uploadOnCloudinary(req.files.image2[0].path);
            image3 = await uploadOnCloudinary(req.files.image3[0].path);
        } catch (uploadError) {
            return res.status(500).json({
                message: "Image upload failed",
                error: uploadError.message
            });
        }

        // Create new listing
        let listing = await Listing.create({
            title,
            description,
            rent,
            city,
            landMark,
            category,
            image1,
            image2,
            image3,
            host
        });

        // Push listing ID to user
        let user = await User.findByIdAndUpdate(
            host,
            { $push: { listing: listing._id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(listing);
    } catch (error) {
        console.error("AddListing Error:", error);
        return res.status(500).json({
            message: `AddListing error: ${error.message}`,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

export const getListing = async (req, res) => {
    try {
        let listing = await Listing.find().sort({ createdAt: -1 });
        return res.status(200).json(listing);
    } catch (error) {
        return res.status(500).json({ message: `getListing error: ${error.message}` });
    }
};

export const findListing = async (req, res) => {
    try {
        let { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Listing ID is required" });
        }

        let listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        return res.status(200).json(listing);
    } catch (error) {
        console.error("findListing error:", error);
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

export const updateListing = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, rent, city, landMark, category } = req.body;

        // Get uploaded files from Multer
        const image1 = req.files?.image1?.[0]
            ? await uploadOnCloudinary(req.files.image1[0].path)
            : undefined;

        const image2 = req.files?.image2?.[0]
            ? await uploadOnCloudinary(req.files.image2[0].path)
            : undefined;

        const image3 = req.files?.image3?.[0]
            ? await uploadOnCloudinary(req.files.image3[0].path)
            : undefined;

        const updateData = {
            title,
            description,
            rent,
            city,
            landMark,
            category,
            ...(image1 && { image1 }),
            ...(image2 && { image2 }),
            ...(image3 && { image3 })
        };

        const listing = await Listing.findByIdAndUpdate(id, updateData, { new: true });

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        return res.status(200).json(listing);
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ message: "Update failed", error: error.message });
    }
};

export const deleteListing = async (req, res) => {
    try {
        let { id } = req.params;

        let listing = await Listing.findByIdAndDelete(id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        let user = await User.findByIdAndUpdate(
            listing.host,
            { $pull: { listing: listing._id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (error) {
        console.error("Delete error:", error);
        return res.status(500).json({ message: `DeleteListing Error: ${error.message}` });
    }
};




export const search = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const listing = await Listing.find({
            $or: [
                { landMark: { $regex: query, $options: 'i' } },
                { city: { $regex: query, $options: 'i' } },
                { title: { $regex: query, $options: 'i' } },

            ],
        })
        return res.status(200).json(listing);
    } catch (error) {
        console.log('Searching error', error)
        return res.status(500).json({ message: 'internal server error ', error })
    }
}