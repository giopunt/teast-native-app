import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput, View } from 'react-native';
import { Constants } from 'expo';

const styles = StyleSheet.create({
  searchBar: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    height: 50,
    marginTop: Constants.statusBarHeight,
    padding: 5,
    paddingLeft: 10,
  },
  input: {
    height: 40,
  },
});

const SearchBar = ({ onSearch }) => (
  <View style={styles.searchBar}>
    <TextInput
      style={styles.input}
      placeholder="Search music videos and more..."
      placeholderTextColor="#999"
      onChangeText={text => onSearch(text)}
    />
  </View>
);

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
