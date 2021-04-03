import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import style from "../style";
import strings from "../strings.json";
import AntDesign from "react-native-vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import linearGradient from "../components/linearGradient";

const Messages = (props) => {
  return (
    <View style={style.normalContainer}>
      <LinearGradient {...linearGradient} />
      <View style={{ backgroundColor: "#ffcce6" }}>
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            padding: 20,
            marginTop: 20,
          }}
        >
          {strings.messages}
        </Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Manage")}
          style={{ position: "absolute", top: 40, left: 20 }}
          hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
        >
          <AntDesign name="right" size={24} />
        </TouchableOpacity>
      </View>
      <View style={style.container}>
        <Text>Messages</Text>
      </View>
    </View>
  );
};
export default Messages;
