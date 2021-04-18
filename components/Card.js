import React from "react";
import { TouchableOpacity, Image } from "react-native";
const Card = (props) => {
  const item = props.item;
  return (
    <TouchableOpacity
      onPress={props.onPress}
      hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
      style={{
        alignItems: "center",
        height: 150,
        margin: 10,
        width: 150,
      }}
    >
      <Image
        source={{ uri: item.photos }}
        style={{
          width: 150,
          height: 150,
        }}
      />
    </TouchableOpacity>
  );
};

export default Card;
