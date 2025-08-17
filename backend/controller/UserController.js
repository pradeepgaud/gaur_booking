import User from './../model/UserModel.js';

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password").populate("listing","title image1 image2 image3 description rent category city landMark isBooked host ratings")
        .populate("booking","title image1 image2 image3 description rent category city landMark isBooked host ratings");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `getCurrentUser error: ${error.message}` });
    }
};
