import User from "../models/user_model.js";
import uploadOnCloudinary from "../config/cloudinary.js";

export const getCurrentUser = async (req, res)=>{
    try{
        let userId = req.userId;
        let user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({message: "user not found"});
        }
        return res.status(200).json(user)
    } catch(err){

        return res.status(500).json({ message: `Something went wrong ${err}` });
    }
}

export const editProfile =  async(req, res)=>{
    try{
        let {name} = req.body
        let profile_Img;
        if(req.file){
            profile_Img = await uploadOnCloudinary(req.file.path)
        }
        let user = await User.findByIdAndUpdate(req.userId,
            {name,profile_Img},
            {new:true}
        ).select("-password")

        if(!user){
            return res.status(400).json({message: "user not found "})
        }
        return res.status(200).json(user)


    } catch (err) {
         return res.status(500).json({message: `profile error : ${err}`})
    }
}

export const getAllUsers = async (req, res) => {
    try {
        
        const users = await User.find({
            _id:{$ne:req.userId},
        }).select("-password");

        // const users = usersData.map((data) => data._id)

        return res.status(200).json(users);
    }
    catch(e) {
        console.error(e.message);
    }
};