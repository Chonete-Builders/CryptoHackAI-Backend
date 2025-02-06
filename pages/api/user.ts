import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mondob";
import User from "../../models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === "POST") {
    const { name, email } = req.body;
    try {
      const user = new User({ name, email });
      await user.save();
      return res.status(201).json({ message: "User created", user });
    } catch (error) {
      return res.status(400).json({ error: "Error creating user" });
    }
  } else if (req.method === "GET") {
    const users = await User.find();
    return res.status(200).json(users);
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
