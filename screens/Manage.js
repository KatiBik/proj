import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import style from "../style";
import { NavigateReactContext } from "../components/NavigateProvider";
import AntDesign from "react-native-vector-icons/AntDesign";
import strings from "../strings.json";
import * as ImagePicker from "expo-image-picker";
import { imageUpload, put_bussiness } from "../api";
import { LinearGradient } from "expo-linear-gradient";
import linearGradient from "../components/linearGradient";

class ManageSection extends React.Component {
  static contextType = NavigateReactContext;
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Manage
        actions={this.context.actions}
        state={this.context.state}
        props={this.props}
      />
    );
  }
}
const Manage = ({ state, props, actions }) => {
  const photo = state?.myBussiness?.photos;
  const [isRegister, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [summery, setSummery] = useState("");
  const [image, setImage] = useState(state?.myBussiness?.photos);
  const disabled =
    photo !== image ||
    name.length !== 0 ||
    name.length !== 0 ||
    address.length !== 0 ||
    summery.length !== 0;

  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (E) {
      console.log(E);
    }
  };
  const register = async () => {
    setRegister(true);
    let url = state?.myBussiness?.photos;
    if (photo !== image) {
      url = await imageUpload(image, state.user.email);
    }
    const bussiness = {
      Bussiness_Id: state?.myBussiness?.Bussiness_Id,
      Bussiness_name:
        name.length === 0 ? state?.myBussiness?.Bussiness_name : name,
      summery: summery.length === 0 ? state?.myBussiness?.summery : summery,
      phone: state.user.phone,
      media: "",
      b_address: address.length === 0 ? state?.myBussiness?.b_address : address,
      points: state.myBussiness.points,
      photos: url,
      userEmail: state.user.email,
      credit_number: state.user.credit_number,
      credit_validate: state.user.credit_validate,
      credit_cvv: state.user.credit_cvv,
      latitude: "",
      longitude: "",
    };
    const bu = await put_bussiness(bussiness);
    actions.setBussiness(bu);
    setRegister(false);
  };

  if (state.isBussiness) {
    return (
      <KeyboardAvoidingView behavior="position" style={style.normalContainer}>
        <LinearGradient {...linearGradient} />
        <View style={{ backgroundColor: "#ffcce6" }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              padding: 20,
              marginTop: 20,
            }}
          >
            {strings.manage_bussiness}
          </Text>

          <TouchableOpacity
            hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
            style={{ position: "absolute", top: 38, left: 25 }}
            onPress={() => _pickImage()}
          >
            <AntDesign name="camerao" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
            style={{ position: "absolute", top: 40, right: 20 }}
            onPress={() => props.navigation.navigate("Messages")}
          >
            <AntDesign name="message1" size={27} />
          </TouchableOpacity>
        </View>

        <ImageBackground
          resizeMode="cover"
          source={{
            uri: image ? image : "abc",
          }}
          style={{ height: 200 }}
        />
        <View
          style={{
            marginTop: 20,
            height: 400,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ScrollView>
            <View style={style.widthInput}>
              <Text style={{ paddingRight: 18, textAlign: "left" }}>
                {strings.name_bussiness}
              </Text>
              <TextInput
                placeholder={state.myBussiness.Bussiness_name}
                style={[style.input, { paddingLeft: 50 }]}
                onChangeText={setName}
                value={name}
              />
              <AntDesign name="barcode" size={24} style={style.positionLogo} />
            </View>
            <View style={style.widthInput}>
              <Text style={{ paddingRight: 18 }}>{strings.address}</Text>
              <TextInput
                style={[style.input, { paddingLeft: 50 }]}
                onChangeText={setAddress}
                value={address}
                placeholder={strings.address_in_eng}
              />
              <AntDesign name="pushpin" size={24} style={style.positionLogo} />
            </View>
            <View style={style.widthInput}>
              <Text style={{ paddingRight: 18, textAlign: "left" }}>
                {strings.summery}
              </Text>
              <TextInput
                placeholder={state.myBussiness.summery}
                style={[style.input, { paddingLeft: 50 }]}
                onChangeText={setSummery}
                value={summery}
              />
              <AntDesign name="database" size={24} style={style.positionLogo} />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                disabled={!disabled}
                onPress={() => register()}
                hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
                style={style.btnLogin}
              >
                {isRegister ? (
                  <ActivityIndicator size="small" color="#ff4d4d" />
                ) : (
                  <Text>{strings.finish_edit}</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  } else {
    return (
      <View style={style.normalContainer}>
        <LinearGradient {...linearGradient} />
        <View style={{ backgroundColor: "#ffcce6" }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              padding: 20,
              marginTop: 20,
            }}
          >
            {strings.manage_bussiness}
          </Text>
        </View>
        <View style={style.container}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("RegisterBussiness")}
            style={{
              width: 200,
              height: 50,
              borderRadius: 20,
              borderWidth: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>{strings.not_have_bussiness}</Text>
            <Text>{strings.press_to_Bussiness}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};
export default ManageSection;
