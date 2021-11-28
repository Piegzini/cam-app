import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  Animated,
} from 'react-native';
import { Camera } from 'expo-camera';
import { createAssetAsync, getAlbumAsync } from 'expo-media-library';
import RadioGroup from './RadioGroup';

const CameraScreen = ({ route }) => {
  const [hasCameraPermission, setCameraPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [supportedRatios, setSupportedRatios] = useState(null);
  const [supportedSizes, setSupportedSizes] = useState(null);

  const [currentRatio, setCurrentRatio] = useState(null);
  const [currentSize, setCurrentSize] = useState(null);
  const [currentWhiteBalance, setCurrentWhiteBalance] = useState(null);
  const [currentFlash, setCurrentFlash] = useState(null);

  const [hidden, setHidden] = useState(false);
  const startingPosition = useRef(new Animated.Value(0)).current;
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    const getRatios = async () => {
      if (!cameraRef) return;
      const ratios = await cameraRef.getSupportedRatiosAsync();
      setSupportedRatios(ratios);
    };
    getRatios().then();
  }, [cameraRef]);

  useEffect(() => {
    const getPermision = async () => {
      let { status } = await Camera.requestCameraPermissionsAsync();
      const permissions = status == 'granted';
      setCameraPermission(permissions);
    };
    getPermision().then();
  }, []);

  useEffect(() => {
    console.log('kurwa aktuwyje sie ');
    const getSizes = async () => {
      const sizes = await cameraRef.getAvailablePictureSizesAsync('16:9');
      setSupportedSizes(sizes);
    };
    getSizes().then(() => console.log('siu'));
  }, [supportedRatios]);

  const toggle = () => {
    let toPos;
    if (hidden) toPos = 30;
    else toPos = 800;

    //animacja

    Animated.spring(startingPosition, {
      toValue: toPos,
      velocity: 1,
      tension: 0,
      friction: 10,
      useNativeDriver: true,
    }).start();

    setHidden(!hidden);
  };

  if (hasCameraPermission == null) {
    return <View />;
  } else if (hasCameraPermission == false) {
    return <Text>brak dostępu do kamery</Text>;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Camera
          ref={(ref) => {
            if (ref) {
              setCameraRef(ref);
            }
          }}
          style={{ flex: 1 }}
          ratio={currentRatio}
          whiteBalance={currentWhiteBalance}
          flashMode={currentFlash}
          pictureSize={currentSize}
          type={cameraType}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.makePhoto}
              onPress={async () => {
                if (cameraRef) {
                  const foto = await cameraRef.takePictureAsync();
                  const album = await getAlbumAsync('Camera');
                  const asset = await createAssetAsync(foto.uri); // domyślnie zapisuje w folderze DCIM
                  route.params.refresh();
                  ToastAndroid.showWithGravity(
                    'Zrobione',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                  );
                }
              }}
            />
            <TouchableOpacity
              style={styles.changePhoto}
              onPress={() => {
                const type =
                  cameraType === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back;
                setCameraType(type);
              }}
            />

            <TouchableOpacity
              style={styles.showOptions}
              onPress={() => {
                toggle();
              }}
            >
              <Text
                style={{
                  fontSize: 40,
                  color: '#fff',
                  textAlign: 'center',
                  lineHeight: 55,
                }}
              >
                {' O '}
              </Text>
            </TouchableOpacity>

            <Animated.View
              style={[
                styles.animatedView,
                {
                  transform: [{ translateY: startingPosition }],
                },
              ]}
            >
              <ScrollView style={styles.options}>
                <RadioGroup
                  title={'White Balance'}
                  values={Object.keys(Camera.Constants.WhiteBalance)}
                  changeCurrent={(value) => setCurrentWhiteBalance(value)}
                />
                <RadioGroup
                  title={'Flash Mode'}
                  values={Object.keys(Camera.Constants.FlashMode)}
                  changeCurrent={(value) => setCurrentFlash(value)}
                />
                {supportedRatios ? (
                  <RadioGroup
                    title={'Ratios'}
                    values={supportedRatios}
                    changeCurrent={(value) => setCurrentRatio(value)}
                  />
                ) : null}
                {supportedSizes ? (
                  <RadioGroup
                    title={'Sizes'}
                    values={supportedSizes}
                    changeCurrent={(value) => setCurrentSize(value)}
                  />
                ) : null}
              </ScrollView>
            </Animated.View>
          </View>
        </Camera>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  makePhoto: {
    height: 80,
    width: 80,
    borderRadius: 50,
    borderColor: 'red',
    borderStyle: 'solid',
    backgroundColor: '#CDDC39',
    position: 'absolute',
    bottom: 40,
    left: 150,
  },
  changePhoto: {
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: '#CDDC39',
    position: 'absolute',
    bottom: 50,
    left: 70,
  },
  options: {
    width: 150,
    height: 500,
  },
  animatedView: {
    position: 'absolute',
    top: 30,
    left: 30,
    width: 150,
    height: 500,
    backgroundColor: 'transparent',
  },
  showOptions: {
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: '#CDDC39',
    position: 'absolute',
    bottom: 50,
    left: 250,
  },
});

export default CameraScreen;
