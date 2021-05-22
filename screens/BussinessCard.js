import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
  Title,
  Footer,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import style from "../style";
import strings from "../strings.json";
import AntDesign from "react-native-vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import linearGradient from "../components/linearGradient";
import Rating from "../components/Rating";

const TreatmentItem = ({ treatment }) => (
  
  <View style={{
      marginLeft: "2%",
      marginTop:0,
      width: "100%",
      justifyContent: "flex-start",
      //alignItems: "center",
      padding:0,
      flexDirection: "row",
      flex:1
    }}>
    <Text style={{textDecorationLine:"underline",fontWeight:"bold"}}>{treatment.Summary}:</Text>
    <Text> {treatment.Treatment_duration} </Text>
    <Text>דקות,</Text>
    <Text> ₪{treatment.Cost} </Text>
  </View>
);

const BussinessCard = (props) => {
  const item = props.route.params.bussiness;
  const treatments = props.route.params.treatments;
  const Divide_Rating = 20;
  const Max_Rating = 5;
  const points =
  parseInt(item.points / Divide_Rating) > Max_Rating
    ? Max_Rating
    : parseInt(item.points / Divide_Rating);

  const goToPlace = () => {
    Linking.openURL(
      `https://www.waze.com/ul?ll=${item.latitude}%2C${item.longitude}&navigate=yes&zoom=17`
    );
  };

  const renderItem = ({ item }) => (
    <TreatmentItem treatment={item} />
  );

      const getHeader = () => {
        return <Text>{'My Title'}</Text>;
    };

    const getFooter = () => {
        
        return <Text>{'Loading...'}</Text>;
    };

  return (
    <View style={style.normalContainer}>
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
          {item.Bussiness_name}
        </Text>
        <TouchableOpacity 
          onPress={() => props.navigation.goBack()}
          style={{ position: "absolute", top: 60, left: 20 }}
          hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
        >
          <AntDesign name="right" size={24} />
        </TouchableOpacity>
      </View>
            
      <View>
        <Image
          source={{ uri: item.photos ? item.photos : "abc" }}
          style={{
            width: "100%",
            height: 150
          }}
        />
        <View
          style={{
            width: "100%",
            backgroundColor: "#a31ea5",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 0,
            borderWidth: 0,
          }}
        >
          <Text style={{color:"#ffffff",padding:2}}>{item.summery}</Text>
          <Rating rating={points} />
        </View>
      </View>  
          
      <View>

        <View
            style={{
              marginLeft: "10%",
              marginTop:20,
              width: "80%",
              backgroundColor: "#ffffff",
              justifyContent: "flex-start",
              //alignItems: "center",
              borderRadius: 10,
              borderWidth: 1,
              padding:20
            }}
          >
            <Text>
                <Text style={instyle.paramLabel}>{strings.address}: </Text><Text numberOfLines={1} ellipsizeMode="tail"style={instyle.paramText}>{item.b_address}</Text>
            </Text>
            <Text>
                <Text style={instyle.paramLabel}>{strings.phone}: </Text><Text style={instyle.paramText}>{item.phone}</Text>
            </Text>
            <Text>
                <Text style={instyle.paramLabel}>{strings.mail}: </Text><Text style={instyle.paramText}>{item.userEmail}</Text>
            </Text>  

            <TouchableOpacity
              style={{ position: "absolute", bottom: 10, right: 10,zIndex: 99 }}
              hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
              >
              <MaterialCommunityIcons
                onPress={() => goToPlace()}
                name="waze"
                size={40}
              />
            </TouchableOpacity>

        </View>
         
        { treatments.length > 0 ?    
          <View 
            style={{
              marginLeft: "10%",
              marginTop:0,
              width: "80%",
              justifyContent: "flex-start",
              //alignItems: "center",
              padding:20
            }}
          >
            <Text style={instyle.treatmentsText}>{strings.treatments_type}</Text>
            <FlatList
              scrollEnabled={true}
              style={{ marginTop: 0 }}
              data={treatments || []}
              renderItem={renderItem}
              keyExtractor={item => item.treatmentId.toString()}
            />
          </View>:null
        }

        <TouchableOpacity
              style={{ marginTop:30,width:"40%",backgroundColor:"#a31ea5",marginLeft:"30%",borderRadius:10}}
              hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
              onPress={() => props.navigation.navigate("Calendar",{treatments:treatments})}
              >
              <Text style={{color:"#ffffff",textAlign:"center",padding:10}}>לקביעת תור</Text>
         </TouchableOpacity>
        
      </View>

    </View>
  );
};

const instyle = StyleSheet.create({
  paramLabel:{
    color:"#a31ea5",
    fontWeight: "bold",
    fontSize:16,
  },
  paramText:{
    color:"#222222",
    fontSize:14
  },
  treatmentsText:{
    color:"#a31ea5",
    fontWeight: "bold",
    fontSize:14
  }
});



export default BussinessCard;
