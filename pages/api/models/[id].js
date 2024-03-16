import { connectToDatabase } from "@/utils/connectDB";
import {ObjectId} from "mongodb";
export default async function handler(req, res) {
    const {
        method,
        query: { id },
        body,
      } = req;
    
    
    if(method==="GET"){
        try{
            const client=await connectToDatabase();
            const db=client.db("kong_face");
            // const items=await db.collection("comments").find({}).skip(perPage*(page-1)).limit(perPage).toArray();
            const model=await db.collection("models").findOne({ _id: { $eq: new ObjectId(id) } })
            
            res.status(200).json(model);
        }catch(err){
            res.status(400).json({ error: err.message });
        }
    }
}