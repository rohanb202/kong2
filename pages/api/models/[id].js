import { connectToDatabase } from "@/utils/connectDB";
import {ObjectId} from "mongodb";
export default async function handler(req, res) {
    const {
        method,
        query: { id },
        body,
      } = req;
    const downloadCnt=req.body.downloadCnt;
    const viewCount=req.body.viewCount;
    
    if(method==="PUT" && downloadCnt){
        try {
            const client = await connectToDatabase();
            const db = client.db("kong_face");
        
            const result = await db.collection("models").updateOne(
                { _id: { $eq: new ObjectId(id) } },
                { $set: { downloads: downloadCnt } } 
            );
        
            if (result.modifiedCount === 1) {
                
                res.status(200).json({ message: "Downloads count updated successfully" ,...result});
            } else {
                
                res.status(404).json({ error: "Model not found" });
            }
        } catch (error) {
            
            console.error("Failed to update downloads count:", error);
            res.status(500).json({ error: "Failed to update downloads count" });
        }
    }
    if (req.method === 'PUT' && viewCount) {
        try {
       
          const client = await connectToDatabase();
          const db = client.db('kong_face');
          const collection = db.collection('models');
    
          
          const result = await collection.updateOne(
            { _id: { $eq: new ObjectId(id) } },
            { $inc: { viewCount: 1 } } // Increment viewCount by 1
          );
    
          if (result.modifiedCount === 1) {
            res.status(200).json({ message: 'View count updated successfully' });
          } else {
            res.status(404).json({ error: 'Model not found' });
          }
        } catch (error) {
          console.error('Error updating view count:', error);
          res.status(500).json({ error: 'Failed to update view count' });
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