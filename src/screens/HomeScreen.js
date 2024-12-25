import {React, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text } from "react-native";
import TodoList from "../components/TodoList";
import FilterTodos from "../components/FilterTodos";



const HomeScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    
  };

  return (
    <View style={styles.container}>
      <FilterTodos onFilterChange={handleFilterChange} />
      <TodoList filter={selectedFilter} />
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