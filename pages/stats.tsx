import { unstable_getServerSession } from "next-auth";
import { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";

export default function Stats({ answers }) {
  const stats = useState([]);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        maxWidth: 600,
        display: "flex",
        alignItems: "center",
        flex: 1,
        flexDirection: "column",
        fontWeight: 700,
      }}
    ></div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const data = await prisma.question.findMany({});

  return {
    props: {
      data,
    },
  };
};
