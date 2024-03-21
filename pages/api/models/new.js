import { connectToDatabase } from "@/utils/connectDB";
import { protect } from "@/middleware/authMiddleware";
import { ObjectId } from "mongodb";
async function handler(req, res) {
  const { method, body } = req;
  if (method === "POST") {
    try {
      const { title, author, mark_down, tags } = body;
      const task = {
        title,
        author,
        tags,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        downloads: 0,
        mark_down,
        viewCount: 0,
      };
      const client = await connectToDatabase();
      const db = client.db("kong_face");
      // console.log(task);
      const post = await db.collection("models").insertOne(task);
      return res.status(201).json(post);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }
  if (method === "PUT") {
    const { user } = req;
    const { modelId, mark_down } = req.body;
    try {
      const client = await connectToDatabase();
      const db = client.db("kong_face");
      // Convert the modelId string to ObjectId
      const objectIdModelId = new ObjectId(modelId);

      // Retrieve the model from the database
      const model = await db
        .collection("models")
        .findOne({ _id: objectIdModelId });

      // Check if the author of the model matches the current user
      // console.log(model, user.userID);
      if (model && model.author === user.userID) {
        // Assuming user.userId is the ID of the current user
        // Update the markdown of the model
        await db
          .collection("models")
          .updateOne({ _id: objectIdModelId }, { $set: { mark_down } });

        return res
          .status(200)
          .json({ message: "Markdown updated successfully" });
      } else {
        return res
          .status(403)
          .json({ message: "You are not authorized to edit this model" });
      }
    } catch (error) {
      console.error("Error editing markdown:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
export default protect(handler);
