import React from "react";
import { Center } from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";
import { SyncLoader } from "react-spinners";
function LoadingScreen() {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <Center
      style={{
        height: "calc(100vh - 160px)",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SyncLoader color={dark ? "white" : "black"} />
    </Center>
  );
}

export default LoadingScreen;
