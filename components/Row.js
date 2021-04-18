import React from "react";
import {
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Rating from "../components/Rating";

const { width } = Dimensions.get("screen");

const Row = (props) => {
  const item = props.item;
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
  return (
    <TouchableOpacity onPress={() => alert("hey")} style={{ marginTop: 10 }}>
      <View
        style={{
          height: 80,
          flexDirection: "row",
          backgroundColor: "white",
          margin: 10,
          borderRadius: 10,
          marginTop: -10,
        }}
      >
        <Image
          source={{ uri: item.photos ? item.photos : "abc" }}
          style={{
            width: 80,
            height: "100%",
          }}
        />
        <View
          style={{
            padding: 10,
            backgroundColor: "white",
            justifyContent: "space-between",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Text style={{ fontWeight: "bold", textAlign: "left" }}>
            {item.Bussiness_name}
          </Text>
          <Text style={{ textAlign: "left" }}>{item.b_address}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text>דירוג:</Text>
            <Rating rating={points} />
          </View>
        </View>
        <TouchableOpacity
          style={{ position: "absolute", top: 15, right: 10 }}
          hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
        >
          <MaterialCommunityIcons
            onPress={() => goToPlace()}
            name="waze"
            size={40}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Row;
