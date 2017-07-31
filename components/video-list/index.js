import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, StyleSheet, Dimensions, ScrollView, Text, View, Image } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 15,
    justifyContent: 'center',
    marginBottom: 70,
  },
  videoTitle: {
    marginBottom: 7,
    fontWeight: '700',
    fontSize: 16,
    color: '#025268',
  },
  author: {
    marginBottom: 20,
    fontWeight: '500',
    fontSize: 15,
    color: '#025268',
  },
});

const VideoList = ({ videos, onVideoSelect }) => (
  <ScrollView style={styles.scrollContainer}>
    <View style={styles.container}>
      {
        videos.map(video => {
          const ratio = video.snippet.thumbnails.medium.width / video.snippet.thumbnails.medium.height;
          const videoWidth = width - 20;
          return (
            <View key={video.etag}>
              <TouchableHighlight
                onPress={() => onVideoSelect(video.id.videoId)}
              >
                <View>
                  <Image
                    style={{
                      backgroundColor: '#ccc',
                      marginBottom: 10,
                      width: videoWidth,
                      height: videoWidth / ratio,
                    }}
                    source={{ uri: video.snippet.thumbnails.medium.url }}
                  />
                  <Text style={styles.videoTitle}>{video.snippet.title}</Text>
                  <Text style={styles.author}>{video.snippet.channelTitle}</Text>
                </View>
              </TouchableHighlight>
            </View>
          );
        })
      }
    </View>
  </ScrollView>
);

VideoList.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onVideoSelect: PropTypes.func.isRequired,
};

export default VideoList;
