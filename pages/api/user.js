import { connectToDatabase } from "@/utils/connectDB";
export default async function handler(req, res) {
    let {name}=req.query;

    
    // console.log(tag);
    const { body, method } = req;
    if(method==="GET" && name ){
        try{
            const client=await connectToDatabase();
            const db=client.db("kong_face");
            const items=await db.collection("users").find({name:name}).toArray();
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