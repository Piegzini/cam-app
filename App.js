import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();


import Main from './Components/Main';
import Gallery from './Components/Gallery';
import CameraScreen from "./Components/CameraScreen";
import BigPhoto from "./Components/BigPhoto";

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Main" component={Main} options={{headerShown: false }}  />
              <Stack.Screen name="Gallery" component={Gallery}  />
              <Stack.Screen name="CameraScreen" component={CameraScreen} />
              <Stack.Screen name="BigPhoto" component={BigPhoto} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}

