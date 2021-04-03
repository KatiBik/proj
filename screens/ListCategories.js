import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
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
  const items = props.route.params.bussiness;
  const category = props.route.params.category;
  const type = props.route.params.type;

  useMemo(async () => {
    const result = await getTreatmentByID(type);
    setTreatment(result);
  }, [type]);

  const [search, onSearch] = useState("");

  const renderItem = ({ item }) => <Row item={item} />;

  const filterBussiness = items.filter((obj) => {
    return obj.Bussiness_name.toLowerCase().includes(search.toLowerCase());
  });

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
          {category}
        </Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Home")}
          style={{ position: "absolute", top: 40, left: 20 }}
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
      <FlatList
        style={{ marginTop: 10 }}
        data={filterBussiness || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.Bussiness_Id.toString()}
      />
    </View>
  );
};
export default ListCategories;
