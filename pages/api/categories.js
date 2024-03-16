import { connectToDatabase } from "@/utils/connectDB";
export default async function handler(req, res) {
    let {tag}=req.query;

    if(!tag){
        tag="tasks";
    }
    // console.log(tag);
    const { body, method } = req;
    if(method==="GET"){
        try{
            const client=await connectToDatabase();
            const db=client.db("kong_face");
            const items=await db.collection("categories").find({tag:tag}).toArray();
            // const count=await db.collection("models").countDocuments();
            res.status(200).json(items);
        }catch(err){
            res.status(400).json({ error: err.message });
        }
    }
}