import React, { useCallback } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';

import mapMarker from '../../images/map-marker.png';

const OrphanagesMap = () => {
  const navigation = useNavigation();

  const handleNavigateToOrphanageDetails = useCallback(() => {
    navigation.navigate('OrphanageDetails');
  }, []);
    
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -27.0982053, 
          longitude: -48.9111422,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}
      >
        <Marker
          icon={mapMarker}
          calloutAnchor={{
            x: 1.8,
            y: 0.8,
          }}
          coordinate={{
            latitude: -27.1240857,
            longitude: -48.9505168,
          }}
        >
          <Callout tooltip onPress={handleNavigateToOrphanageDetails}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Lar menino deus</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
          <Text style={styles.footerText}>
            2 Orfanatos encontrados
          </Text>

          <TouchableOpacity style={styles.createOrphanageButton} onPress={() => {}}>
            <Feather name='plus' size={20} color='#FFF' />
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrphanagesMap;