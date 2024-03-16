import { connectToDatabase } from "@/utils/connectDB";
export default async function handler(req, res) {
    let page=req.query.page;
    page=(!page||page<1)?1:page;
    let perPage=1;
    
    const { body, method } = req;
    if(method==="GET"){
        try{
            const client=await connectToDatabase();
            const db=client.db("kong_face");
            const items=await db.collection("models").find({}).skip(perPage*(page-1)).limit(perPage).toArray();
            const count=await db.collection("models").countDocuments();
            res.status(200).json({items,count});
        }catch(err){
            res.status(400).json({ error: err.message });
        }
    }
}