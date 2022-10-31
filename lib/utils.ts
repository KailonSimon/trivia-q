import { AnswerRequestBody } from "../types/types";

const sendAnswerRequest = (body: AnswerRequestBody) => {
  return fetch("/api/answers", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
};

const getXPFromLevel = (level: number) => {
  return Math.floor(Math.pow(level / 1.1, 2));
};

const getLevelFromXP = (XP: number) => {
  return 1.1 * Math.sqrt(XP);
};

const getXPNeededToLevel = (XP: number) => {
  const nextLevel = Math.floor(getLevelFromXP(XP) + 1);
  return getXPFromLevel(nextLevel) - XP;
};

const getLevelPercentage = (XP) => {
  const currentLevel = Math.floor(getLevelFromXP(XP));
  const nextLevel = currentLevel + 1;
  return Math.floor(
    ((XP - getXPFromLevel(currentLevel)) /
      (getXPFromLevel(nextLevel) - getXPFromLevel(currentLevel))) *
      100
  );
};

export {
  sendAnswerRequest,
  getXPFromLevel,
  getLevelFromXP,
  getXPNeededToLevel,
  getLevelPercentage,
};
