import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EarnedPayrollScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Earned PayrollScreen Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EarnedPayrollScreen;
