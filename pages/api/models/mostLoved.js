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
            const model=await db.collection("models").find({}).sort({[sort]:sortOrder}).limit(10).toArray();
            
            res.status(200).json(model);
        }catch(err){
            res.status(400).json({ error: err.message });
        }
    }
}