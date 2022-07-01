import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>TriviaQ | Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flex: 1,
        }}
      >
        <button onClick={() => router.push(`/play`)}>Start Quiz</button>
      </div>
    </>
  );
}