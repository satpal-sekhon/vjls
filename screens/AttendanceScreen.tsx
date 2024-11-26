import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Appbar, Card, Text, Button } from 'react-native-paper';
import theme from '../theme';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface AttendanceItem {
  id: string;
  date: string;
  status: string;
}

const attendanceData: AttendanceItem[] = [
  { id: '1', date: '2024-10-01', status: 'Present' },
  { id: '2', date: '2024-10-02', status: 'Absent' },
  { id: '3', date: '2024-10-03', status: 'Present' },
  { id: '4', date: '2024-10-04', status: 'Present' },
  { id: '5', date: '2024-10-05', status: 'Absent' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Present':
      return 'green';
    case 'Absent':
      return 'red';
    default:
      return 'gray';
  }
};

const AttendanceScreen: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filteredData, setFilteredData] = useState(attendanceData);

  const applyFilter = (status: string) => {
    const newData = attendanceData.filter(item => item.status === status);
    setFilteredData(newData);
    setShowFilters(false);
  };

  const renderItem = ({ item }: { item: AttendanceItem }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="bodyMedium">Date: {item.date}</Text>
        <Text variant="bodySmall" style={{ color: getStatusColor(item.status) }}>
          Status: {item.status}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: theme.colors.accent }}>
        <Appbar.Content title="My Attendance" titleStyle={{ color: theme.colors.white }} />
      </Appbar.Header>

      <View style={styles.content}>
        <View style={styles.filterRow}>
          <Button 
            mode="contained" 
            onPress={() => setShowFilters(!showFilters)} 
            style={styles.filterButton}
            icon={() => <FeatherIcon name="filter" size={20} color={theme.colors.white} />}
          >
            {showFilters ? "Hide Filters" : "Apply Filters"}
          </Button>
        </View>

        {showFilters && (
          <Card style={styles.filterContainer}>
            <Card.Content>
              <Text variant="bodyMedium">Filter by:</Text>
              <Button 
                mode="outlined" 
                onPress={() => applyFilter('Present')} 
                style={styles.filterOption}
              >
                Present
              </Button>
              <Button 
                mode="outlined" 
                onPress={() => applyFilter('Absent')} 
                style={styles.filterOption}
              >
                Absent
              </Button>
            </Card.Content>
          </Card>
        )}

        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  filterButton: {
    marginBottom: 16,
    backgroundColor: theme.colors.secondary,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterContainer: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: theme.colors.background,
    borderRadius: 8,
  },
  filterOption: {
    marginVertical: 4,
  },
});

export default AttendanceScreen;
