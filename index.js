import {AppRegistry, Text, View, Animated, Image, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const margin = 10;
const gridCountHori = 30;
const gridCountVertical = 50;
const gridSize = (windowWidth - margin * 2) / gridCountHori;
const gridStartX = margin;
const gridStartY = margin;


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      direction: 1,
      data: {head: {row: 10, column: 10}, cornerPoints: [{row: 10, column: 7}],}
    };
  }

  getSnackBodyView() {

  }

  render() {
    if (!this.state.started) {
      return (
        <View
          style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: '#f5f5f5'
          }}>
          <Image source={require('./resources/start.png')}></Image>
          <TouchableOpacity
            onPress={() => { this.onPress(); }}
          >
            <Text style={{color: 'green', fontSize: 40, fontWeight: '800'}}>开始</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View
        style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'grey'
        }}>
        <View style={{borderWidth: 5, borderColor: 'black', position: 'absolute', left: margin - 3, top: margin - 3, width: windowWidth - margin * 2 + 6, height: gridCountVertical * gridSize + 6}}/>

      </View>
    );
  }

  onPress() {
    this.setState({started: true});
  }
}

AppRegistry.registerComponent('rn61', () => App);
