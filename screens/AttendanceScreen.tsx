import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Appbar, Card } from 'react-native-paper';
import theme from '../theme';

interface AttendanceItem {
  id: string;
  date: string;
  hours: string;
  status: string;
}

const attendanceData: AttendanceItem[] = [
  { id: '1', date: '2024-10-01', hours: '1:30 hrs', status: 'Present' },
  { id: '2', date: '2024-10-02', hours: '-', status: 'Absent' },
  { id: '3', date: '2024-10-03', hours: '1:30 hrs', status: 'Present' },
  { id: '4', date: '2024-10-04', hours: '1:30 hrs', status: 'Present' },
  { id: '5', date: '2024-10-05', hours: '-', status: 'Absent' },
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
  const [activeTab, setActiveTab] = useState<'Previous' | 'Current' | 'Custom'>('Current');

  const renderTableHeader = () => (
    <View style={styles.tableRow}>
      <Text style={styles.tableHeader}>Date</Text>
      <Text style={styles.tableHeader}>Hours</Text>
      <Text style={styles.tableHeader}>Status</Text>
    </View>
  );

  const renderTableRows = (data: AttendanceItem[]) => {
    return data.map((item) => (
      <View key={item.id} style={styles.tableRow}>
        <Text style={[styles.tableCell, { color: '#333' }]}>{item.date}</Text>
        <Text style={[styles.tableCell, { color: '#333' }]}>{item.hours}</Text>
        <Text style={[styles.tableCell, { color: getStatusColor(item.status) }]}>
          {item.status}
        </Text>
      </View>
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Previous':
        return (
          <ScrollView style={styles.tableContainer}>
            {renderTableHeader()}
            {renderTableRows(attendanceData)}
          </ScrollView>
        );
      case 'Custom':
        return (
          <ScrollView style={styles.tableContainer}>
            {renderTableHeader()}
            {renderTableRows(attendanceData)}
          </ScrollView>
        );
      case 'Current':
      default:
        return (
          <ScrollView style={styles.tableContainer}>
            {renderTableHeader()}
            {renderTableRows(attendanceData)}
          </ScrollView>
        );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
        <Appbar.Content title="My Attendance" titleStyle={{ color: theme.colors.white }} />
      </Appbar.Header>

      <View style={styles.content}>
        <View style={styles.tabRow}>
          {['Previous', 'Current', 'Custom'].map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab as 'Previous' | 'Current' | 'Custom')}
              style={[styles.tabButton, activeTab === tab && styles.activeTab]}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {renderTabContent()}
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
  tableContainer: {
    marginBottom: 16,
    backgroundColor: theme.colors.white,
    padding: 10,
    borderRadius: 10,
    boxShadow: '0 0 10 1'
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    backgroundColor: theme.colors.background,
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: theme.colors.accent,
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-between',
    gap: 8
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: theme.colors.inactiveTabColor,
    borderRadius: 12
  },
  activeTab: {
    backgroundColor: theme.colors.secondary,
  },
  tabText: {
    color: theme.colors.secondary,
  },
  activeTabText: {
    color: 'white',
  },
});

export default AttendanceScreen;
