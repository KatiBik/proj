import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";
import { setAppointment } from "../api";

export default class ClientCalendar extends Component {
  constructor(props) {
    super(props);

    //alert(JSON.stringify(props.props.route.params.treatments));

    const DISABLED_DAYS = ['Saturday', 'Sunday']
    
    this.state = {
      items: {},
      user:{},
      treatments:props.props.route.params.treatments
      //markedDates: this.getDaysInMonth(moment().month(), moment().year(),  DISABLED_DAYS)
    };
  }

  async componentDidMount() {
    AsyncStorage.getItem("user").then((value) => {
      this.setState({user: JSON.parse(value)});
    })
    .then(res => {
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
        /*
        onMonthChange={(date) => {
          this.setState({
            markedDates: this.getDaysInMonth(date.month - 1, date.year, DISABLED_DAYS)
          })
        }}
        */
        //markedDates = {this.state.markedDates}
        //renderHeader={(date) => {}}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        // hideExtraDays={false}
      />
    );
  }

  getDaysInMonth(month, year, days) {
    let pivot = moment().month(month).year(year).startOf('month')
    const end = moment().month(month).year(year).endOf('month')

    let dates = {}
    const disabled = { disabled: true }
    while(pivot.isBefore(end)) {
      days.forEach((day) => {
        dates[pivot.day(day).format("YYYY-MM-DD")] = disabled
      })
      pivot.add(7, 'days')
    }

    return dates
  }

  loadItems(day) {

    //alert(day.dateString);
    setTimeout(() => {
        
        let newItems={};
        newItems[day.dateString] = [];
        let treatments = this.state.treatments;
        //alert(JSON.stringify(this.state));
        let firstHour = moment(day.dateString + " 08:00:00.000");
        let currentHour = firstHour;
        for (let i = 0; i < 9; i++)
        {
          for (let j = 0; j < treatments.length; j++)
          {
            let item = {treatment:treatments[j],time:currentHour.clone(),user:this.state.user};
            newItems[day.dateString].push(item);
            currentHour = currentHour.add(treatments[j].Treatment_duration, 'minutes');
          }
          if(currentHour.hour() > 16)
          {
             break;
          }
        }

        //alert(JSON.stringify(newItems));

        this.setState({
            items: newItems
        });

    }, 500);   
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        testID='item'
        style={[styles.item, {height: item.height}]}
        onPress={() => this.openTwoButtonAlert(item)}
      >
        <Text style={{color:"#a31ea5",fontWeight:"bold"}}>{item.treatment.Summary}</Text>
        <Text>
          <Text>{item.treatment.Treatment_duration}</Text> <Text>דקות</Text>
        </Text>
        <Text>{item.time.format("HH:mm")}</Text>
      </TouchableOpacity>
    );
  }

  openTwoButtonAlert=(item)=>{
    Alert.alert(
      'קביעת תור',
      'האם לשלוח בקשה לקביעת תור?',
      [
        {text: 'אישור', onPress: () => this.setAppointment(item)},
        {text: 'ביטול', onPress: () => console.log('No button clicked'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }

  async setAppointment(cal_appointment) 
  {
      let date = cal_appointment.time.format("YYYY-MM-DD HH:mm:ss");
      
      //alert(date)
       
      const appointment = { appointmentID: 0,
                appDate: date,
                UserEmail: cal_appointment.user.email,
                BussID: cal_appointment.treatment.Bussiness_Id,
                TreatID: cal_appointment.treatment.treatmentId}
                ;
      
      //alert(JSON.stringify(appointment));
      //alert(JSON.stringify(this.props));
      const appou = await setAppointment(appointment);
      this.confirmAlert();
      this.props.props.navigation.goBack();
      this.props.props.navigation.goBack();
  }

  confirmAlert=()=>{
    Alert.alert(
      'תור נקבע בהצלחה',
      'תוכלו לצפות בכל הטיפולים ביומן הטיפולים',
      [
        {text: 'סגור', onPress: () => console.log('ok')},
      ],
      { 
        cancelable: true 
      }
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