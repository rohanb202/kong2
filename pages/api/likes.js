import { connectToDatabase } from "@/utils/connectDB";

export default async function handler(req, res) {
    
    // Extract userId and modelId from the request body
    let { userId, modelId } = req.query;
 
 
    const client = await connectToDatabase();
    const db = client.db("kong_face");

    const likesCollection = db.collection("likes");
    if (req.method === "GET") {
        try {
            
            if (userId) {
                const existingLike = await likesCollection.findOne({ userId, modelId });
                const liked = !!existingLike;
                const totalLikesCount = await likesCollection.countDocuments({ modelId });
                return res.json({ liked, totalLikesCount });
            } else {
                
                const totalLikesCount = await likesCollection.countDocuments({ modelId });
                return res.json({ totalLikesCount });
            }
        } catch (error) {
            return res.status(500).json({ error: "Failed to retrieve likes" });
        }
    }
   
    else if (req.method === "POST") {
        
        if (!req.body || !req.body.userId || !req.body.modelId) {
            return res.status(400).json({ error: "User ID and Model ID are required" });
        }
        userId=req.body.userId,modelId=req.body.modelId;
        try {
            // Check if the user already liked this model
            const existingLike = await likesCollection.findOne({ userId, modelId });
            if (existingLike) {
                return res.status(400).json({ error: "User already liked this model" });
            }

            // Insert the new like
            const now = new Date();
            const likeDocument = {
                userId,
                modelId,
                generated_At: now
            };
            await likesCollection.insertOne(likeDocument);
            return res.status(201).json({ message: "Like added successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Failed to add like" });
        }
    } else if (req.method === "DELETE") {
        // Delete the like
        if (!userId || !modelId) {
            return res.status(400).json({ error: "User ID and Model ID are required" });
        }
        try {
            // Find and delete the like
            const deleteResult = await likesCollection.deleteOne({ userId, modelId });
            if (deleteResult.deletedCount === 0) {
                return res.status(404).json({ error: "Like not found" });
            }
            return res.json({ message: "Like deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Failed to delete like" });
        }
    } else {
        // Method not allowed
        return res.status(405).json({ error: "Method not allowed" });
    }
}
