import { connectToDatabase } from "@/utils/connectDB";
import {ObjectId} from "mongodb";
export default async function handler(req, res) {
    const {
        method,
        query: { id },
        body,
      } = req;
    const downloadCnt=req.body.downloadCnt;
    console.log(downloadCnt,id);
    if(method==="PUT" && downloadCnt){
        try {
            const client = await connectToDatabase();
            const db = client.db("kong_face");
        
            // Assuming you have the model ID and the desired download count available
             // Assuming you're passing the model ID and download count in the request body
        
            // Update the downloads count for the specified model ID
            const result = await db.collection("models").updateOne(
                { _id: { $eq: new ObjectId(id) } },
                { $set: { downloads: downloadCnt } } // Set the `downloads` field to the provided value
            );
        
            if (result.modifiedCount === 1) {
                // Successfully updated the downloads count
                res.status(200).json({ message: "Downloads count updated successfully" ,...result});
            } else {
                // No document matched the specified model ID
                res.status(404).json({ error: "Model not found" });
            }
        } catch (error) {
            // Handle any errors that occur during the update operation
            console.error("Failed to update downloads count:", error);
            res.status(500).json({ error: "Failed to update downloads count" });
        }
    }
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