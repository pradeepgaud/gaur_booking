// import uploadOnCloudinary from "../config/cloudinary.js";
// import Listing from './../model/ListingModel.js';
// import User from './../model/UserModel.js';




// export const addListing = async (req, res) => {
//     try {
//         let host = req.userId;
//         let { title, description, rent, city, landMark, category } = req.body
//         let image1 = await uploadOnCloudinary(req.files.image1[0].path)
//         let image2 = await uploadOnCloudinary(req.files.image2[0].path)
//         let image3 = await uploadOnCloudinary(req.files.image3[0].path)


//         let listing = await Listing.create({
//             title, description, rent, city, landMark, category, image1, image2, image3, host
//         })

//         let user = await User.findByIdAndUpdate(host, { $push: { listing: listing._Id } }, { new: true })
//         if (!user) {
//             res.status(404).json({ message: "user is not found " })
//         }
//         res.status(200).json(listing)
//     } catch (error) {
//         res.status(500).json({ message: `AddListing error ${error}` })
//     }
// }





// export const getListing = async (req, res) => {
//     try {
//         let listing = await Listing.find().sort({ createdAt: -1 });
//         res.status(200).json(listing)
//     } catch (error) {
//         res.status(500).json({ message: `getListing error ${error}` })
//     }
// }


import uploadOnCloudinary from "../config/cloudinary.js";
import Listing from './../model/ListingModel.js';
import User from './../model/UserModel.js';

export const addListing = async (req, res) => {
    try {
        let host = req.userId;
        let { title, description, rent, city, landMark, category } = req.body;

        // Upload images
        let image1 = await uploadOnCloudinary(req.files.image1[0].path);
        let image2 = await uploadOnCloudinary(req.files.image2[0].path);
        let image3 = await uploadOnCloudinary(req.files.image3[0].path);

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
            { $push: { listing: listing._id } }, // ✅ Fixed _id
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(listing);
    } catch (error) {
        return res.status(500).json({ message: `AddListing error: ${error.message}` });
    }
};

export const getListing = async (req, res) => {
    try {
        let listing = await Listing.find().sort({ createdAt: -1 }); // ✅ Correct createdAt
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

    return res.status(200).json(listing);
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// export const updateListing = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, rent, city, landMark, category } = req.body;

//     // Get uploaded files from Multer
//     const image1 = req.files?.image1?.[0] 
//       ? await uploadOnCloudinary(req.files.image1[0].path) 
//       : undefined;
    
//     const image2 = req.files?.image2?.[0]
//       ? await uploadOnCloudinary(req.files.image2[0].path)
//       : undefined;
    
//     const image3 = req.files?.image3?.[0]
//       ? await uploadOnCloudinary(req.files.image3[0].path)
//       : undefined;

//     const updateData = {
//       title,
//       description,
//       rent,
//       city,
//       landMark,
//       category,
//       ...(image1 && { image1 }),
//       ...(image2 && { image2 }),
//       ...(image3 && { image3 })
//     };

//     const listing = await Listing.findByIdAndUpdate(id, updateData, { new: true });

//     return res.status(200).json(listing);
//   } catch (error) {
//     console.error("Update error:", error);
//     return res.status(500).json({ message: "Update failed", error: error.message });
//   }
// };