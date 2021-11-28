import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const RadioGroup = ({ option, press, isSelected }) => {
  useEffect(() => {}, []);
  return (
    <TouchableOpacity
      style={{
        height: 50,
        width: 130,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => {
        press();
      }}
    >
      <View
        style={{
          height: 30,
          width: 30,
          borderRadius: 30,
          backgroundColor: '#ddd',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isSelected ? (
          <View
            style={{
              backgroundColor: '#CDDC39',
              height: 20,
              width: 20,
              borderRadius: 20,
            }}
          ></View>
        ) : null}
      </View>
      <Text style={{ marginLeft: 10, color: 'white', fontSize: 15 }}>
        {option}
      </Text>
    </TouchableOpacity>
  );
};

export default RadioGroup;
