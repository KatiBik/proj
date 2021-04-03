import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen");

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  normalContainer: { flex: 1 },
  widthInput: {
    width: width / 1.2,
  },
  width,
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    fontSize: 14,
    padding: 10,
    borderRadius: 20,
  },
  animatedImage: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
  },
  logo: {
    width: 200,
    height: 200,
    margin: 40,
  },
  btnLogin: {
    width: width / 2,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  contentLogo: {
    marginTop: -60,
    marginBottom: 50,
    fontSize: 20,
  },
  positionLogo: {
    position: "absolute",
    left: 30,
    top: 37,
  },
  containerRegister: {
    height: 80,
    backgroundColor: "#ffcce6",
    justifyContent: "center",
    alignItems: "center",
  },
  viewOfRegister: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  linearGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
});
