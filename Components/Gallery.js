import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ToastAndroid, FlatList } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

import Button from './Button';
import Photo from './Photo';

const Gallery = ({ navigation }) => {
  const [photos, setPhotos] = useState([]);
  const [grid, setGrid] = useState(true);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [refresh, setRefresh] = useState(null);

  useEffect(() => {
    const getPhotos = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('brak uprawnień do czytania image-ów z galerii');
        return;
      }
      const album = await MediaLibrary.getAlbumAsync('DCIM');
      const { assets } = await MediaLibrary.getAssetsAsync({
        album: album,
        first: 15, // ilość pobranych assetów
        mediaType: 'photo',
        sortBy: 'creationTime',
      });
      setPhotos(assets);
      setRefresh(false);
    };
    getPhotos().then(() => setTimeout(() => console.log('-')));
  }, [refresh]);

  const pushRefresh = () => setRefresh(true);

  const selectPhoto = (id) => {
    const current = selectedPhotos;
    const indexOfPhoto = current.findIndex((element) => element === id);
    if (indexOfPhoto === -1) {
      current.push(id);
    } else {
      current.splice(indexOfPhoto, 1);
    }

    setSelectedPhotos(current);

    setTimeout(() => console.log(selectedPhotos), 100);
  };

  const deleteSelectedPhotos = async () => {
    await MediaLibrary.deleteAssetsAsync(selectedPhotos);
    setSelectedPhotos([]);
    setRefresh(true);

    ToastAndroid.showWithGravity(
      'Deleted',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const goToBigPhoto = (id) => {
    const photo = photos.find((element) => element.id === id);
    navigation.navigate('BigPhoto', { photo, refresh: pushRefresh });
  };

  const renderPhoto = ({ item }) => {
    const width = grid ? 100 : '95%';
    const height = grid ? 100 : 150;
    return (
      <Photo
        source={item.uri}
        id={item.id}
        height={height}
        width={width}
        selectPhoto={selectPhoto}
        bigPhoto={goToBigPhoto}
      />
    );
  };

  return (
    <View style={styles.gallery__wrapper}>
      <View style={styles.gallery__options}>
        <Button
          text={'Grid / List'}
          press={() => {
            setGrid(!grid);
          }}
        />
        <Button
          text={'Open Camera'}
          press={() =>
            navigation.navigate('CameraScreen', { refresh: pushRefresh })
          }
        />
        <Button text={'Remove selected'} press={() => deleteSelectedPhotos()} />
      </View>
      <View style={styles.gallery__photos}>
        {grid ? (
          <FlatList
            numColumns={3}
            key={3}
            data={photos}
            renderItem={renderPhoto}
            keyExtractor={({ id }) => id + ''}
          />
        ) : (
          <FlatList
            data={photos}
            renderItem={renderPhoto}
            keyExtractor={({ id }) => id + ''}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  gallery__wrapper: {
    flex: 1,
    backgroundColor: '#CDDC39',
  },
  gallery__options: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  gallery__photos: {
    flex: 4.5,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
});
export default Gallery;
