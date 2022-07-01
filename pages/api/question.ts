import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const uid = session.user.id;
  const { question, answer } = req.body;
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
        userId: uid,
      },
    });
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occurred" });
  }
}
