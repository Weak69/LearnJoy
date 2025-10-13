import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

export default function MathScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Math module coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background },
  text: { color: theme.colors.textPrimary },
});
