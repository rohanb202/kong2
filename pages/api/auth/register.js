import { connectToDatabase } from "@/utils/connectDB";
import generateToken from "@/utils/generateToken";
import bcrypt from "bcryptjs";

export default async function headers(req, res) {
  const { method, body } = req;
  const client = await connectToDatabase();
  const db = await client.db("kong_face");
  if (method === "POST") {
    try {
      const { name, email, password, userID } = body;
      let user = await db.collection("users").findOne({ email });
      if (user) {
        throw new Error("User already exists");
      }
      user = await db.collection("users").findOne({ userID });
      if (user) {
        throw new Error("UserID already exists");
      }
      const createUser = await db.collection("users").insertOne({
        name,
        email,
        userID,
        password: await bcrypt.hash(password, 12),
        isAdmin: false,
      });
      res.status(200).json({
        _id: createUser.insertedId,
        name,
        email,
        userID,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
