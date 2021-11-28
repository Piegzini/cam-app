import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
const Main = ({navigation}) => {

    return (
        <View style={styles.welcome_wrapper}>
            <TouchableOpacity onPress={() => navigation.navigate('Gallery')}>
                <Text style={styles.welcome__title}>Camera App</Text>
            </TouchableOpacity>
            <Text style={styles.welcome__subTitle}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </Text>
        </View>
    );
}


const {height, width} = Dimensions.get('window')
const styles = StyleSheet.create({
    welcome_wrapper:{
        flex: 1,
        backgroundColor: '#CDDC39',
        marginTop: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome__title:{
        fontWeight: 'bold',
        fontSize: 0.09 * height,
        color: '#212121',
        textAlign:'center',
        marginBottom: 30,
    },
    welcome__subTitle:{
        fontSize: 0.04 * height,
        color: '#212121',
        textAlign:'center',
    }
})

export default Main;
