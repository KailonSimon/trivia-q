import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "../services/hooks";
import LoadingScreen from "../components/LoadingScreen";
import { Center, createStyles, Text } from "@mantine/core";
import Game from "../components/Game";
import { startGame } from "../services/redux/gameSlice";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  container: {
    height: "100%",
    display: "flex",
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.md,
    width: "100%",
    maxWidth: 300,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px 25px",
    borderRadius: 32,
    background:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]
    }`,
    position: "relative",
    fontWeight: 900,
    transition: "all 500ms",
    overflow: "hidden",
    zIndex: 1,
    "&:hover": {
      background:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2],
      cursor: "pointer",
    },
  },
  signedInText: {
    textAlign: "center",
  },
}));

export default function Home() {
  const { classes } = useStyles();
  const { data: session, status } = useSession();
  const { inGame } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  if (status === "loading") {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>TriviaQ | Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Center className={classes.container}>
        {inGame ? (
          <Game />
        ) : (
          <div className={classes.options}>
            <button
              className={classes.button}
              onClick={() => dispatch(startGame())}
            >
              Start quiz
            </button>
            {session ? (
              <>
                <button className={classes.button} onClick={() => signOut()}>
                  Sign out
                </button>
                <Text className={classes.signedInText}>
                  Currently signed in as{" "}
                  <span style={{ fontWeight: 700 }}>{session.user.email}</span>
                </Text>
              </>
            ) : (
              <Link href="/api/auth/signin">
                <button className={classes.button}>
                  Sign in to save progress
                </button>
              </Link>
            )}
          </div>
        )}
      </Center>
    </>
  );
}
