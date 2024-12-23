import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

const deviceWidth = Math.round(Dimensions.get('window').width);

const Header = ({label}) => {
    return (
        <View style={styles.headerStyle}>
            <Text style={styles.textStyle}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerStyle:{
        width: deviceWidth,
        height: 90,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20,
        backgroundColor: 'cornflowerblue'
    },
    textStyle: {
        fontSize: 30,
        fontWeight: '700'
    }
});

export default Header;