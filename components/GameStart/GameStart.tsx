import { signOut, useSession } from "next-auth/react";
import { useAppDispatch } from "../../services/hooks";
import { Title, Text } from "@mantine/core";
import { startGame } from "../../services/redux/gameSlice";
import { motion } from "framer-motion";
import Link from "next/link";
import { useStyles } from "./styles";

function GameStart({ refetch }) {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const handleStartGame = () => {
    refetch();
    dispatch(startGame());
  };

  return (
    <motion.div
      className={classes.content}
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
    >
      <div className={classes.container}>
        <Text order={1} className={classes.title} component={Title}>
          TriviaQ
        </Text>
        <div className={classes.options}>
          <button className={classes.button} onClick={handleStartGame}>
            Start Quiz
          </button>
          {session ? (
            <>
              <button className={classes.button} onClick={() => signOut()}>
                Sign Out
              </button>
              <Text className={classes.signedInText}>
                Currently signed in as{" "}
                <span className={classes.userEmail}>{session.user.email}</span>
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
      </div>
    </motion.div>
  );
}

export default GameStart;
