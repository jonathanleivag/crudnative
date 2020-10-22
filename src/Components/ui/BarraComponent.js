import React from "react";
import { Button } from "react-native-paper";
import { theme } from "../../assets/styles/theme";
export const BarraComponent = ({ navigation, route }) => {
  // colors
  const { buttonColor } = theme.colors;

  return (
    <Button
      icon="plus-circle"
      color={buttonColor}
      onPress={() => navigation.navigate("NuevoCliente")}
    >
      Cliente
    </Button>
  );
};
