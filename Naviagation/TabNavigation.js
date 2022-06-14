import * as React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import CardCollectionScreen from "../Pages/Card/CardCollectionScreen/CardCollectionScreen";
import AddCardScreen from "../Pages/Card/AddCardScreen/AddCardScreen";
import CardTransactionListScreen from "../Pages/Card/CardTransactionListScreen/CardTransactionListScreen";
import MainScreen from "../Pages/MainScreen/MainScreen";
import AddMoneyMainScreen from "../Pages/In/AddMoneyMainScreen/AddMoneyMainScreen";
import AddMoneySource from "../Pages/In/AddMoneySource/AddMoneySource";
import AddMoneySuccessfully from "../Pages/In/AddMoneySuccessfully/AddMoneySuccessfully";
import OutMainScreen from "../Pages/Out/OutMainScreen/OutMainScreen";
import OutContactChatScreen from "../Pages/Out/OutContactChatScreen/OutContactChatScreen";
import OutPayScreen from "../Pages/Out/OutPayScreen/OutPayScreen";
import HistoryMainScreen from "../Pages/MainScreen/History/HistoryMainScreen/HistoryMainScreen";
import HistoryDetails from "../Pages/MainScreen/History/HistoryDetails/HistoryDetails";

const Stack = createStackNavigator();
const d = Dimensions.get("window");

function In() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="AddMoneyMainScreen">
      <Stack.Screen name="AddMoneyMainScreen" component={AddMoneyMainScreen} />
      <Stack.Screen name="AddMoneySource" component={AddMoneySource} />
      <Stack.Screen
        name="AddMoneySuccessfully"
        component={AddMoneySuccessfully}
      />
    </Stack.Navigator>
  );
}

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
      <Stack.Screen name="HistoryMainScreen" component={HistoryMainScreen} />
      <Stack.Screen name="HistoryDetails" component={HistoryDetails} />
    </Stack.Navigator>
  );
}

function Out() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="OutMainScreen" component={OutMainScreen} />
      <Stack.Screen
        name="OutContactChatScreen"
        component={OutContactChatScreen}
      />
      <Stack.Screen name="OutPayScreen" component={OutPayScreen} />
    </Stack.Navigator>
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
          unmountOnBlur: true,
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
          unmountOnBlur: true,
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
          unmountOnBlur: true,
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
          unmountOnBlur: true,
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
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function TabNavigation() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    },
  };
  return <MyTabs />;
}
const styles = StyleSheet.create({
  app: {
    flex: 1,
    width: d.width,
    height: d.height,
    backgroundColor: "#3a245b",
  },
});
