import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  player: {
    height: 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
});

const Player = ({ onPlayPause, isPlaying }) => (
  <View style={styles.player}>
    <Button
      color="black"
      title={isPlaying ? 'PAUSE ⏸️' : 'PLAY ▶️'}
      onPress={onPlayPause}
    />
  </View>
);

Player.propTypes = {
  onPlayPause: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default Player;
