import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../lib/prisma";
import { User } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  switch (req.method) {
    case "GET":
      const answers = await prisma.question.findMany({});
      res.status(200).json({ answers });
      break;
    case "POST":
      const { question, answer, uid, updateData } = req.body;

      if (session && session.user.id !== uid) {
        res.status(401).json({ error: "Mismatched credentials" });
        return;
      } else if (!question) {
        res.status(400).json({ error: "Missing question" });
      } else if (!answer) {
        res.status(400).json({ error: "Missing answer" });
      }

      try {
        const result = await prisma.question.create({
          data: {
            question: question.question,
            type: question.type,
            difficulty: question.difficulty,
            category: question.category,
            incorrectAnswers: question.incorrect_answers,
            correctAnswer: question.correct_answer,
            selectedAnswer: answer,
            ...(uid && { userId: uid }),
          },
        });
        let updateUser: User;
        if (uid && updateData) {
          updateUser = await prisma.user.update({
            where: {
              id: uid,
            },
            data: updateData,
          });
        }
        res.status(201).json({ result, ...(updateUser && { ...updateUser }) });
      } catch (error) {
        console.log(error);
        res.status(404).json({ error: "Error occurred" });
      }
      break;
  }
}
