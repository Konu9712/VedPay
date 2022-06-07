import * as React from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import CardCollectionScreen from "../Pages/Card/CardCollectionScreen/CardCollectionScreen";
import AddCardScreen from "../Pages/Card/AddCardScreen/AddCardScreen";
import CardTransactionListScreen from "../Pages/Card/CardTransactionListScreen/CardTransactionListScreen";
import MainScreen from "../Pages/MainScreen/MainScreen";

const Stack = createStackNavigator();
const d = Dimensions.get("window");

function Card() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="CardCollectionScreen"
        component={CardCollectionScreen}
      />
      <Stack.Screen name="AddCardScreen" component={AddCardScreen} />
      <Stack.Screen
        name="CardTransactionListScreen"
        component={CardTransactionListScreen}
      />
    </Stack.Navigator>
  );
}

function Main() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MainScreen" component={MainScreen} />
    </Stack.Navigator>
  );
}

function In() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>In!</Text>
    </View>
  );
}

function Out() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Out!</Text>
    </View>
  );
}

function Settings() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      tabBarOptions={{
        activeTintColor: "green",
      }}
    >
      <Tab.Screen
        name="In"
        component={In}
        options={{
          tabBarLabel: "In",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="arrow-down-bold-box"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Card"
        component={Card}
        options={{
          // tabBarVisible: false,
          tabBarLabel: "Card",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="card-bulleted"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarLabel: "Main",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wallet" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Out"
        component={Out}
        options={{
          tabBarLabel: "Out",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="arrow-up-bold-box"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Naviagation() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <ImageBackground
        style={styles.app}
        source={require("../assets/background.png")}
        imageStyle={{ resizeMode: "repeat" }}
      >
        <MyTabs />
      </ImageBackground>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  app: {
    flex: 1,
    width: d.width,
    height: d.height,
    backgroundColor: "#3a245b",
  },
});
