import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
export const NavigateReactContext = React.createContext();
import { View, ActivityIndicator } from "react-native";
import style from "../style";
import { getBussiness, getTypes, getAppointment } from "../api";

export class NavigateProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      user: null,
      isBussiness: false,
    };
  }
  async componentDidMount() {
    const user = await AsyncStorage.getItem("user").then((res) =>
      JSON.parse(res)
    );
    const bussiness = await getBussiness();
    const appointment = await getAppointment();
    const types = await getTypes();
    const myBussiness = bussiness.find((item) => item.userEmail === user.email);
    const isBussiness = myBussiness ? true : false;
    this.setState(
      {
        user,
        bussiness,
        isBussiness,
        myBussiness,
        types,
        appointment,
      },
      () => {
        this.setState({ isReady: true });
      }
    );
  }

  actions = {
    setBussiness: (bussiness) => {
      this.setState({ myBussiness: bussiness, isBussiness: true });
    },
  };

  render() {
    if (this.state.isReady) {
      return (
        <NavigateReactContext.Provider
          value={{ state: this.state, actions: this.actions }}
        >
          {this.props.children}
        </NavigateReactContext.Provider>
      );
    } else
      return (
        <View style={style.container}>
          <ActivityIndicator size="large" color="#ff4d4d" />
        </View>
      );
  }
}
