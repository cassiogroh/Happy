import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';

import mapMarker from '../../images/map-marker.png';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useFocusEffect(() => { // Recalls api everytime page reloads
    api.get('/orphanages').then(response => setOrphanages(response.data))
  });

  const navigation = useNavigation();

  const handleNavigateToOrphanageDetails = useCallback((id: number) => {
    navigation.navigate('OrphanageDetails', { id });
  }, []);

  const handleNavigateToCreateOrphanage = useCallback(() => {
    navigation.navigate('SelectMapPosition');
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
        {
          orphanages.map(orphanage => {
            return (<Marker
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2,
                y: 0.8,
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            >
              <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
            )
          })
        }
      </MapView>

      <View style={styles.footer}>
          <Text style={styles.footerText}>
            {orphanages.length}
            {orphanages.length === 0 ? '' :
            (orphanages.length === 1 ?
              ' Orfanato encontrado' :
              ' Orfanatos encontrados'
            )}
          </Text>

          <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
            <Feather name='plus' size={20} color='#FFF' />
          </RectButton>
      </View>
    </View>
  );
};

export default OrphanagesMap;