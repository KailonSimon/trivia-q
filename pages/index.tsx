import Head from "next/head";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { ThreeDots } from "react-loader-spinner";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <ThreeDots color="black" />;
  }

  return (
    <>
      <Head>
        <title>TriviaQ | Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          gap: 16,
          margin: "auto 0",
        }}
      >
        <Link href="/play">
          <button>Start quiz</button>
        </Link>
        {session ? (
          <>
            <button onClick={() => signOut()}>Sign out</button>
            <p>
              Currently signed in as{" "}
              <span style={{ fontWeight: 700 }}>{session.user.email}</span>
            </p>
          </>
        ) : (
          <Link href="/api/auth/signin">
            <button>Sign in to save progress</button>
          </Link>
        )}
      </div>
    </>
  );
}
