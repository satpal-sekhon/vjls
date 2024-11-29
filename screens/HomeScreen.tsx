import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Text, ActivityIndicator } from 'react-native-paper';
import theme from '../theme';
import PunchButton from './components/PunchButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import UpcomingHolidays from './components/UpcomingHolidays';
import LeaveStatus from './components/LeaveCount';
import MyAttendance from './components/MyAttendance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Skeleton } from '@rneui/themed';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [user, setUser] = useState(null) as any;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await AsyncStorage.getItem('@userInfo');
        if (userInfo) {
          setUser(JSON.parse(userInfo));
        }
      } catch (error) {
        console.error('Error fetching user info', error);
      }
    };

    fetchUserInfo();
  }, [])

  return (
    <ScrollView style={styles.container}>
      {!user ? 
      <Skeleton width={180} height={18} style={{ marginBottom: 6 }} /> : 
      <Title style={{ marginBottom: 6 }}>Welcome {user?.first_name}!</Title> }

      <Card style={{ backgroundColor: theme.colors.white }}>
        <Card.Content>
          <View style={[styles.locationContainer]}>
            <FeatherIcon name="map-pin" size={18} color={theme.colors.primary} style={styles.locationIcon} />
            <Title>Today's Location</Title>
          </View>
          <Paragraph style={[styles.locationText]}>Today is your duty at: <Text style={{ fontWeight: 'bold' }}>{`Mohali, Chandigarh`}</Text></Paragraph>
        </Card.Content>
      </Card>

      <PunchButton />

      <UpcomingHolidays />

      <LeaveStatus />

      <MyAttendance />

      {/* <View style={styles.linksContainer}>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('FAQ')}
          style={styles.linkButton}
          labelStyle={{ color: theme.colors.primary }}
        >
          Apply Leave
        </Button>
        <Button
          mode="text"
          onPress={() => navigation.navigate('FAQ')}
          style={styles.linkButton}
          labelStyle={{ color: theme.colors.primary }}
        >
          FAQ
        </Button>
        <Button
          mode="text"
          onPress={() => navigation.navigate('HelpAndComplaints')}
          style={styles.linkButton}
          labelStyle={{ color: theme.colors.primary }}
        >
          Help & Complaints
        </Button>
        <Button
          mode="text"
          onPress={() => navigation.navigate('EmergencyContact')}
          style={styles.linkButton}
          labelStyle={{ color: theme.colors.primary }}
        >
          Emergency Contact
        </Button>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  locationIcon: {
    paddingRight: 6,
    fontWeight: '900'
  },
  locationText: {
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  linksContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  linkButton: {
    marginVertical: 5,
  },
});

export default HomeScreen;
