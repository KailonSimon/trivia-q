import { AnswerRequestBody } from "../types/types";

export const sendAnswerRequest = (body: AnswerRequestBody) => {
  return fetch("/api/answers", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
};
