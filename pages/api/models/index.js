import { connectToDatabase } from "@/utils/connectDB";
export default async function handler(req, res) {
    let page=req.query.page;
    let sort=req.query.sort;
    let search=req.query.search;
    let tag=req.query.tag;
    let doc=req.query.doc;   
    
    page=(!page||page<1)?1:page;
    sort=(!sort|| sort=="trending")?"likes":sort;    
    const sortOrder = 1;
    let perPage=1;
    
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
            const items=await db.collection("models").find(query).sort({[sort]:sortOrder}).skip(perPage*(page-1)).limit(perPage).toArray();
            const count=await db.collection("models").countDocuments(query);
            res.status(200).json({items,count});
        }catch(err){
            res.status(400).json({ error: err.message });
        }
    }
    
    
}