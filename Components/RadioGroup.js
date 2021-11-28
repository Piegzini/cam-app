import React, { useState } from 'react';
import { View, Text } from 'react-native';
import RadioButton from './RadioButton';

const RadioGroup = ({ title, values, changeCurrent }) => {
  const [selected, setSelected] = useState();
  const newValues = values.map((element, index) => {
    const selected = index === values.length - 1;

    return { value: element, selected };
  });
  const [data, setData] = useState(newValues);

  const changeSelected = (value) => {
    const tempData = data.map((element) => {
      if (value === element.value) {
        element.selected = true;
        changeCurrent(element.value);
        setSelected(element);
      } else if (element.selected === true) {
        element.selected = false;
      }
      return element;
    });
    setData(tempData);
    console.log(selected);
  };
  return (
    <View>
      <Text style={{ color: 'white', fontSize: 17 }}>{title}</Text>
      {data.map(({ value, selected }) => {
        return (
          <RadioButton
            option={value}
            isSelected={selected}
            press={() => changeSelected(value)}
          />
        );
      })}
    </View>
  );
};

export default RadioGroup;
