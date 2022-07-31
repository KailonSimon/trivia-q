import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Question } from "../types/types";
import { REHYDRATE } from "redux-persist";

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
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
});

export const { useGetNumberOfQuestionsQuery } = questionApi;
