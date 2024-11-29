import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, IconButton } from 'react-native-paper';

const LeaveStatus = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionHeading}>My Leave Count</Text>

            <Card>
                <Card.Content style={styles.card}>
                    <View style={styles.row}>
                        <View style={styles.section}>
                            <Text style={styles.heading}>0</Text>
                            <Text style={styles.label}>Pending</Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.heading}>4</Text>
                            <Text style={styles.label}>Approved</Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.heading}>4</Text>
                            <Text style={styles.label}>Rejected</Text>
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sectionHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    section: {
        alignItems: 'center',
        flex: 1,
        padding: 2,
    },
    card: {
        marginHorizontal: 8,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 12,
        marginTop: 8,
    },
    arrowIcon: {
        position: 'absolute',
        top: '20%',
        right: 0,
        transform: [{ translateY: -12 }],
    },
});

export default LeaveStatus;
