import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";

const CardCategory = (props) => {
  const { item } = props;

  return (
    <TouchableOpacity
      onPress={props.onPress}
      hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
      style={{
        alignItems: "center",
        height: 120,
        margin: 3,
        width: 110,
      }}
    >
      <Text style={{ fontSize: 15, padding: 0 ,marginTop:15,fontWeight:"bold"}}>{item.name}</Text>
      <Image
        source={{ uri:item.photo }}
        //source={{require({photo})}}
        //source={require(photo)}
        style={{
          width: 100,
          height: 100,
          marginTop:0
        }}
      />
    </TouchableOpacity>
  );
};

export default CardCategory;
