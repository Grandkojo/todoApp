import React from "react";
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text } from "react-native";
import TodoList from "../components/TodoList";



const HomeScreen = () => {
  return (
    <View style={styles.container}>
        <TodoList/>
        <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      // justifyContent: 'center',
    },
  });
  

export default HomeScreen;