import Axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Button, FAB, Headline, List } from "react-native-paper";
import { globalStyle } from "../assets/styles/styles";

export const InicioScreen = ({ navigation }) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mostrarDatos = async () => {
      if (Platform.OS === "android") {
        try {
          const { data } = await Axios({
            method: "GET",
            url: "http://10.0.2.2:3000/clientes",
          });
          setClientes(data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const { data } = await Axios({
            method: "GET",
            url: "http://localhost:3000/clientes",
          });
          setClientes(data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    };
    if (loading) {
      mostrarDatos();
    }
  }, [loading]);
  return (
    <View style={globalStyle.contenedor}>
      <Button
        icon="plus-circle"
        onPress={() => navigation.navigate("NuevoCliente", { setLoading })}
      >
        Crear nuevo cliente
      </Button>
      <Headline style={globalStyle.titulo}>
        {clientes.length > 0 ? "Clientes" : "Aun no hay clientes"}
      </Headline>
      <FlatList
        data={clientes}
        keyExtractor={(cliente) => cliente.id.toString()}
        renderItem={({ item }) => (
          <List.Item
            title={item.nombre}
            description={item.empresa}
            onPress={() =>
              navigation.navigate("DetalleCliente", { item, setLoading })
            }
          />
        )}
      />
      <FAB
        icon="plus"
        style={globalStyle.fab}
        onPress={() => navigation.navigate("NuevoCliente", { setLoading })}
      />
    </View>
  );
};