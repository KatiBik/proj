import React, { useEffect } from "react";
import { View, Animated, Easing } from "react-native";
import style from "../style";
import AsyncStorage from "@react-native-community/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import linearGradient from "../components/linearGradient";

const Loading = (props) => {
  const RotateValueHolder = new Animated.Value(0);
  const RotateData = RotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    async function splash() {
      const user = await AsyncStorage.getItem("user");
      StartImageRotateFunction();
      setTimeout(() => {
        props.navigation.navigate(user ? "CoverNavigate" : "Login");
      }, 2000);
    }
    splash();
  }, []);

  const StartImageRotateFunction = () => {
    RotateValueHolder.setValue(0);
    Animated.timing(RotateValueHolder, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => StartImageRotateFunction());
    return true;
  };
  return (
    <View style={style.container}>
      <LinearGradient {...linearGradient} />
      <Animated.Image
        style={
          (style.animatedImage,
          {
            transform: [{ rotate: RotateData }],
          })
        }
        source={require("../assets/Beautiz.png")}
      />
    </View>
  );
};
export default Loading;
