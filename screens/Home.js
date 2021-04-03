import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Dimensions } from "react-native";
import style from "../style";
import AntDesign from "react-native-vector-icons/AntDesign";
import CardCategory from "../components/CardCategory";
import { NavigateReactContext } from "../components/NavigateProvider";
import strings from "../strings.json";
import Card from "../components/Card";
import { LinearGradient } from "expo-linear-gradient";
import linearGradient from "../components/linearGradient";

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
  const bussiness = state.bussiness;
  const types = state.types;
  const [search, onSearch] = useState("");
  const renderItem = ({ item }) => (
    <Card
      onPress={
        () => alert(item.Bussiness_name)
        // props.navigation.navigate("ListCategories", {
        //   category: item.Bussiness_name,
        //   bussiness: bussiness.filter((t) =>
        //     t.Bussiness_name.includes(item.name)
        //   ),
        // })
      }
      item={item}
    />
  );
  const checkCategory = (name) => {
    switch (name) {
      case "פנים":
        return "https://kbh.co.il/wp-content/uploads/2020/02/afspraak1.jpg";
      case "גבות":
        return "https://a-static.besthdwallpaper.com/yn-gvz---1920x1440-27988_25.jpg";
      case "עיצוב שיער":
        return "https://cdn.shopify.com/s/files/1/0130/7233/4948/collections/hair-cutting-scissors-959603_1600x.jpg?v=1602901033";
      default:
        return "https://www.resetunlock.com/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png";
    }
  };

  const renderCategory = ({ item }) => {
    const type = types?.find((obj) => obj.name === item.name);
    return (
      <CardCategory
        onPress={() =>
          props.navigation.navigate("ListCategories", {
            category: item.name,
            bussiness: bussiness,
            type: type.typeId,
          })
        }
        item={item}
        photo={checkCategory(item.name)}
      />
    );
  };

  const filterCategories = types?.filter((obj) => {
    return obj.name.toLowerCase().includes(search.toLowerCase());
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
          {strings.nameApp}
        </Text>
      </View>
      <View
        style={{
          height: 100,
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
            name="setting"
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
          marginTop: -20,
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
          marginTop: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: width / 1.5,
            backgroundColor: "#00ace6",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            borderWidth: 1,
          }}
        >
          <Text>{strings.favorite_bussiness}</Text>
        </View>
      </View>
      <View style={{ height: 150, marginTop: 20 }}>
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
