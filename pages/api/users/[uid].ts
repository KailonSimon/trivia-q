import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid } = req.query as { uid: string };

  const user = await prisma.user.findUnique({
    where: {
      id: uid,
    },
    select: {
      name: true,
      image: true,
      questionsAnswered: true,
    },
  });

  switch (req.method) {
    case "GET":
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json({ user });
      break;
  }
}
