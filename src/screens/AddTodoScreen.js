import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    RefreshControl,
} from "react-native";
import { RadioButton } from "react-native-paper";

export default function AddTodo() {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        details: "",
        status: "0",
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.details || !formData.status) {
            Alert.alert("Error", "Please fill out all fields");
            return;
        }
        setLoading(true);
        const url = "https://laravel-crud-api-production-223e.up.railway.app/api/todos/new/";
        const data = {
            title: formData.title,
            details: formData.details,
            status: formData.status,
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                Alert.alert("Success", "Todo added successfully");
            } else {
                Alert.alert("Error", "Failed to add Todo. Please try again.");
            }
        } catch (error) {
            Alert.alert("Error", "An error occurred. Please try again.");
            console.error("API Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        setFormData({
            title: "",
            details: "",
            status: "0",
        });
        setRefreshing(false);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <View style={styles.container}>
                        <Text style={styles.title}>New Todo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={formData.title}
                            onChangeText={(value) => handleInputChange("title", value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Details"
                            keyboardType="default"
                            value={formData.details}
                            onChangeText={(value) => handleInputChange("details", value)}
                        />

                        <Text style={styles.label}>Status</Text>
                        <RadioButton.Group
                            onValueChange={(value) => handleInputChange("status", value)}
                            value={formData.status}
                        >
                            <View style={styles.radioContainer}>
                                <RadioButton value="0" />
                                <Text style={styles.radioLabel}>Not Started</Text>
                            </View>
                            <View style={styles.radioContainer}>
                                <RadioButton value="1" />
                                <Text style={styles.radioLabel}>Started</Text>
                            </View>
                            <View style={styles.radioContainer}>
                                <RadioButton value="2" />
                                <Text style={styles.radioLabel}>Completed</Text>
                            </View>
                        </RadioButton.Group>
                        <Button title="ADD" onPress={handleSubmit} />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    radioLabel: {
        marginLeft: 10,
        fontSize: 16,
    },
});
