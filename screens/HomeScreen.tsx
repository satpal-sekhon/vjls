import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Text, ActivityIndicator, Button } from 'react-native-paper';
import theme from '../theme';
import PunchButton from './components/PunchButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import UpcomingHolidays from './components/UpcomingHolidays';
import LeaveStatus from './components/LeaveCount';
import MyAttendance from './components/MyAttendance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Skeleton } from '@rneui/themed';
import axios from 'axios';
import config from '../config';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [user, setUser] = useState() as any;
  const [stats, setStats] = useState({}) as any;

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await AsyncStorage.getItem('@userInfo');
      if (userInfo) {
        setUser(JSON.parse(userInfo));
      }
    };

    const fetchStats = async () => {
      const userToken = await AsyncStorage.getItem('@userToken');
      const response = await axios.get(`${config.apiEndpoint}stats`, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
      const { success } = response.data;
      if (success) {
        setStats(response.data);
      }
    }

    fetchUserInfo();
    fetchStats();
  }, [])

  return (
    <ScrollView style={styles.container}>
      {!user ?
        <Skeleton width={180} height={18} style={{ marginBottom: 6 }} /> :
        <Title style={{ marginBottom: 6 }}>Welcome {user?.first_name}!</Title>}

      {stats.today_duty && stats.today_duty.client_site ? <>
        <Card style={{ backgroundColor: theme.colors.white }}>
          <Card.Content>
            <View style={[styles.locationContainer]}>
              <FeatherIcon name="map-pin" size={18} color={theme.colors.primary} style={styles.locationIcon} />
              <Title>Today's Location</Title>
            </View>
            <Paragraph style={[styles.locationText]}>Today is your duty at: <Text style={{ fontWeight: 'bold' }}>{stats.today_duty.client_site.location_code}</Text></Paragraph>
          </Card.Content>
        </Card>
        <PunchButton />
      </>
        : <Card style={{ backgroundColor: theme.colors.warning }}>
          <Card.Content>
            <View style={[styles.locationContainer]}>
              <FeatherIcon name="alert-circle" size={18} color={theme.colors.white} style={styles.locationIcon} />
              <Title style={{ color: theme.colors.white, fontSize: 16 }}>Duty is not assigned to you for today</Title>
            </View>
          </Card.Content>
        </Card>
      }

      <UpcomingHolidays />

      <LeaveStatus />

      <MyAttendance />

      <Button
        mode="outlined"
        icon='calendar-edit'
        onPress={() => navigation.navigate('ApplyLeave')}
        style={[styles.linkButton, { marginBottom: 25 }]}
        labelStyle={{ color: theme.colors.primary }}
      >
        Apply Leave
      </Button>

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
    borderColor: theme.colors.primary
  },
});

export default HomeScreen;
