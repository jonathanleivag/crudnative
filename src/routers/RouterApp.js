import React, { Fragment } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { InicioScreen } from "../Views/InicioScreen";

const Stack = createStackNavigator();

export const RouterApp = () => {
  return (
    <Fragment>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicial">
          <Stack.Screen name="Inicio" component={InicioScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
  );
};
