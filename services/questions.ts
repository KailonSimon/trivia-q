import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Question } from "../types/question";

type QuestionsResponse = {
  response_code: number;
  results: Question[];
};

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://opentdb.com/" }),
  tagTypes: ["Questions"],
  endpoints: (builder) => ({
    getNumberOfQuestions: builder.query<QuestionsResponse, number>({
      query: (number = 10) => `api.php?amount=${number}`,
      providesTags: ["Questions"],
    }),
  }),
});

export const { useGetNumberOfQuestionsQuery } = questionApi;
