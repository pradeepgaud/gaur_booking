import jwt from 'jsonwebtoken'

const getToken = async (userId) => {
    try {
        let token = await jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return token;
        console.log('Token:', localStorage.getItem('token')); // or sessionStorage
    } catch (error) {
        console.log("token error", error);
    }
}

export default getToken;
