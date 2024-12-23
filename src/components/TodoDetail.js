import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const TodoDetail = ({ route, navigation }) => {
    const { todo } = route.params; 
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{todo.title}</Text>
            <Text>Status: {getStatusText(todo.status)}</Text>
            <Text>{todo.details}</Text>

            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
});

export default TodoDetail;
