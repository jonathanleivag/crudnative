import "react-native-gesture-handler";
import React, { Fragment } from "react";
import { RouterApp } from "./routers/RouterApp";
import { Provider as PaperProvider } from "react-native-paper";
import { theme } from "./assets/styles/theme";

export const CrudApp = () => {
  return (
    <Fragment>
      <PaperProvider theme={theme}>
        <RouterApp />
      </PaperProvider>
    </Fragment>
  );
};
