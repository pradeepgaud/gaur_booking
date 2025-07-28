import jwt from 'jsonwebtoken'


const getToken  = async (userId) =>{
    try {
        let token = await jwt.sign({userId},process.env.JWT_SECRET,
            {expiresIn:"7d"})
    } catch (error) {
        console.log("token error")
    }
}

export default getToken