import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import Auth from "./src/Auth";
import Main from "./src/Main";
import { ID_TOKEN_KEY } from "./config";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    SecureStore.getItemAsync(ID_TOKEN_KEY).then(session => {
      if (session) {
        const sessionObj = JSON.parse(session);
        const { exp, token } = sessionObj;
        if (exp > Math.floor(new Date().getTime() / 1000)) {
          setToken(token);
          setIsLoggedIn(true);
        }
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {isLoggedIn && <Main token={token} />}
      <Auth
        isLoggedIn={isLoggedIn}
        onLogin={() => {
          setIsLoggedIn(true);
        }}
        onLogout={() => {
          setIsLoggedIn(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
