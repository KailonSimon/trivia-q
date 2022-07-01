import Head from "next/head";
import Game from "../components/Game";
import { useRouter } from "next/router";

export default function Play() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>TriviaQ | Play</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Game numberOfQuestions={10} />
    </>
  );
}
