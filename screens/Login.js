import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import style from "../style";
import strings from "../strings.json";
import AntDesign from "react-native-vector-icons/AntDesign";
import { authentication } from "../api";
import AsyncStorage from "@react-native-community/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import linearGradient from "../components/linearGradient";

const Login = (props) => {
  const [isConnect, setConnect] = useState(false);
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [error, setError] = useState(null);

  const connect = async () => {
    setConnect(true);
    if (email.length === 0 || password.length === 0) {
      setConnect(false);
      setError(strings.pleaseFill);
    } else {
      const user = await authentication(email.toLowerCase(), password);
      if (user) {
        AsyncStorage.setItem("user", JSON.stringify(user)).then(() => {
          props.navigation.navigate("CoverNavigate");
        });
      } else {
        setConnect(false);
        setError(strings.emailOrPasswordIncorrect);
      }
    }
  };
  return (
    <View style={style.container}>
      <LinearGradient {...linearGradient} />
      <View style={style.center}>
        <Image style={style.logo} source={require("../assets/Beautiz.png")} />
        <Text style={style.contentLogo}>{strings.nameApp}</Text>
      </View>
      <View style={style.widthInput}>
        <Text style={{ paddingRight: 18 }}>{strings.mail}</Text>
        <TextInput
          style={[style.input, { textAlign: "left" }]}
          onChangeText={onChangeEmail}
          value={email}
        />
        <AntDesign name="mail" size={24} style={style.positionLogo} />
      </View>
      <View style={style.widthInput}>
        <Text style={{ paddingRight: 18 }}>{strings.password}</Text>
        <TextInput
          style={style.input}
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry={true}
        />
        <AntDesign name="lock" size={24} style={style.positionLogo} />
      </View>
      {error && (
        <Text style={{ color: "red", fontWeight: "bold" }}>{error}</Text>
      )}
      <TouchableOpacity
        onPress={() => connect()}
        hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
        style={style.btnLogin}
      >
        {isConnect ? (
          <ActivityIndicator size="small" color="#ff4d4d" />
        ) : (
          <Text>{strings.login}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
        style={{ padding: 10 }}
        onPress={() => props.navigation.navigate("Register")}
      >
        <Text style={{ fontWeight: "bold" }}>{strings.notRegister}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
        style={{ padding: 10 }}
        onPress={() => props.navigation.navigate("Terms")}
      >
        <Text>{strings.terms}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Login;
