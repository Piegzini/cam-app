import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import * as Sharing from 'expo-sharing';
import { deleteAssetsAsync } from 'expo-media-library';

const BigPhoto = ({ route, navigation }) => {
  const { uri, id, height, width } = route.params.photo;
  const deleteOne = async () => {
    await deleteAssetsAsync([id]);
    route.params.refresh();
    navigation.navigate('Gallery');
  };

  const share = async () => {
    await Sharing.shareAsync(uri);
  };
  return (
    <View style={styles.container}>
      <Image
        style={{ height: 400, width: 300, borderRadius: 10 }}
        source={{ uri }}
      />
      <View style={styles.ButtonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => share()}>
          <Text style={{ fontSize: 20 }}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => deleteOne()}>
          <Text style={{ fontSize: 20 }}>Delete</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 20 }}>
        {' '}
        {height}px / {width}px
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDDC39',
  },
  ButtonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  button: {
    flex: 1,
    margin: 10,
    fontSize: 30,
    height: 50,
    width: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default BigPhoto;
