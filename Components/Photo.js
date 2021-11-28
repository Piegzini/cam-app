import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const Photo = ({ source, id, height, width, selectPhoto, bigPhoto }) => {
  const [selected, setSelected] = useState(null);

  const longPress = () => {
    setSelected(!selected);
    selectPhoto(id);
  };
  return (
    <TouchableOpacity
      onLongPress={() => longPress()}
      onPress={() => bigPhoto(id)}
      style={{
        width: width,
        height: height,
        marginHorizontal: 10,
        marginVertical: 15,
        opacity: selected ? 0.3 : 1,
      }}
    >
      <Image
        style={{
          width: width,
          height: height,
          marginHorizontal: 10,
          marginVertical: 15,
        }}
        source={{ uri: source }}
      />
      <Text style={styles.idText}> {id}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  idText: {
    position: 'absolute',
    top: 15,
    left: 10,
    color: '#fff',
  },
});
export default Photo;
