import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";

const CardCategory = (props) => {
  const { item, photo } = props;

  return (
    <TouchableOpacity
      onPress={props.onPress}
      hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
      style={{
        alignItems: "center",
        height: 200,
        margin: 10,
        width: 150,
      }}
    >
      <Text style={{ fontSize: 15, padding: 10 }}>{item.name}</Text>
      <Image
        source={{ uri: photo }}
        style={{
          width: 150,
          height: 150,
        }}
      />
    </TouchableOpacity>
  );
};

export default CardCategory;
