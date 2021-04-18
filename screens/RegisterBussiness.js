import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import style from "../style";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import { NavigateReactContext } from "../components/NavigateProvider";
import strings from "../strings.json";
import { register_bussiness, imageUpload } from "../api";
import { LinearGradient } from "expo-linear-gradient";
import linearGradient from "../components/linearGradient";

const { width } = Dimensions.get("screen");

class RegisterBussinessSection extends React.Component {
  static contextType = NavigateReactContext;
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <RegisterBussiness
        props={this.props}
        state={this.context.state}
        actions={this.context.actions}
      />
    );
  }
}

const RegisterBussiness = ({ props, state, actions }) => {
  const user = state.user;
  const [isRegister, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [summery, setSummery] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

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
    if (
      address.length !== 0 &&
      summery.length !== 0 &&
      name.length !== 0 &&
      image
    ) {
      let url = await imageUpload(image, user.email);
      const bussiness = {
        Bussiness_Id: 0,
        Bussiness_name: name,
        summery: summery,
        phone: user.phone,
        media: "",
        b_address: address,
        points: 0,
        photos: url,
        userEmail: user.email,
        credit_number: user.credit_number,
        credit_validate: user.credit_validate,
        credit_cvv: user.credit_cvv,
        latitude: "",
        longitude: "",
      };
      const bu = await register_bussiness(bussiness);
      actions.setBussiness(bu);
      props.navigation.navigate("Manage");
    } else {
      setRegister(false);
      setError(strings.pleaseFill);
    }
  };
  return (
    <View style={style.normalContainer}>
      <LinearGradient {...linearGradient} />
      <View
        style={{
          height: 80,
          backgroundColor: "#ffcce6",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20, paddingTop: 20 }}>
          {strings.register_manager}
        </Text>
      </View>
      <TouchableOpacity
        hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
        onPress={() => props.navigation.navigate("Manage")}
        style={{ position: "absolute", top: 40, left: 20 }}
      >
        <AntDesign name="right" size={24} />
      </TouchableOpacity>
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 20,
          }}
        >
          <View style={style.widthInput}>
            <Text style={{ paddingRight: 18 }}>{strings.name_bussiness}</Text>
            <TextInput
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
            <Text style={{ paddingRight: 18 }}>{strings.summery}</Text>
            <TextInput
              style={[style.input, { paddingLeft: 50 }]}
              onChangeText={setSummery}
              value={summery}
            />
            <AntDesign name="database" size={24} style={style.positionLogo} />
          </View>
          <View
            style={{
              marginTop: 20,
              height: 100,
              width: width / 1.2,
              borderRadius: 10,
              borderWidth: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ padding: 10, fontSize: 18 }}>
              {strings.info_to_up_photo}
            </Text>
          </View>
          <TouchableOpacity
            hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
            onPress={() => _pickImage()}
            style={{
              marginTop: 20,
              height: 200,
              width: width / 1.2,
              borderRadius: 10,
              borderWidth: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {image ? (
              <ImageBackground
                style={{ height: 200, width: width / 1.2 }}
                resizeMode="cover"
                source={{ uri: image }}
              />
            ) : (
              <AntDesign name="upload" size={40} />
            )}
          </TouchableOpacity>
          {error && (
            <Text style={{ padding: 10, color: "red", fontWeight: "bold" }}>
              {error}
            </Text>
          )}
          <TouchableOpacity
            onPress={() => register()}
            hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
            style={style.btnLogin}
          >
            {isRegister ? (
              <ActivityIndicator size="small" color="#ff4d4d" />
            ) : (
              <Text>{strings.save_changes}</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default RegisterBussinessSection;
