import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import theme from '../theme';
import PunchButton from './components/PunchButton';
import FeatherIcon from 'react-native-vector-icons/Feather';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <View style={[styles.locationContainer]}>
            <FeatherIcon name="map-pin" size={18} color={theme.colors.primary} style={styles.locationIcon} />
            <Title>Today's Location</Title>
          </View>
          <Paragraph>Today is your duty at: <Text style={{ fontWeight: 'bold' }}>{`National Water Comission`}</Text></Paragraph>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <PunchButton />
      </View>

      <View style={styles.linksContainer}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
