import { connectToDatabase } from "@/utils/connectDB";
export default async function handler(req, res) {
    const {
        method,        
        body,
        query
      } = req;
    
    let sortOrder=-1;
    const sort=query.sort?query.sort:"likes";
    // console.log(sort);
    if(method==="GET"){
        try{
            const client=await connectToDatabase();
            const db=client.db("kong_face");
            // const items=await db.collection("comments").find({}).skip(perPage*(page-1)).limit(perPage).toArray();
            const items = await db.collection("models").aggregate([
               
                {
                    $lookup: {
                        from: "likes",
                        let: { modelIdString: { $toString: "$_id" } }, // Convert _id to string
                        pipeline: [
                            { $match: { $expr: { $eq: ["$$modelIdString", "$modelId"] } } }
                        ],
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
                        mark_down: 1,
                        viewCount: 1,
                        // Count total likes for each model
                        likes: { $size: "$likes" }
                    }
                },
                {
                    $sort: { [sort]: sortOrder }
                },                
                {
                    $limit: 10
                }
            ]).toArray();
            // const model=await db.collection("models").find({}).sort({[sort]:sortOrder}).limit(10).toArray();
            
            // res.status(200).json(model);
            res.status(200).json(items);

        }catch(err){
            res.status(400).json({ error: err.message });
        }
    }
}