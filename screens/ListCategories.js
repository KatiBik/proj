import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import style from "../style";
import AntDesign from "react-native-vector-icons/AntDesign";
import Row from "../components/Row";
import { getTreatmentByID } from "../api";
import strings from "../strings.json";
import { LinearGradient } from "expo-linear-gradient";
import linearGradient from "../components/linearGradient";

const ListCategories = (props) => {
  const [treatment, setTreatment] = useState(null);
  const user = props.route.params.user;
  const items = props.route.params.bussiness;
  const category = props.route.params.category;
  const type = props.route.params.type;
  const [sortstyle, setSortStyle] = useState("name");

  useMemo(async () => {
    const result = await getTreatmentByID(type);
    if(result==null) 
      setTreatment([]);
    else
      setTreatment(result);
  }, [type]);

  const [search, onSearch] = useState("");

  const renderItem = ({ item }) => <Row onPress={
    () => props.navigation.navigate("BussinessCard",{bussiness:item,
      treatments: treatment.filter((obj) => {
        return obj.Bussiness_Id==item.Bussiness_Id;
      })})
 
  } item={item} />;

  const [filterBussiness,setSort] = useState(items);

  const SearchBussiness = filterBussiness.filter((obj) => {
    return obj.Bussiness_name.toLowerCase().includes(search.toLowerCase());
  });
  
 
  function sortLocation()
  {
    let t_items = [];
    for(let i=0;i<items.length;i++)
    {
      t_items[i] = items[i];
    }

     var myLong = parseFloat(user.longitude); // whatever your location is
     var myLat = parseFloat(user.latitude); // whatever your location is

     for (let i = 0; i < t_items.length; i++) {
      t_items[i]["distance"] = calculateDistance(myLat,myLong,t_items[i]["latitude"],t_items[i]["longitude"],"K");
      }
      
      let filterBussiness = t_items.sort(function(a, b) { 
        return a.distance - b.distance;
      });

     setSort(filterBussiness);
     setSortStyle("location");
  }

  function sortRank()
  {
      let t_items = [];
      for(let i=0;i<items.length;i++)
      {
        t_items[i] = items[i];
      }
      let filterBussiness = t_items.sort(function(a, b) { 
        return b.points - a.points;
      });

     setSort(filterBussiness);
     setSortStyle("rank");
  }

  function sortName()
  {
      let t_items = [];
      for(let i=0;i<items.length;i++)
      {
        t_items[i] = items[i];
      }
      let filterBussiness = t_items.sort(function(a, b) { 
        if(a.Bussiness_name < b.Bussiness_name) { return -1; }
        if(a.Bussiness_name > b.Bussiness_name) { return 1; }
        return 0;
      });

     setSort(filterBussiness);
     setSortStyle("name");
  }

  function calculateDistance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var radlon1 = Math.PI * lon1/180
    var radlon2 = Math.PI * lon2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
  }

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
          {category}
        </Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Home")}
          style={{ position: "absolute", top: 60, left: 20 }}
          hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
        >
          <AntDesign name="right" size={24} />
        </TouchableOpacity>
      </View>
      <View
        style={{ alignItems: "center", justifyContent: "center", padding: 10 }}
      >
        <View style={[style.widthInput, { position: "relative" }]}>
          <TextInput
            style={[style.input, { textAlign: "center", fontSize: 18 }]}
            onChangeText={onSearch}
            value={search}
            placeholder="חיפוש"
          />
          <AntDesign
            style={{ position: "absolute", top: 18, left: 20 }}
            name="setting"
            size={24}
          />
        </View>
        {search.length !== 0 ? (
          <Text style={{ fontSize: 14 }}>
            {strings.search_result} {filterBussiness.length}
          </Text>
        ) : null}
      </View>

      <View style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly"}}>
      <TouchableOpacity
              
              style={{ marginTop:5,width:"30%",backgroundColor:"#ffffff",marginRight:5,borderRadius:10}}
              hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
              onPress={() => {sortName();}
                
              }
              >
              <Text style={sortstyle == "name" ? instyle.sortactive : instyle.sortnotactive}>לפי שם</Text>
         </TouchableOpacity>
         
        <TouchableOpacity
              
              style={{ marginTop:5,width:"30%",backgroundColor:"#ffffff",marginRight:5,borderRadius:10}}
              hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
              onPress={() => {sortLocation();}  
              }
              >
              <Text style={sortstyle == "location" ? instyle.sortactive : instyle.sortnotactive}>לפי מיקום</Text>
         </TouchableOpacity>
         <TouchableOpacity
              
              style={{ marginTop:5,width:"30%",backgroundColor:"#ffffff",marginRight:5,borderRadius:10}}
              hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
              onPress={() => {sortRank();}
                
              }
              >
              <Text style={sortstyle == "rank" ? instyle.sortactive : instyle.sortnotactive}>לפי דרוג</Text>
         </TouchableOpacity>
         
      </View>

      <FlatList
        style={{ marginTop: 10 }}
        data={SearchBussiness || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.Bussiness_Id.toString()}
      />
    </View>
  );
};

const instyle = StyleSheet.create({
  sortactive:{
    color:"#a31ea5",
    fontWeight: "bold",
    textAlign:"center",
    padding:10
  },
  sortnotactive:{
    color:"#222222",
    fontWeight: "normal",
    textAlign:"center",
    padding:10
  }
});
export default ListCategories;
