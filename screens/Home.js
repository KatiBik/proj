import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Dimensions } from "react-native";
import style from "../style";
import AntDesign from "react-native-vector-icons/AntDesign";
import CardCategory from "../components/CardCategory";
import { NavigateReactContext } from "../components/NavigateProvider";
import strings from "../strings.json";
import AsyncStorage from "@react-native-community/async-storage";
import FavoriteCard from "../components/FavoriteCard";
import { LinearGradient } from "expo-linear-gradient";
import linearGradient from "../components/linearGradient";
import { StyleSheet, TouchableOpacity} from "react-native";
import BussinessCalendar from "../components/BussinessCalendar";

const { width } = Dimensions.get("screen");

class HomeSection extends React.Component {
  constructor(props) {
    super(props);
  }
 
  static contextType = NavigateReactContext;
  render() {
    return <Home state={this.context.state} props={this.props} />;
  }
}

const Home = ({ state, props }) => {
  
  const isBussiness = state.isBussiness;
  const appointment = state.appointment;
  const bussiness = state.bussiness;
  const treatments = state.treatments;
  const myBussiness = state.myBussiness;
  const types = state.types;
  const [search, onSearch] = useState("");
  
  const renderItem = ({ item }) => {
    
      return (
        <FavoriteCard
          onPress={() =>  
            props.navigation.navigate("BussinessCard",
              {
                bussiness:item,
                  treatments: treatments.filter((obj) => {
                      return obj.Bussiness_Id==item.Bussiness_Id;
                  })
              })
            
          }
          item={item}
        />
    );
  };
  
  const renderCategory = ({ item }) => {
    const type = types?.find((obj) => obj.name === item.name);
    return (
      <CardCategory
        onPress={() =>
          
          props.navigation.navigate("ListCategories", {
            category: item.name,
            bussiness: bussiness.filter((obj) => {
              return obj.type==item.typeId;
            }),
            type: type.typeId,
          })
        }
        item={item}
        //photo={checkCategory(item.name)}
      />
    );
  };

  const logout=()=> {
    AsyncStorage.clear();
    alert("יש להפעיל את האפליקציה מחדש");
    
  };
  
  const filterCategories = types?.filter((obj) => {
    return obj.name.toLowerCase().includes(search.toLowerCase());
  });

  if(isBussiness)
    return(<BussinessCalendar appointment={appointment.filter((obj) => {
      return obj.BussID==myBussiness.Bussiness_Id;
    })}></BussinessCalendar>)
  else
  return (
    <View style={style.normalContainer}>
      <LinearGradient {...linearGradient} />
      <View style={{ backgroundColor: "#ffcce6" }}>
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            padding: 5,
            marginTop: 35,
          }}
        >
          {strings.nameApp}
        </Text>
      <TouchableOpacity onPress={()=>logout()}>
        <Text style={{marginBottom: 5,marginLeft:5}}>{"התנתק"}</Text>
      </TouchableOpacity>
      </View>
      <View
        style={{
          height: 100,
          paddingTop:30,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={[style.widthInput, { position: "relative" }]}>
          <TextInput
            style={[style.input, { textAlign: "center", fontSize: 18 }]}
            onChangeText={onSearch}
            value={search}
            placeholder={strings.search}
          />
          <AntDesign
            style={{ position: "absolute", top: 18, left: 20 }}
            name="search1"
            size={24}
          />
        </View>
        {search.length !== 0 ? (
          <Text style={{ fontSize: 14 }}>
            {strings.search_result} {filterCategories.length}
          </Text>
        ) : null}
      </View>
      <View
        style={{
          height: 180,
          marginTop: 0,
        }}
      >
        <FlatList
          initialNumToRender={5}
          data={filterCategories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.typeId.toString()}
          horizontal={true}
        />
      </View>
      <View
        style={{
          height: 50,
          marginTop: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: width,
            backgroundColor: "#a31ea5",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 0,
            borderWidth: 0,
            marginTop:5
          }}
        >
          <Text style={{color:"#ffffff"}}>{strings.favorite_bussiness}</Text>
        </View>
      </View>
      <View style={{ height: 170, marginTop: 3 }}>
        <FlatList
          initialNumToRender={5}
          data={bussiness?.slice(0, 10)}
          renderItem={renderItem}
          keyExtractor={(item) => item.Bussiness_Id.toString()}
          horizontal={true}
        />
      </View>
    </View>
  );
};
export default HomeSection;
