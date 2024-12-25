import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const getStatusText = (status) => {
    if (status === "2") {
        return "Completed";
    } else if (status === "1") {
        return "Pending";
    } else {
        return "Not Started";
    }
};

const TodoDetail = ({ route, navigation }) => {
    const { todo } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Title: {todo.title}</Text>
            <Text style={styles.text}>Status: {getStatusText(todo.status)}</Text>
            <Text style={styles.text}>Details: {todo.details}</Text>
            <Text style={styles.text}>Created on: {new Date(todo.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            })}</Text>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        display: 'flex',
        marginTop: 20,

    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
});

export default TodoDetail;
