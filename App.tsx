import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button icon="camera">
        Press me
      </Button>
      <StatusBar style="auto" />
    </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});