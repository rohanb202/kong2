import { connectToDatabase } from "@/utils/connectDB";
import { protect } from "@/middleware/authMiddleware";
 async function handler(req, res) {
    const { method, body } = req;
    if (method === "POST") {
        try {
          const { title, author, mark_down,tags } = body;
          const task = {
            title,
            author,            
            tags,            
            createdAt:new Date().toISOString(),
            updatedAt:new Date().toISOString(),                        
            downloads:0,
            mark_down,
            
          };
          const client=await connectToDatabase();
            const db=client.db("kong_face");
          console.log(task);
          const post = await db
            .collection("models")
            .insertOne(task);
          return res.status(201).json(post);
        } catch (e) {
          return res.status(500).json({ message: e.message });
        }
      }
}
export default protect(handler);
