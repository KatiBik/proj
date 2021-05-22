import React, {Component,useMemo} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import moment from "moment";
import { getTreatments,getUsers } from "../api";

export default class BussinessCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
    
  }

  async componentDidMount() {
    const treatments = await getTreatments();
    const users = await getUsers();
    this.setState(
      {
        users,
        treatments,
      },
      () => {
        this.setState({ isReady: true });
      }
    );
    const appointment = this.props.appointment;
    //alert(JSON.stringify(users));
    this.init(appointment);
  }

  init(appointment)
  {
      let newItems={};
      let currentDate = "";
      for (let i = 0; i < appointment.length; i++)
      {
          //alert(appointment[i].appDate);
          let date_key = moment(appointment[i].appDate).format(moment.HTML5_FMT.DATE);
          if(currentDate != date_key)
          {
            newItems[date_key] = [];
            currentDate = date_key;
          }
          const user = this.state.users?.find((obj) => obj.email === appointment[i].UserEmail);
          const treatment = this.state.treatments?.find((obj) => obj.treatmentId === appointment[i].TreatID);

         // alert(JSON.stringify(user));
          //alert(JSON.stringify(treatment));
          newItems[date_key].push({item:appointment[i],treatment:treatment,user:user});
      }

      this.setState({
          items: newItems
      });
  }


  
  render() {

    return (
      <Agenda
        testID='agenda'
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        //selected={'2021-05-16'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        onDayPress={(day) => {}}
        pastScrollRange={0}
        futureScrollRange={1}
      />
    );
  }

  loadItems(day) {

  }

  renderItem(item) {

    const startTime = moment(item.item.appDate).format("H:mm");
    return (
      <TouchableOpacity
        testID='item'
        style={[styles.item, {height: item.height}]}
        onPress={() => alert(JSON.stringify(item))}
      >
        <Text style={{color:"#a31ea5"}}>{item.treatment.Treatment_name}</Text>
        <Text>{startTime}</Text>
        <Text>
            <Text style={{fontWeight:"bold"}}>{item.user.full_name}: </Text><Text>{item.user.phone}</Text>
        </Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});