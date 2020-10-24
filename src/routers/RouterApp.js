import React, { Fragment } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Views
import { InicioScreen } from "../Views/InicioScreen";
import { NuevoCliente } from "../Views/NuevoCliente";
import { DetalleCliente } from "../Views/DetalleCliente";

// themes
import { theme } from "../assets/styles/theme";


const Stack = createStackNavigator();

export const RouterApp = () => {
  return (
    <Fragment>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Inicial"
          screenOptions={{
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: theme.colors.primary },
            headerTintColor: theme.colors.surface,
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          <Stack.Screen
            name="Inicio"
            component={InicioScreen}
          />

          <Stack.Screen
            name="NuevoCliente"
            component={NuevoCliente}
            options={{ title: "Nuevo cliente" }}
          />

          <Stack.Screen
            name="DetalleCliente"
            component={DetalleCliente}
            options={{ title: "Detalle cliente" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
  );
};
