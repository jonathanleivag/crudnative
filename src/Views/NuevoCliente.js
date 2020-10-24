import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import {
  Headline,
  TextInput,
  Button,
  Paragraph,
  Dialog,
  Portal,
} from "react-native-paper";
import { globalStyle } from "../assets/styles/styles";

export const NuevoCliente = ({ navigation, route }) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [alert, setAlert] = useState(false);
  const { setLoading } = route.params;

  useEffect(() => {
    if (route.params.cliente) {
      const { nombre, correo, telefono, empresa } = route.params.cliente;
      setNombre(nombre);
      setCorreo(correo);
      setTelefono(telefono);
      setEmpresa(empresa);
    }
  }, []);

  const guardarCliente = async () => {
    if (
      nombre.trim() === "" ||
      correo.trim() === "" ||
      telefono.trim() === "" ||
      empresa.trim() === ""
    ) {
      setAlert(true);
      return;
    }

    const cliente = { nombre, correo, telefono, empresa };
    if (route.params.cliente) {
      if (Platform.OS === "android") {
        const { id } = route.params.cliente;
        try {
          await Axios({
            method: "PUT",
            url: `http://10.0.2.2:3000/clientes/${id}`,
            data: cliente,
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const { id } = route.params.cliente;
          await Axios({
            method: "PUT",
            url: `http://localhost:3000/clientes${id}`,
            data: cliente,
          });
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      if (Platform.OS === "android") {
        try {
          await Axios({
            method: "post",
            url: "http://10.0.2.2:3000/clientes",
            data: cliente,
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          await Axios({
            method: "post",
            url: "http://localhost:3000/clientes",
            data: cliente,
          });
        } catch (error) {
          console.error(error);
        }
      }
    }

    navigation.navigate("Inicio");
    setNombre("");
    setCorreo("");
    setTelefono("");
    setEmpresa("");

    setLoading(true);
  };

  return (
    <View style={globalStyle.contenedor}>
      <Headline style={globalStyle.titulo}>Añadir un nuevo cliente</Headline>
      <TextInput
        style={styles.input}
        label="Nombre"
        placeholder="Nombre completo"
        onChangeText={setNombre}
        value={nombre}
      />
      <TextInput
        style={styles.input}
        label="Telefono"
        placeholder="12345"
        onChangeText={setTelefono}
        value={telefono}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        label="Correo"
        placeholder="email@email.com"
        onChangeText={setCorreo}
        value={correo}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        label="Empresa"
        placeholder="Nombre de la empresa"
        onChangeText={setEmpresa}
        value={empresa}
      />
      <Button icon="pencil-circle" mode="contained" onPress={guardarCliente}>
        {route.params.cliente ? "Actualizar cliente" : "Crear cliente"}
      </Button>

      <Portal>
        <Dialog visible={alert} onDismiss={() => setAlert(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los campos son obligatorio</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setAlert(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: "transparent",
  },
});
