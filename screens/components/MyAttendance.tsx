import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Card, Button } from 'react-native-paper';

// Type for the TabButtons props
interface TabButtonsProps {
    selectedTab: 'last7days' | 'thisMonth';
    setSelectedTab: (tab: 'last7days' | 'thisMonth') => void;
}

// TabButtons Component
const TabButtons: React.FC<TabButtonsProps> = ({ selectedTab, setSelectedTab }) => (
    <View style={styles.tabContainer}>
        <Button
            mode={selectedTab === 'last7days' ? 'contained' : 'outlined'}
            onPress={() => setSelectedTab('last7days')}
            style={[styles.tabButton]}
        >
            Last 7 Days
        </Button>
        <Button
            mode={selectedTab === 'thisMonth' ? 'contained' : 'outlined'}
            onPress={() => setSelectedTab('thisMonth')}
            style={styles.tabButton}
        >
            This Month
        </Button>
    </View>
);

// Type for the AttendanceStats props
interface AttendanceStatsProps {
    absent: number;
    halfDays: number;
    present: number;
}

// AttendanceStats Component
const AttendanceStats: React.FC<AttendanceStatsProps> = ({ absent, halfDays, present }) => (
    <Card>
        <Card.Content style={styles.card}>
            <View style={styles.row}>
                <View style={styles.section}>
                    <Text style={styles.heading}>{absent}</Text>
                    <Text style={styles.label}>Absent</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>{halfDays}</Text>
                    <Text style={styles.label}>Half Days</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>{present}</Text>
                    <Text style={styles.label}>Present</Text>
                </View>
            </View>
        </Card.Content>
    </Card>
);

// MyAttendance Component
const MyAttendance: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<'last7days' | 'thisMonth'>('last7days');

    const renderTabContent = useMemo(() => {
        switch (selectedTab) {
            case 'last7days':
                return <AttendanceStats absent={0} halfDays={4} present={4} />;
            case 'thisMonth':
            default:
                return <AttendanceStats absent={5} halfDays={4} present={4} />;
        }
    }, [selectedTab]);

    return (
        <PaperProvider>
            <Text style={styles.sectionHeading}>My Attendance</Text>
            <View style={styles.container}>
                <Card style={styles.card}>
                    <Card.Content>
                        <TabButtons selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                        {renderTabContent}
                    </Card.Content>
                </Card>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center', // Center the buttons in the row
        marginBottom: 16,
    },
    sectionHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
        marginTop: 18
    },
    tabButton: {
        marginHorizontal: 8,
        flex:1
    },
    card: {
        width: '100%',
        padding: 0,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    section: {
        alignItems: 'center',
        flex: 1,
        padding: 2,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 12,
        marginTop: 8,
    },
});

export default MyAttendance;
