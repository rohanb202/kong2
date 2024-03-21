import { connectToDatabase } from "@/utils/connectDB";
import generateToken from "@/utils/generateToken";
import bcrypt from "bcryptjs";

export default async function headers(req, res) {
  const { method, body } = req;
  const client = await connectToDatabase();
  const db = await client.db("kong_face");
  if (method === "POST") {
    try {
      const { email, password } = body;
      const user = await db.collection("users").findOne({ email });
      if (!user) {
        res.status(400);
        throw new Error("User does not exist");
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        res.status(401);
        throw new Error("Invalid password");
      }

      const token = generateToken(user._id);
      res.status(200).json({ ...user, token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
