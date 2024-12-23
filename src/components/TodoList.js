import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';


const getStatusText = (status) => {
    if (status === "2") {
        return "✔️ Completed";
    } else if (status === "1") {
        return "⌚ Pending";
    } else {
        return "❌ Incomplete";
    }
};

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const navigation = useNavigation();


    const handleNavigate = (todo) => {
        navigation.navigate('TodoDetailScreen', { todo });
    };

    const fetchTodos = async (pageNum = 1) => {
        const url = `https://laravel-crud-api-production-223e.up.railway.app/api/todos?page=${pageNum}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            if (result.todos.data.length > 0) {
                setTodos((prevTodos) => [...prevTodos, ...result.todos.data]);
                setPage(pageNum);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching todos:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchTodos();
    }, []);

    // Pull-to-refresh handler
    const handleRefresh = () => {
        setRefreshing(true);
        setHasMore(true);
        setTodos([]);
        fetchTodos(1);
    };

    // Load more handler when reaching the bottom of the list
    const handleLoadMore = () => {
        if (!loading && hasMore) {
            setLoading(true);
            fetchTodos(page + 1);
        }
    };

    // Render each todo item
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleNavigate(item)}>
            <View style={styles.todoItem}>
                <Text style={styles.todoTitle}>{item.title}</Text>
                <Text>Status: {getStatusText(item.status)}</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading && todos.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading Todos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={todos}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }

                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    loading && hasMore ? (
                        <View style={styles.loadingMoreContainer}>
                            <ActivityIndicator size="small" color="#0000ff" />
                            <Text>Loading more...</Text>
                        </View>
                    ) : null
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        marginBottom: 15,
    },
    todoItem: {
        padding: 15,
        marginVertical: 8,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    todoTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default TodoList;


