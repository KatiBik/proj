import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Home from "../screens/Home";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Manage from "../screens/Manage";
import History from "../screens/History";
import ListCategories from "../screens/ListCategories";
import RegisterBussiness from "../screens/RegisterBussiness";
import Messages from "../screens/Messages";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const colorOfTab = "#b5739d";

function HomeMenu() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListCategories"
        component={ListCategories}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function ManageMenu() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Manage"
        component={Manage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterBussiness"
        component={RegisterBussiness}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

class MainTabScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: "#ffffff",
          adaptive: true,
          style: {
            backgroundColor: "#ffcce6",
            borderTopColor: "white",
            borderTopWidth: 1,
          },
        }}
      >
        <Tab.Screen
          name="Manage"
          component={ManageMenu}
          options={{
            tabBarLabel: "ניהול",
            tabBarIcon: () => (
              <AntDesign name="setting" color={colorOfTab} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeMenu}
          options={{
            tabBarLabel: "מסך הבית",
            tabBarIcon: () => (
              <AntDesign name="home" color={colorOfTab} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarLabel: "היסטוריה",
            tabBarIcon: () => (
              <FontAwesome name="history" color={colorOfTab} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
const TabComponent = () => {
  return (
    <NavigationContainer>
      <MainTabScreen />
    </NavigationContainer>
  );
};
export default TabComponent;
