import "react-native-gesture-handler";
import React, { Fragment } from "react";
import { RouterApp } from "./routers/RouterApp";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const theme = {
  ...DefaultTheme,
};

console.log(theme);

export const CrudApp = () => {
  return (
    <Fragment>
      <PaperProvider theme={theme}>
        <RouterApp />
      </PaperProvider>
    </Fragment>
  );
};
