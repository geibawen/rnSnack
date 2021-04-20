
import {AppRegistry, Text, View, Animated, Image} from 'react-native';
import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <View
        style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f5f5f5'
        }}>
        <Image source={require('./resources/start.png')}></Image>
        <Text style={{color: this.state.color, fontSize: 40, fontWeight: '800'}}>开始</Text>
      </View>
    );
  }


}

AppRegistry.registerComponent('rn61', () => App);








//可点击
import {AppRegistry, Text, View, Animated, Image, TouchableOpacity} from 'react-native';
import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'green',
    };
  }
  render() {
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
          <Text style={{color: this.state.color, fontSize: 40, fontWeight: '800'}}>开始</Text>
        </TouchableOpacity>
      </View>
    );
  }

  onPress() {
    this.setState({color: 'red'});
  }
}

AppRegistry.registerComponent('rn61', () => App);





//动画
import {AppRegistry, Text, View, Animated, Image, TouchableOpacity} from 'react-native';
import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'green',
      animatedValue: new Animated.Value(0)
    };
  }
  render() {
    var scale = this.state.animatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: [1, 5]
		});
    var opacity = this.state.animatedValue.interpolate({
			inputRange: [0,1],
			outputRange: [1,0]
		});
    return (
      <View
        style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f5f5f5'
        }}>
        <Animated.Image style={{transform: [{scale: scale }], opacity: opacity}} source={require('./resources/start.png')}></Animated.Image>
        <TouchableOpacity
          onPress={() => { this.onPress(); }}
        >
          <Animated.Text style={{transform: [{scale: scale }], color: this.state.color, fontSize: 40, fontWeight: '800', opacity: opacity}}>开始</Animated.Text>
        </TouchableOpacity>
      </View>
    );
  }

  onPress() {
    Animated.timing(this.state.animatedValue, {
			toValue: 1,
			duration: 500,
		}).start(() => {

		});
  }
}

AppRegistry.registerComponent('rn61', () => App);
