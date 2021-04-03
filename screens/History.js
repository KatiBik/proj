import React, { useMemo } from "react";
import { View, Text, FlatList } from "react-native";
import style from "../style";
import { NavigateReactContext } from "../components/NavigateProvider";
import strings from "../strings.json";
import Row from "../components/Row";
import { LinearGradient } from "expo-linear-gradient";
import linearGradient from "../components/linearGradient";

class HomeSection extends React.Component {
  static contextType = NavigateReactContext;
  constructor(props) {
    super(props);
  }
  render() {
    return <History state={this.context.state} props={this.props} />;
  }
}
const History = ({ state, props }) => {
  const data = useMemo(() => {
    return state?.appointment?.filter(
      (item) => item.UserEmail === state.user.email
    );
  }, []);

  let bussiness = [];
  for (let i = 0; i < data?.length; i++) {
    const element = data[i];
    const temp = state.bussiness.filter(
      (item) => item.Bussiness_Id === element.BussID
    );
    bussiness.push(temp[0]);
  }

  const renderItem = ({ item }) => <Row item={item} />;

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
          {strings.histtory}
        </Text>
      </View>
      {bussiness?.length === 0 ? (
        <View style={style.container}>
          <Text style={{ fontSize: 18 }}>{strings.not_history}</Text>
        </View>
      ) : (
        <View style={{ marginTop: 20 }}>
          <FlatList
            initialNumToRender={5}
            data={bussiness || []}
            renderItem={renderItem}
            keyExtractor={(item) => item.Bussiness_Id.toString()}
          />
        </View>
      )}
    </View>
  );
};
export default HomeSection;
