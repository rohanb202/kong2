import { connectToDatabase } from "@/utils/connectDB";
export default async function handler(req, res) {
    let page=req.query.page;
    let sort=req.query.sort;
    let search=req.query.search;
    let tag=req.query.tag;
    let doc=req.query.doc;   
    
    page=(!page||page<1)?1:page;
    sort=(!sort|| sort=="trending")?"viewCount":sort;  
    // console.log(sort);  
    const sortOrder = -1;
    let perPage=20;
    
    let query={};
    const { body, method } = req;
    if(method==="GET" && doc=="all"){
        // console.log(search);
        try{
            const client=await connectToDatabase();
            const db=client.db("kong_face");
            if(search){
                query.$or=[
                    { author: { $regex: `.*${search}.*`, $options: 'i' } }, // Case-insensitive regex search for partial match on author
                    { title: { $regex: `.*${search}.*`, $options: 'i' } }   // Case-insensitive regex search for partial match on title
                ]
            }
            if(tag){
                query.tags={ $regex: new RegExp(tag, 'i') };
            }
              
              // Execute the query
            // const items = await db.collection("models").find(query).toArray();
            const items=await db.collection("models").find(query).toArray();
            const count=await db.collection("models").countDocuments(query);
            res.status(200).json({items,count});
        }catch(err){
            res.status(400).json({ error: err.message });
        }
    }
    
    else if(method==="GET"){
        // console.log(search);
        try{
            // const client=await connectToDatabase();
            // const db=client.db("kong_face");
            // if(search){
            //     query.$or=[
            //         { author: { $regex: `.*${search}.*`, $options: 'i' } }, // Case-insensitive regex search for partial match on author
            //         { title: { $regex: `.*${search}.*`, $options: 'i' } }   // Case-insensitive regex search for partial match on title
            //     ]
            // }
            // if(tag){
            //     query.tags={ $regex: new RegExp(tag, 'i') };
            // }
              
            //   // Execute the query
            // // const items = await db.collection("models").find(query).toArray();
            // const items=await db.collection("models").find(query).sort({[sort]:sortOrder}).skip(perPage*(page-1)).limit(perPage).toArray();
            // const count=await db.collection("models").countDocuments(query);
            // res.status(200).json({items,count});
            const client = await connectToDatabase();
            const db = client.db("kong_face");
            // const PAGE_SIZE = 20; // Number of models per page
            // const pageNumber = page || 1; // Current page number (1-indexed), default to 1 if not provided
            // const skipCount = (pageNumber - 1) * PAGE_SIZE;

            const query = {};

            if (search) {
                query.$or = [
                    { author: { $regex: `.*${search}.*`, $options: 'i' } }, // Case-insensitive regex search for partial match on author
                    { title: { $regex: `.*${search}.*`, $options: 'i' } }   // Case-insensitive regex search for partial match on title
                ];
            }

            if (tag) {
                query.tags = { $regex: new RegExp(tag, 'i') };
            }

            // Execute the query with pagination and sorting
            const items = await db.collection("models").aggregate([
                {
                    $match: query
                },
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
                        // mark_down: 1,
                        viewCount: 1,
                        // Count total likes for each model
                        likes: { $size: "$likes" }
                    }
                },
                {
                    $sort: { [sort]: sortOrder }
                },
                {
                    $skip: perPage*(page-1)
                },
                {
                    $limit: perPage
                }
            ]).toArray();

            // Get total count of documents matching the query
            const count = await db.collection("models").countDocuments(query);

            res.status(200).json({ items, count });
        }catch(err){
            res.status(400).json({ error: err.message });
        }
    }
    
    
}