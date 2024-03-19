import { connectToDatabase } from "@/utils/connectDB";
export default async function handler(req, res) {
    let {userID,model}=req.query;
    
    
    // console.log(model,name);
    const { body, method } = req;
    if(method === 'GET' && model==1){
        try{
            // console.log(user);
            const client=await connectToDatabase();
            const db=client.db("kong_face");
            
            let user = await db.collection("users").findOne({ userID });
            // console.log(user);
            if(!user){
                throw new Error("Couldn't find user");
            }
            const items=await db.collection("models").find({author:userID}).toArray();
            res.status(200).json({items,user});

        }catch(err){
            res.status(400).json({items:[], error: err.message });
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