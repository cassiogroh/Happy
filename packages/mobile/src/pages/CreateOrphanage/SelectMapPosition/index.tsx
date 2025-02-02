import React, { useCallback, useState } from 'react';
import { View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';

import mapMarkerImg from '../../../images/map-marker.png';

import styles from './styles';

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0});

  function handleNextStep() {
    navigation.navigate('OrphanageData', {position});
  };

  const handleSelectMapPosition = useCallback((event: MapEvent) => {
    setPosition(event.nativeEvent.coordinate);
  }, []);

  return (
    <View style={styles.container}>
      <MapView 
        initialRegion={{
          latitude: -27.0982053, 
          longitude: -48.9111422,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        {
          position.latitude !== 0 &&
          <Marker 
            icon={mapMarkerImg}
            coordinate={{ latitude: position.latitude, longitude: position.longitude }}
          />
        }
      </MapView>

      {
        position.latitude !== 0 &&
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      }
    </View>
  )
}
