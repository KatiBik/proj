import React from "react";
import TabComponent from "./TabComponent";
import { NavigateProvider } from "./NavigateProvider";

export default class CoverNavigate extends React.Component {
  render() {
    return (
      <NavigateProvider>
        <TabComponent />
      </NavigateProvider>
    );
  }
}
