import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(403).json({ error: "Invalid request method" });
    return;
  }

  const users = await prisma.user.findMany({
    select: {
      name: true,
      image: true,
      questionsAnswered: true,
    },
  });

  if (!users) {
    res.status(404).json({ error: "No user data found" });
    return;
  }
  res.status(200).json({ users });
}
