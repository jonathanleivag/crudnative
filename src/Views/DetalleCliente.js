import Axios from "axios";
import React from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import { Button, FAB, Headline, Subheading, Text } from "react-native-paper";
import { globalStyle } from "../assets/styles/styles";

export const DetalleCliente = ({ route, navigation }) => {
  const { setLoading } = route.params;
  const { nombre, correo, telefono, empresa, id } = route.params.item;

  const mostrarAlert = () => {
    Alert.alert(
      "Eliminar cliente",
      "Si elimina el cliente no lo prodra recuperar",
      [
        { text: "Si, eliminar", onPress: eliminarContacto },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  };

  const eliminarContacto = async () => {
    try {
      if (Platform.OS === "android") {
        const url = `http://10.0.2.2:3000/clientes/${id}`;
        await Axios({ method: "DELETE", url });
      } else {
        const url = `http://localhost:3000/clientes/${id}`;
        await Axios({ method: "DELETE", url });
      }

      navigation.navigate("Inicio");
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={globalStyle.contenedor}>
      <Headline style={globalStyle.titulo}> {nombre} </Headline>
      <Text style={styles.texto}>
        Empresa: <Subheading>{empresa}</Subheading>
      </Text>
      <Text style={styles.texto}>
        correo: <Subheading>{correo}</Subheading>
      </Text>
      <Text style={styles.texto}>
        Telefono: <Subheading>{telefono}</Subheading>
      </Text>
      <Button
        mode="contained"
        icon="cancel"
        style={styles.btn}
        onPress={mostrarAlert}
      >
        Eliminar cliente
      </Button>
      <FAB
        icon="pencil"
        style={globalStyle.fab}
        onPress={() =>
          navigation.navigate("NuevoCliente", {
            cliente: route.params.item,
            setLoading,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  texto: {
    marginBottom: 20,
    fontSize: 18,
  },
  btn: {
    marginTop: 100,
    backgroundColor: "red",
  },
});
