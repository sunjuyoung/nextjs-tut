import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      console.log(req.method);
      return res.status(405).end();
    }

    const { email, name, password } = req.body;

    const existUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existUser) {
      return res.status(422).json({ error: "이미 사용중인 이메일 입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
