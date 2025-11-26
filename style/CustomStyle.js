import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    padding: 10,
  },
  rememberMe: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  checkbox: {
    marginRight: 5,
    marginLeft: 5
  },
  inputStyle: {
    fontSize: 20,
    borderColor: "rgba(16, 172, 132, 0.5)",
    borderWidth: 2,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    width: "90%",
    marginVertical: 10,
  },
  btnStyle: {
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    width: "60%",
    backgroundColor: "rgba(16, 172, 132, 0.8)",
    borderRadius: 25,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  viewSeparator: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemSpearator: {
    marginVertical: 30,
    height: 2,
    width: "20%",
    backgroundColor: "rgba(16, 172, 132, 0.5)",
  },
  itemText: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  txtError: {
    padding: 10,
    fontSize: 20,
    color: "red",
  },
  recipeItem: {
    marginVertical: 5,
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#dcdde1",
    padding: 10,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#192a56",
  },
  recipeSubtext: {
    fontSize: 16,
    fontWeight: "400",
    color: "#273c75",
  },
  dropdown: {
      margin: 16,
      height: 30,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
      width: "25%"
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
});
