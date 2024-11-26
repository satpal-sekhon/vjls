import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Text, Button } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import theme from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<any>;
};

const ProfileScreen: React.FC<Props> = ({ navigation }) => {

  const logOut = async () => {
    await AsyncStorage.removeItem('@userToken');
    navigation.navigate('HomeTabs');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addressContainer}>
        <View style={styles.avatarContainer}>
          <Avatar.Image size={150} source={{ uri: 'https://via.placeholder.com/150' }} />
          <TouchableOpacity style={styles.editIconContainer}>
            <FeatherIcon name="edit" size={24} color={theme.colors.primary} />
          </TouchableOpacity>

          <Text variant="headlineSmall" style={styles.name}>Satpal Singh Sekhon</Text>
          <Text style={styles.bio}>Armed Guard</Text>

          <View style={[styles.alignCenter, styles.spacingSmallTop]}>
            <FeatherIcon name="map-pin" size={18} color={theme.colors.primary} />
            <Text style={styles.iconText}>Mohali, Chandigarh</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.contactContainer, styles.spacingMediumTop]}>
        <FeatherIcon name="phone" size={24} color={theme.colors.success} />
        <Text variant="titleMedium" style={styles.iconText}>+91 88725 25710</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.contactContainer}>
        <FeatherIcon name="mail" size={24} color={theme.colors.warning} />
        <Text variant="titleMedium" style={styles.iconText}>satpalsekhon@gmail.com</Text>
      </TouchableOpacity>

      <View style={[styles.spaceHorizontal, styles.spacingMediumTop]}>
        <Button 
          mode="contained" 
          icon={() => <FeatherIcon name="log-out" size={20} color={theme.colors.white} />}
          buttonColor={theme.colors.accent} 
          onPress={logOut}>
          Log Out
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 25,
    //marginHorizontal: 15
  },
  spaceHorizontal: {
    marginHorizontal: 15
  },
  avatarContainer: {
    width: '100%',
    alignItems: 'center',
  },
  iconText: {
    marginLeft: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //margin: 10,
    width: '100%',
    padding: 10,
    backgroundColor: theme.colors.white,
    borderRadius: 5,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: theme.colors.white,
    borderRadius: 15,
    padding: 5,
    elevation: 2,
  },
  alignCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  spacingSmallTop: {
    marginTop: 8
  },
  spacingMediumTop: {
    marginTop: 16
  },
  contactContainer: {
    flexDirection: 'row',
    //marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.white
  },
  name: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  bio: {
    marginTop: 5,
    fontStyle: 'italic',
  },
});

export default ProfileScreen;
