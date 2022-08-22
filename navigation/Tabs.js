import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "../screens/Home";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

const Options = (route, color) => {
  let iconName;

  switch (route.name) {
    case "Home":
      iconName = "home-outline";
      break;
    case "Search":
      iconName = "magnify";
      break;
    default:
      break;
  }

  return (
    <Icon name={iconName} color={color} size={50} style={{ marginTop: 30 }} />
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ color }) => Options(route, color),

        tabBarStyle: {
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          marginBottom: 40,
          marginHorizontal: 20,
          height: 120,
          //   borderWidth: 1,
          borderTopWidth: 0,
          borderRadius: 20,
          ...styles.shadow,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    // shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
