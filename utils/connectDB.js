import { MongoClient } from "mongodb";
const MONGODB_URI=process.env.MONGODB_URI;
// console.log(MONGODB_URI);
let client=null;
export async function connectToDatabase(){
    if(client){
        return client;
    }
    if(!MONGODB_URI){
        console.log("mongodb uri is required")
    }
    try{
        client = await MongoClient.connect(MONGODB_URI);
        console.log("connected");
        return client;
    }catch(error){
        console.error("error connecting to database", error);
    }
}