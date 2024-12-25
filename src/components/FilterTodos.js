import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

const FilterTodos = ({ onFilterChange }) => {
    const [selectedFilter, setSelectedFilter] = useState("all");

    const handleFilterChange = (itemValue) => {
        setSelectedFilter(itemValue);
        onFilterChange(itemValue);
    };
    // const handleFilterChange = async (itemValue) => {
    //     setSelectedFilter(itemValue);
    //     Alert.alert(itemValue)
    //     if (itemValue !== 'all') {

    //         try {
    //             const response = await fetch(`https://laravel-crud-api-production-223e.up.railway.app/api/todos/status/${itemValue}`);
    //             if (!response.ok) {
    //                 throw new Error("Failed to fetch filtered todos");
    //             }
    //             const data = await response.json();
    //             console.log("Filtered todos:", data); // Replace this with state updates or UI changes
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     }
    // };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Sort By:</Text>
            <Picker
                selectedValue={selectedFilter}
                style={styles.picker}
                onValueChange={(itemValue) => handleFilterChange(itemValue)}
            >
                <Picker.Item label="All" value="all" />
                <Picker.Item label="Not Started" value="0" />
                <Picker.Item label="Pending" value="1" />
                <Picker.Item label="Completed" value="2" />
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center'
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
    },
    picker: {
        height: 50,
        width: 200,
    },
});

export default FilterTodos;
