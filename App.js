import React from 'react';
import { View, Text, Dimensions, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from './src/screens/HomeScreen';
import Header from './src/components/Header';
import TodoDetailScreen from './src/screens/TodoDetailScreen';
import AddTodoScreen from './src/screens/AddTodoScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


<>
  <HomeScreen />
  <AddTodoScreen />
  <TodoDetailScreen />
</>


// Create Tab Navigator
const Tab = createBottomTabNavigator();
const deviceWidth = Math.round(Dimensions.get('window').width);

const Stack = createNativeStackNavigator();

// Stack Navigator for Home and Todo Detail
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="TodoDetailScreen" component={TodoDetailScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <>
      <Header label="Todo App" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Add Todo") {
                iconName = focused ? "add" : "add-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
              width: deviceWidth,
            },
            tabBarItemStyle: {
              marginHorizontal: 20,
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Add Todo" component={AddTodoScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );

}
