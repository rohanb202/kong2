import { connectToDatabase } from "@/utils/connectDB";
export default async function handler(req, res) {
    let {userID,model}=req.query;
    
    
    // console.log(model,name);
    const { body, method } = req;
   
    if (method === 'GET' && model === '1') {
        try {
            const client = await connectToDatabase();
            const db = client.db("kong_face");
    
            // Find the user
            const user = await db.collection("users").findOne({ userID });
            if (!user) {
                throw new Error("Couldn't find user");
            }
    
            // Fetch models authored by the user along with their likes
            const items = await db.collection("models").aggregate([
                {
                    $match: { author: userID }
                },
                {
                    $addFields: {
                        modelIdString: { $toString: "$_id" } // Convert _id to string
                    }
                },
                {
                    $lookup: {
                        from: "likes",
                        localField: "modelIdString",
                        foreignField: "modelId",
                        as: "likes"
                    }
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        author: 1,
                        tags: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        downloads: 1,
                        // mark_down: 1,
                        // Count total likes for each model
                        likes: { $size: "$likes" }
                    }
                }
            ]).toArray();
    
            res.status(200).json({ items, user });
        } catch (err) {
            res.status(400).json({ items: [], error: err.message });
        }
    }
    else if(method==="GET" && userID ){
        try{
            const client=await connectToDatabase();
            const db=client.db("kong_face");            
            const items=await db.collection("users").find({userID}).toArray();
            // const count=await db.collection("models").countDocuments();
            res.status(200).json(items);
        }catch(err){
            res.status(400).json({ error: err.message });
        }
    }
    
    else if(method==="GET"){
        try{
            const client=await connectToDatabase();
            const db=client.db("kong_face");
            const items=await db.collection("users").find({}).toArray();
            // const count=await db.collection("models").countDocuments();
            res.status(200).json(items);
        }catch(err){
            res.status(400).json({ error: err.message });
        }
    }
}