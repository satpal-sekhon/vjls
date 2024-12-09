import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, TextInput, Card, Title, Paragraph } from 'react-native-paper';
import theme from '../theme';

const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match');
      return;
    }
    setError('');
    // Handle password change logic here
    console.log('Password changed successfully');
  };

  return (
    <View style={styles.container}>
      {/* Password Change Form */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Change Your Password</Title>

          {/* Current Password Input */}
          <TextInput
            label="Current Password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
            style={styles.input}
          />

          {/* New Password Input */}
          <TextInput
            label="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            style={styles.input}
          />

          {/* Confirm New Password Input */}
          <TextInput
            label="Confirm New Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
          />

          {/* Error Message */}
          {error ? <Paragraph style={styles.errorText}>{error}</Paragraph> : null}
        </Card.Content>
      </Card>

      {/* Action Button */}
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handlePasswordChange} style={styles.requestButton}>
          Change Password
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  card: {
    marginBottom: 20,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: theme.colors.white,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginBottom: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  requestButton: {
    backgroundColor: theme.colors.primary,
  },
});

export default ChangePasswordScreen;
