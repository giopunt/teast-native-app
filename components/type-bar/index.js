import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  activeTab: {
    width: '50%',
    padding: 13,
    textAlign: 'center',
    fontWeight: '900',
    backgroundColor: 'red',
  },
  tab: {
    width: '50%',
    padding: 13,
  },
  tabTitle: {
    textAlign: 'center',
    fontWeight: '500',
  },
});

const TypeBar = ({ activeType, onTypeSelect }) => (
  <View style={styles.bar}>
    <TouchableHighlight onPress={() => onTypeSelect('video')} style={styles.tab}>
      <Text style={styles.tabTitle}>
        {activeType === 'video' && '✔️'} Videos
      </Text>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => onTypeSelect('playlist')} style={styles.tab}>
      <Text style={styles.tabTitle}>
        {activeType === 'playlist' && '✔️'} Playlists
      </Text>
    </TouchableHighlight>
  </View>
);

TypeBar.propTypes = {
  activeType: PropTypes.string.isRequired,
  onTypeSelect: PropTypes.func.isRequired,
};

export default TypeBar;
