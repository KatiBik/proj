import React, { useState } from "react";
import {
    View,
  } from "react-native";
import ClientCalendar from "../components/ClientCalendar";

const Calendar = (props) => {

    //alert(JSON.stringify(props));
    return (<ClientCalendar style={{margin:0}} props={props}/>);

};

export default Calendar;