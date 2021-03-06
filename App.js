import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Loading from "./screens/Loading";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Terms from "./screens/Terms";
import RegisterManager from "./screens/RegisterManager";
import AppContext from "./components/AppContext";
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales.en = LocaleConfig.locales[''];
LocaleConfig.locales.he = {
  monthNames: [
    'ינואר',
    'פברואר',
    'מרץ',
    'אפריל',
    'מאי',
    'יוני',
    'יולי',
    'אוגוסט',
    'ספטמבר',
    'אוקטובר',
    'נובמבר',
    'דצמבר',
  ],
  monthNamesShort: [
    'ינואר',
    'פברואר',
    'מרץ',
    'אפריל',
    'מאי',
    'יוני',
    'יולי',
    'אוגוסט',
    'ספטמבר',
    'אוקטובר',
    'נובמבר',
    'דצמבר',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'],
};

LocaleConfig.defaultLocale = 'he';

const AppStack = createStackNavigator({
  CoverNavigate: {
    screen: AppContext,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      headerShown: false,
    },
  },
  RegisterManager: {
    screen: RegisterManager,
    navigationOptions: {
      headerShown: false,
    },
  },
  Terms: {
    screen: Terms,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Loading",
    }
  )
);
