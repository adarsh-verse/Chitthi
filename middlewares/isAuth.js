import  jwt from "jsonwebtoken";

const isAuth = async (req , res , next)=>{
    try{
        let token = req.cookies.token;
        if(!token){
            return res.status(400).json({message:"token is not found"});
        }

        // verifying the token 
        let decoded = jwt.verify(token , process.env.JWT_SECRET)
        req.userId = decoded.userId
        next()

    } catch (err){
        return res.status(401).json({ message: "Invalid or Expired token" });
    }
}
export default isAuth