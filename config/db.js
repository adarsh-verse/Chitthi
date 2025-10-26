import mongoose from "mongoose";

const connect_db = async ()=>{
    try{
       await mongoose.connect(process.env.MONGODB_URL)
       console.log("db connected");

    }catch (err){
      console.error(err)
       console.log(`DB Error: ${err.message}`);
    }
}
export default connect_db