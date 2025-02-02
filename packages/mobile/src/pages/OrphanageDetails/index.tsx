import React, { useCallback, useEffect, useState } from 'react';
import { Image, View, ScrollView, Text, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

import mapMarkerImg from '../../images/map-marker.png';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';
import api from '../../services/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  whatsapp: number;
  images: Array<{
    id: number;
    url: string;
  }>
};

export default function OrphanageDetails() {
  const route = useRoute();
  const [orphanage, setOrphanage] = useState<Orphanage>();

  const { id } = route.params as Pick<Orphanage, 'id'>;

  useEffect(() => {
    api.get(`/orphanages/${id}`).then(response => setOrphanage(response.data));
  }, [id]);

  const handleOpenGoogleMaps = useCallback(() => {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${Number(orphanage?.latitude)},${Number(orphanage?.longitude)}`)
  }, [id]);

  const openWhatsapp = useCallback(() => {
    Linking.openURL(`https://wa.me/${orphanage?.whatsapp}`);
  }, [id]);

  if (!orphanage) {
    return (
      <View>
        <Text style={styles.description} >Carregando...</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {
            orphanage.images.map(image => {
              return (
                <Image
                key={image.id}
                style={styles.image}
                source={{ uri: image.url }} />
              );
            })
          }
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{orphanage.name}</Text>
        <Text style={styles.description}>{orphanage.about}</Text>
      
        <View style={styles.mapContainer}>
          <MapView 
            initialRegion={{
              latitude: Number(orphanage.latitude),
              longitude: Number(orphanage.longitude),
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }} 
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker 
              icon={mapMarkerImg}
              coordinate={{ 
                latitude: Number(orphanage.latitude),
                longitude: Number(orphanage.longitude),
              }}
            />
          </MapView>

          <RectButton onPress={handleOpenGoogleMaps} style={styles.routesContainer}>
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </RectButton>
        </View>
      
        <View style={styles.separator} />

        <Text style={styles.title}>Instruções para visita</Text>
        <Text style={styles.description}>{orphanage.instructions}</Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>{orphanage.opening_hours}</Text>
          </View>

          {orphanage.open_on_weekends ?
          <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
            <Feather name="info" size={40} color="#39CC83" />
            <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>Atendemos fim de semana</Text>
          </View> :
          <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
            <Feather name="info" size={40} color="#FF669D" />
            <Text style={[styles.scheduleText, styles.scheduleTextRed]}>Não atendemos fim de semana</Text>
          </View>
          }
        </View>

        <RectButton style={styles.contactButton} onPress={openWhatsapp}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </RectButton>
      </View>
    </ScrollView>
  )
}
