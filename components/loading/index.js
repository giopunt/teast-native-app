import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: -50,
  },
});

const Loading = () => (
  <View style={styles.container}>
    <Text style={styles.loading}>🤔🎶</Text>
  </View>
);

export default Loading;
