import React, { useState,useMemo } from "react";
import { View, Text, FlatList,StyleSheet,Image,ScrollView } from "react-native";
import style from "../style";
import { NavigateReactContext } from "../components/NavigateProvider";
import strings from "../strings.json";
import Row from "../components/Row";
import { LinearGradient } from "expo-linear-gradient";
import linearGradient from "../components/linearGradient";
import moment from "moment";
//import { ScrollView } from "react-native-gesture-handler";

class HistoryTab extends React.Component {
  static contextType = NavigateReactContext;
  constructor(props) {
    super(props);
    
  }
  render() {
          return <History state={this.context.state} props={this.props} />;
  }

}

const History = ({ state, props }) => {
  
  const isBussiness = state.isBussiness;
  let appointments = [];
  if(state.isBussiness)
  {
    appointments = useMemo(() => {
      return state?.appointment?.filter(
        (item) => item.BussID === state.myBussiness.Bussiness_Id
      );
    }, []);
  }
  else
  {
    appointments = useMemo(() => {
      return state?.appointment?.filter(
        (item) => item.UserEmail === state.user.email
      );
    }, []);
  
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
 
  const renderItem = ({ item }) => {
    //alert(JSON.stringify(item));
    //alert(item.history);
    const startTime = moment(item.item.appDate).format("DD/MM/YYYY H:mm");

    let bk = "#ffffff";
     if(item.history < 0)
        bk = "#eeeeee";

    return (
      
      <View
        style={[styles.item,{backgroundColor:bk}]}
        >
         <Text>{startTime}</Text>
        { isBussiness ? (
            <View
            style={styles.bussinessitem}
             >
            <Text style={{color:"#a31ea5"}}>{item.treatment.Treatment_name}</Text>
            <Text>
                <Text style={{fontWeight:"bold"}}>{item.user.full_name}: </Text><Text>{item.user.phone}</Text>
            </Text>
          </View>

          ):(
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
          </View>)}
        
      </View>
      
      
    );
  }

  return (
    
    <View style={styles.normalContainer}>
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
        
        <View style={{ marginTop: 20 }}>
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
    </View>
    
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
