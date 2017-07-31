import React from 'react';
import _ from 'lodash';
import { View, StyleSheet } from 'react-native';
import { Audio } from 'expo';
import { search } from './api/youtube-search';

import Loading from './components/loading';
import Player from './components/player';
import SearchBar from './components/search-bar';
import TypeBar from './components/type-bar';
import VideoList from './components/video-list';


const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
  },
});

export default class App extends React.Component {

  handlePlaySoundAsync = async () => {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance = null;
    }

    await Audio.setIsEnabledAsync(true);
    const source = {
      uri: 'https://r2---sn-8pgbpohxqp5-aigd.googlevideo.com/videoplayback?id=b35c5b41534648f4&itag=140&source=youtube&requiressl=yes&pl=22&ei=EHV8WbqtNNWIcuSWqbgG&mm=31&mn=sn-8pgbpohxqp5-aigd&pcm2cms=yes&ms=au&initcwndbps=2847500&mv=m&ratebypass=yes&mime=audio/mp4&gir=yes&clen=3971371&lmt=1500583465791490&dur=250.009&key=dg_yt0&signature=68F661DE17A2ED00F2E1DB223C1F80306277B7B5.730CDCA21E219F7BADE57CE314F274E917CBF9ED&mt=1501328559&ip=82.28.63.174&ipbits=0&expire=1501350256&sparams=ip,ipbits,expire,id,itag,source,requiressl,pl,ei,mm,mn,pcm2cms,ms,initcwndbps,mv,ratebypass,mime,gir,clen,lmt,dur',
    };
    const initialStatus = {
      shouldPlay: true,
    };

    const { sound } = await Audio.Sound.create(
      source,
      initialStatus,
      this.callback,
    );
    this.playbackInstance = sound;
  };

  playOrPause = () => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
      this.setState({
        isPlaying: !this.state.isPlaying,
      });
    }
  };

  callback = status => {
    if (status.isLoaded) {
      this.setState({
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
      });
    } else if (status.error) {
      console.log(`FATAL PLAYER ERROR: ${status.error}`);
    }
  }

  constructor() {
    super();
    this.playbackInstance = null;
    this.state = {
      videos: [],
      term: '',
      loading: false,
      selectedVideo: undefined,
      type: 'video',
      isPlaying: false,
    };
  }

  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
  }

  videoSearch(term) {
    search({ key: API_KEY, term, type: this.state.type }).then(data => {
      console.log(data.items);
      this.setState({ videos: data.items });
      this.setState({ loading: false });
    });
  }

  render() {
    const videoSearch = _.debounce(term => { this.videoSearch(term); }, 300);

    return (
      <View style={styles.layoutContainer}>
        <SearchBar
          onSearch={text => {
            if (text === '') {
              this.setState({ videos: [] });
            }
            if (text) {
              this.setState({ term: text });
              this.setState({ loading: true });
              videoSearch(text);
            }
          }}
        />
        <TypeBar
          activeType={this.state.type}
          onTypeSelect={type => {
            this.setState({ type });
          }}
        />
        {
          this.state.loading ?
            <Loading /> :
            <VideoList
              videos={this.state.videos}
              onVideoSelect={videoId => {
                this.setState({ selectedVideo: videoId });
                this.handlePlaySoundAsync();
              }}
            />
        }
        {
          this.state.selectedVideo && <Player
            isPlaying={this.state.isPlaying}
            onPlayPause={() => {
              this.playOrPause();
            }}
          />
        }
      </View>
    );
  }
}
