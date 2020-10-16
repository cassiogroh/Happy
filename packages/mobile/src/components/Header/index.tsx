import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import styles from './styles';

interface HeaderProps {
  title: string;
  showCancel?: boolean;
};

const Header = ({ title, showCancel = true }: HeaderProps) => {
  const navigation = useNavigation();

  const handleGoBackToAppHomePage = useCallback(() => {
    navigation.navigate('OrphanagesMap');
  }, []);

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name='arrow-left' size={24} color='#15B6D6' />
      </BorderlessButton>

      <Text style={styles.title}>
        {title}
      </Text>

      {
        showCancel ?
        <BorderlessButton onPress={handleGoBackToAppHomePage}>
          <Feather name='x' size={24} color='#FF669D' />
        </BorderlessButton> :
        <View />
      }
    </View>
  )
}

export default Header;