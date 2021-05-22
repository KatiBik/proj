import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Card } from 'react-native-paper';

const FavoriteCard = (props) => {
  const item = props.item;
  return (
      <TouchableOpacity
      onPress={props.onPress}
      hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
      style={{
        alignItems: "center",
        height: 170,
        margin: 0,
        width: 170,
      }}>
      <View style={{flex: 1,
        justifyContent: 'center',
        paddingTop:3,
        backgroundColor: '#ecf0f1',
        padding: 8}}>
        <Card style={{ width: '100%', height: '100%', borderRadius: 10 }}>
          <ImageBackground
            style={{
              width: 170,
              height: 170,
              resizeMode: 'contain',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            source={{
              uri: item.photos,
            }}
          />
          <View style={{ position: 'absolute', bottom: 0, left:10,width:'80%'}}>
            <Text
              style={{
                fontSize: 13,
                textAlign:"center",
                color: '#a31ea5',
                padding:5,
                backgroundColor: 'white',
                borderRadius:10,
              }}>
              {item.Bussiness_name}
            </Text>
          </View>

        </Card>
      </View>
      </TouchableOpacity>
    );
};

export default FavoriteCard;