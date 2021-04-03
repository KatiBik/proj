import AsyncStorage from "@react-native-community/async-storage";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  CheckBox,
  ActivityIndicator,
} from "react-native";
import style from "../style";
import AntDesign from "react-native-vector-icons/AntDesign";
import strings from "../strings.json";
import { register_customer } from "../api";
import { LinearGradient } from "expo-linear-gradient";
import linearGradient from "../components/linearGradient";

const Register = (props) => {
  const [connect, setConnect] = useState(false);
  const [full_name, onChangeName] = useState("");
  const [phone, onChangePhone] = useState("");
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [creditNumber, onChangeCreditNumber] = useState("");
  const [creditValidate, onChangeCreditValidate] = useState("");
  const [creditCvv, onChangeCvv] = useState("");
  const [isSelectedCus, setSelectionCus] = useState(true);
  const [isSelectedMan, setSelectionMan] = useState(false);
  const [error, setError] = useState(null);

  const setDecideCus = () => {
    if (isSelectedMan) {
      setSelectionCus(true);
      setSelectionMan(false);
    }
  };
  const setDecideMan = () => {
    if (isSelectedCus) {
      setSelectionCus(false);
      setSelectionMan(true);
    }
  };

  const checkIfFull = () => {
    if (
      full_name.length !== 0 &&
      phone.length !== 0 &&
      email.length !== 0 &&
      password.length !== 0 &&
      creditNumber.length !== 0 &&
      creditValidate.length !== 0 &&
      creditCvv.length !== 0
    ) {
      return true;
    } else return false;
  };

  const register = async () => {
    if (checkIfFull()) {
      const user = {
        email: email.toLowerCase(),
        full_name: full_name,
        password: password,
        phone: phone,
        U_Address: "",
        points: 0,
        credit_number: creditNumber,
        credit_validate: creditValidate,
        credit_cvv: creditCvv,
        latitude: "",
        longitude: "",
      };
      if (isSelectedCus) {
        const tempUser = await register_customer(user);
        if (tempUser) {
          AsyncStorage.setItem("user", JSON.stringify(tempUser)).then(() => {
            props.navigation.navigate("CoverNavigate");
          });
        } else {
          setError(strings.user_exist);
        }
      } else {
        props.navigation.navigate("RegisterManager", { user });
      }
    } else {
      setError(strings.pleaseFill);
    }
  };
  return (
    <View style={style.normalContainer}>
      <LinearGradient {...linearGradient} />
      <View style={style.containerRegister}>
        <Text style={{ fontSize: 20, paddingTop: 20 }}>{strings.register}</Text>
      </View>
      <TouchableOpacity
        hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
        onPress={() => props.navigation.navigate("Login")}
        style={{ position: "absolute", top: 40, left: 20 }}
      >
        <AntDesign name="right" size={24} />
      </TouchableOpacity>
      <ScrollView>
        <View style={style.viewOfRegister}>
          <View style={style.widthInput}>
            <Text style={{ paddingRight: 18 }}>{strings.full_name}</Text>
            <TextInput
              style={[style.input, { paddingLeft: 50 }]}
              onChangeText={onChangeName}
              value={full_name}
            />
            <AntDesign name="user" size={24} style={style.positionLogo} />
          </View>
          <View style={style.widthInput}>
            <Text style={{ paddingRight: 18 }}>{strings.phone}</Text>
            <TextInput
              style={style.input}
              onChangeText={onChangePhone}
              value={phone}
              keyboardType="numeric"
            />
            <AntDesign name="phone" size={24} style={style.positionLogo} />
          </View>
          <View style={style.widthInput}>
            <Text style={{ paddingRight: 18 }}>{strings.mail}</Text>
            <TextInput
              style={style.input}
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
          <View style={style.widthInput}>
            <Text style={{ paddingRight: 18 }}>{strings.credit_number}</Text>
            <TextInput
              style={style.input}
              onChangeText={onChangeCreditNumber}
              value={creditNumber}
              keyboardType="numeric"
            />
            <AntDesign name="creditcard" size={24} style={style.positionLogo} />
          </View>
          <View style={style.widthInput}>
            <Text style={{ paddingRight: 18 }}>{strings.credit_validate}</Text>
            <TextInput
              style={style.input}
              onChangeText={onChangeCreditValidate}
              value={creditValidate}
            />
            <AntDesign name="key" size={24} style={style.positionLogo} />
          </View>
          <View style={style.widthInput}>
            <Text style={{ paddingRight: 18, textAlign: "left" }}>
              {strings.credit_cvv}
            </Text>
            <TextInput
              style={style.input}
              onChangeText={onChangeCvv}
              value={creditCvv}
              keyboardType="numeric"
            />
            <AntDesign name="key" size={24} style={style.positionLogo} />
          </View>
          <View
            style={[
              style.widthInput,
              {
                flexDirection: "row",
                alignItems: "center",
              },
            ]}
          >
            <CheckBox
              value={isSelectedCus}
              onValueChange={() => setDecideCus()}
            />
            <Text>{strings.customer}</Text>
            <CheckBox
              value={isSelectedMan}
              onValueChange={() => setDecideMan()}
            />
            <Text>{strings.manager}</Text>
          </View>
          {error && (
            <Text style={{ padding: 10, color: "red", fontWeight: "bold" }}>
              {error}
            </Text>
          )}
          <TouchableOpacity
            onPress={() => register()}
            hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
            style={style.btnLogin}
          >
            {isSelectedCus ? (
              connect ? (
                <ActivityIndicator size="small" color="#ff4d4d" />
              ) : (
                <Text>{strings.action_register}</Text>
              )
            ) : connect ? (
              <ActivityIndicator size="small" color="#ff4d4d" />
            ) : (
              <Text>{strings.continue}</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default Register;
