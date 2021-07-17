import React, { useState,useMemo } from "react";
import { Alert,View, Text, FlatList,StyleSheet,Image,TouchableOpacity,ScrollView,Linking } from "react-native";
import style from "../style";
import { NavigateReactContext } from "../components/NavigateProvider";
import strings from "../strings.json";
import Row from "../components/Row";
import { LinearGradient } from "expo-linear-gradient";
import linearGradient from "../components/linearGradient";
import moment from "moment";
import { updateAppointment,getAppointment } from "../api";


//import { ScrollView } from "react-native-gesture-handler";

class HistoryTab extends React.Component {
  static contextType = NavigateReactContext;
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <History actions={this.context.actions} state={this.context.state} props={this.props} />
      );
  }
          

}

const History = ({ actions , state, props }) => {
  
  const isBussiness = state.isBussiness;
  let appointments = state?.appointment;

  appointments = appointments.sort(function(a, b) { 
    if(a.appDate < b.appDate) { return -1; }
    if(a.appDate > b.appDate) { return 1; }
    return 0;
  });

  if(state.isBussiness)
  {
    appointments = appointments.filter(
      (item) => item.BussID === state.myBussiness.Bussiness_Id && item.State != 3
    );
    /*
    appointments = useMemo(() => {
      return state?.appointment?.filter(
        (item) => item.BussID === state.myBussiness.Bussiness_Id
      );
    }, []);
    */
  }
  else
  {
    appointments = appointments.filter(
      (item) => item.UserEmail === state.user.email && item.State != 2
    );
    /*
    appointments = useMemo(() => {
      return state?.appointment?.filter(
        (item) => item.UserEmail === state.user.email
      );
    }, []);
    */
  
  }

  let my_appointments = [];
  for (let i = 0; i < appointments?.length; i++) {
    const element = appointments[i];
    const buss = state.bussiness.filter(
      (item) => item.Bussiness_Id === element.BussID
    );
    const treatment = state.treatments?.find((obj) => obj.treatmentId === appointments[i].TreatID);
    const user = state.users?.find((obj) => obj.email === appointments[i].UserEmail); 
    my_appointments.push({item:appointments[i],user:user,bussiness:buss[0],treatment:treatment,history:moment(appointments[i].appDate) - moment()});
  }

  if(state.isBussiness)
      my_appointments = my_appointments.filter((obj) => obj.bussiness.Bussiness_Id == state.myBussiness.Bussiness_Id);

  let future_appointments = my_appointments.filter((obj) => moment(obj.item.appDate) > moment());
  let old_appointments = my_appointments.filter((obj) => moment(obj.item.appDate) < moment());

  //alert(JSON.stringify(future_appointments));

  const confirmAlert=()=>{
    Alert.alert(
      'תור בוטל בהצלחה',
      'התראת ביטול נשלחה',
      [
        {text: 'סגור', onPress: () => console.log('ok')},
      ],
      { 
        cancelable: true 
      }
    );
  }


  const openTwoButtonAlert=(item,state)=>{

    if(item.item.State > 1) return;

    Alert.alert(
      'ביטול תור',
      'האם לבטל בקשה לקביעת תור?',
      [
        {text: 'אישור', onPress: () => 
          cancelAppointment(item,state)
          },
        {text: 'ביטול', onPress: () => console.log('No button clicked'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }

  const cancelAppointment = async(item,state) =>{
      const new_appointment = { appointmentID: item.item.appointmentID,State:state}
      await updateAppointment(new_appointment);
      const appointments = await getAppointment();
      actions.setAppointments(appointments);
      confirmAlert();
  }  

  
  const renderItem = ({ item }) => {
 
    const startTime = moment(item.item.appDate).format("DD/MM/YYYY H:mm");

    let bk = "#ffffff";
    let date_bk = "transparent";
    let date_color = "#222";
    let date_text = "";
    //alert(JSON.stringify(item));

    

    if(item.history < 0)
        bk = "#eeeeee";
    
    else
    {
      if(item.item.State === 3 && !isBussiness || isBussiness && item.item.State === 2)
          {
            date_bk = "#B0171F";
            date_color = "#ffffff";
            date_text =  "(בוטל)"
          }
    }

    return (
      
      <View
        style={[styles.item,{backgroundColor:bk}]}
        >
         <Text style={{alignSelf: 'flex-end',padding:5,backgroundColor:date_bk,color:date_color}}>{startTime} {date_text}</Text>
        { isBussiness ? (
          <TouchableOpacity
              
          style={{ marginTop:5,width:"100%",backgroundColor:"#ffffff",marginRight:5,borderRadius:10}}
          hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
          onPress={() => {openTwoButtonAlert(item,3);}  
          }
          >
            <View
            style={styles.bussinessitem}
             >
            <Text style={{color:"#a31ea5"}}>{item.treatment.Treatment_name}</Text>
            <TouchableOpacity
            style={{ marginTop:5,width:"50%",backgroundColor:"#ffffff",marginRight:5,borderRadius:10}}
            hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
            onPress={() => {Linking.openURL(`tel:${item.user.phone}`)}  
            }>
            <Text>
                <Text style={{fontWeight:"bold"}}>{item.user.full_name}: </Text><Text>{item.user.phone}</Text>
            </Text>
            </TouchableOpacity>
          </View></TouchableOpacity>

          ):(
            <TouchableOpacity
              
              style={{ marginTop:5,width:"100%",backgroundColor:"#ffffff",marginRight:5,borderRadius:10}}
              hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
              onPress={() => {openTwoButtonAlert(item,2);}  
              }
              >
             
          <View style={{
            flexDirection: "row",
            margin: 2,
            borderRadius: 10,
            marginTop: 0,}}>
            <Image
              source={{ uri: item.bussiness.photos}}
              style={{
                width: 80,
                height: 80,
                margin:5,
                marginTop:-15,
                borderRadius:15
              }}
            />
  
            <View style={{}}>
                <Text style={{color:"#a31ea5",fontWeight:"bold"}}>{item.bussiness.Bussiness_name}</Text>
                <Text style={{marginLeft:5}}>{item.treatment.Treatment_name}</Text>
            </View>
          </View>

          </TouchableOpacity>)}
        
      </View>
      
      
    );
  }

  return (
    <ScrollView>
      <LinearGradient {...linearGradient} />
      <View style={{ backgroundColor: "#ffcce6" }}>
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            padding: 20,
            marginTop: 40,
          }}
        >
          {strings.history}
        </Text>
      </View>
      
      { future_appointments?.length === 0 ? (
        <View style={styles.normalContainer}>
          <Text style={{ fontSize: 18,textAlign:"center",marginTop:50 }}>{strings.not_future_history}</Text>
        </View>
      ) : (
        <View style={{ marginTop: 20 }}>
          <View style={[styles.title]}>
            <Text style={{ fontSize: 18,color:"#ffffff" }}>{strings.future_history}</Text>
          </View>
          <FlatList
            initialNumToRender={5}
            data={future_appointments || []}
            renderItem={renderItem}
            keyExtractor={(item) => item.item.appointmentID.toString()}
            
          />
        </View>
      )}

      {old_appointments?.length ===0 ? (
        <View style={styles.normalContainer}>
          <Text style={{ fontSize: 18,textAlign:"center",marginTop:50 }}>{strings.not_old_history}</Text>
        </View>
      ) : (
        
        <View style={{ marginTop: 20,height:300 }}>
          <View style={[styles.title,{backgroundColor:"#dddddd"}]}>
            <Text style={{ fontSize: 18,color:"#222222" }}>{strings.old_history}</Text>
          </View>
          <View>
          <FlatList
            initialNumToRender={5}
            data={old_appointments || []}
            renderItem={renderItem}
            keyExtractor={(item) => item.item.appointmentID.toString()}
          />
          </View>  
        </View>
        
      )}
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 0,
    marginTop: 10,
    marginLeft:"5%",
    marginRight:"5%",
    borderWidth:1
  },
  bussinessitem: {
    //backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 2,
    marginRight: 10,
    marginTop: 2
  },
  title:{
    width: "100%",
    backgroundColor: "#a31ea5",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0,
    borderWidth: 0,
    marginTop:5
  }
});

export default HistoryTab;
