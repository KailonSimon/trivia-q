import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "../services/hooks";
import LoadingScreen from "../components/LoadingScreen";
import { Center, createStyles, Text } from "@mantine/core";
import Game from "../components/Game";
import { startGame } from "../services/redux/gameSlice";
import Link from "next/link";
import { useGetNumberOfQuestionsQuery } from "../services/questions";
import GameOver from "../components/GameOver";
import GameStart from "../components/GameStart";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

const useStyles = createStyles((theme) => ({
  container: {
    height: "100%",
    display: "flex",
    minHeight: "calc(100vh - 200px)",
  },
  options: {
    display: "flex",
    justifyContent: "center",
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
  const { gameCondition, currentQuestion } = useAppSelector(
    (state) => state.game
  );
  const dispatch = useAppDispatch();

  const { data, error, isLoading, isFetching, refetch } =
    useGetNumberOfQuestionsQuery(2, {});

  useEffect(() => {
    console.log(gameCondition);
  }, [gameCondition]);

  if (isLoading || isFetching) {
    return <LoadingScreen />;
  }

  const headTitle = () => {
    switch (gameCondition) {
      case 0:
        return "Home";
      case 1:
        return `Question ${currentQuestion + 1}`;
      case 2:
        return "Game Over";
    }
  };

  return (
    <>
      <Head>
        <title>{`TriviaQ | ${headTitle()}`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Center className={classes.container}>
        <AnimatePresence>
          {(() => {
            switch (gameCondition) {
              case 0:
                return <GameStart />;
              case 1:
                return (
                  <Game
                    isLoading={isLoading}
                    isFetching={isFetching}
                    questions={data.results}
                  />
                );
              case 2:
                return <GameOver refetch={refetch} />;
              default:
                return null;
            }
          })()}
        </AnimatePresence>
      </Center>
    </>
  );
}
