import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Card, Text, TextInput, Button } from 'react-native-paper';
import DatePicker from 'react-native-date-picker'; // Ensure this package is installed
import theme from '../theme';

const ApplyLeaveScreen = () => {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [leaveType, setLeaveType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');

    // Format date as YYYY-MM-DD
    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    // Handle leave application submission
    const handleApplyLeave = () => {
        // Simple form validation
        if (!leaveType || !startDate || !endDate || !reason) {
            Alert.alert('Error', 'All fields are required!');
            return;
        }

        // Check if end date is after start date
        if (new Date(startDate) > new Date(endDate)) {
            Alert.alert('Error', 'End date should be after the start date.');
            return;
        }

        // Here you would send data to your backend or handle the submission
        console.log('Leave Applied:', { leaveType, startDate, endDate, reason });

        // Show confirmation message
        Alert.alert('Success', 'Your leave application has been submitted.');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Apply for Leave</Text>

            <Card style={styles.card}>
                <TextInput
                    label="Leave Type"
                    value={leaveType}
                    onChangeText={setLeaveType}
                    style={styles.input}
                    placeholder="Enter leave type"
                />
                
                {/* Start Date */}
                <Button mode="contained" onPress={() => setOpen(true)}>Pick Start Date</Button>

                {/* DatePicker modal for Start Date */}
                {open && (
                    <DatePicker
                        modal
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                            setOpen(false);
                            setDate(date);
                            setStartDate(formatDate(date)); // Set the formatted date in the start date field
                        }}
                        onCancel={() => setOpen(false)}
                    />
                )}

                <TextInput
                    label="Start Date"
                    value={startDate}
                    style={styles.input}
                    placeholder="Enter start date"
                    editable={false} // Prevent manual input
                />

                {/* End Date */}
                <Button mode="contained" onPress={() => setOpen(true)}>Pick End Date</Button>

                {/* DatePicker modal for End Date */}
                {open && (
                    <DatePicker
                        modal
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                            setOpen(false);
                            setDate(date);
                            setEndDate(formatDate(date)); // Set the formatted date in the end date field
                        }}
                        onCancel={() => setOpen(false)}
                    />
                )}

                <TextInput
                    label="End Date"
                    value={endDate}
                    style={styles.input}
                    placeholder="Enter end date"
                    editable={false} // Prevent manual input
                />

                <TextInput
                    label="Reason"
                    value={reason}
                    onChangeText={setReason}
                    style={styles.input}
                    placeholder="Enter reason for leave"
                />
                
                <Button mode="contained" style={styles.button} onPress={handleApplyLeave}>
                    Submit Leave Application
                </Button>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    card: {
        marginBottom: 20,
        padding: 16,
    },
    input: {
        marginBottom: 12,
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        backgroundColor: theme.colors.secondary,
    }
});

export default ApplyLeaveScreen;
