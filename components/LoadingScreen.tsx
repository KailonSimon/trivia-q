import React from "react";
import { Center } from "@mantine/core";
import { SyncLoader } from "react-spinners";
function LoadingScreen() {
  return (
    <Center
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <SyncLoader color="white" />
    </Center>
  );
}

export default LoadingScreen;
