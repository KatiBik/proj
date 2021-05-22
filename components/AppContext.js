import React from "react";
import TabComponent from "./TabComponent";
import { NavigateProvider } from "./NavigateProvider";

export default class CoverNavigate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  async componentDidMount() {
    //props.navigation.navigate("Login");
  }

  render() {
    
    return (
      <NavigateProvider>
        <TabComponent />
      </NavigateProvider>
    );
  }
}
