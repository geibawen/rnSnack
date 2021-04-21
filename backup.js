
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

//测试数据
var test = [{head: {row: 10, column: 10}, cornerPoints: [{row: 10, column: 19}, {row: 15, column: 19}],},
         {head: {row: 20, column: 20}, cornerPoints: [{row: 20, column: 25}, {row: 10, column: 25}],},
         {head: {row: 24, column: 4}, cornerPoints: [{row: 12, column: 4}, {row: 12, column: 7}],},
         {head: {row: 9, column: 9}, cornerPoints: [{row: 22, column: 9}, {row: 22, column: 7}],},
        {head: {row: 44, column: 10}, cornerPoints: [{row: 44, column: 25}, {row: 15, column: 25}],},
       {head: {row: 33, column: 10}, cornerPoints: [{row: 33, column: 20}, {row: 15, column: 20}, {row: 15, column: 4}],}];






//完成
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
      direction: 40001,
      food: {row: 40, column: 25},
      data: {head: {row: 10, column: 10}, cornerPoints: [{row: 10, column: 7}, {row: 15, column: 7}], count: 9}
    };
  }

  getBodyItemsPositon() {
    var result = [];
    var cur = this.state.data.head;
    result.push({...cur});
    for (var j = 0; j < this.state.data.cornerPoints.length; j++) {
      var next = this.state.data.cornerPoints[j];
      if (cur.row == next.row) {
        if (cur.column > next.column) { //左
          for (var i = cur.column - 1; i >= next.column; i--) {
            if (result.length < this.state.data.count) {
              result.push({row: cur.row, column: i});
            }
          }
        } else { //右
          for (var i = cur.column + 1; i <= next.column; i++) {
            if (result.length < this.state.data.count) {
              result.push({row: cur.row, column: i});
            }
          }
        }
      } else if (cur.column == next.column) {
        if (cur.row > next.row) { //上
          for (var i = cur.row - 1; i >= next.row; i--) {
            if (result.length < this.state.data.count) {
              result.push({row: i, column: cur.column});
            }
          }
        } else { //下
          for (var i = cur.row + 1; i <= next.row; i++) {
            if (result.length < this.state.data.count) {
              result.push({row: i, column: cur.column});
            }
          }
        }
      }
      cur = {...next};
    }
    return result;
  }

  getBodyItemView(row, column) {
    return (
      <View
        key={'' + row + column}
        style={{
        position: 'absolute',
        left: gridStartX + column * gridSize,
        top: gridStartY + row * gridSize,
        width: gridSize,
        height: gridSize,
        borderColor: 'grey',
        borderWidth: 1,
        backgroundColor: 'black'
        }}>
      </View>
    );
  }

  getControlView() {
    return (
      <View
        style={{
        position: 'absolute',
        left: (windowWidth - 210) / 2,
        bottom: 0,
        width: 210,
        height: 140,
        flexDirection: 'row',
        flexWrap: 'wrap',
        }}>
        <View
          style={{
          width: 70,
          height: 70,
          }}>
        </View>
        <TouchableOpacity
          onPress={() => { this.onPressDirection(0); }}
        >
        <View
          style={{
          width: 70,
          height: 70,
          borderWidth: 1,
          borderColor: 'black'
          }}>
        </View>
        </TouchableOpacity>
        <View
          style={{
          width: 70,
          height: 70,
          }}>
        </View>

        <TouchableOpacity
          onPress={() => { this.onPressDirection(3); }}
        >
        <View
          style={{
          width: 70,
          height: 70,
          borderWidth: 1,
          borderColor: 'black'
          }}>
        </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { this.onPressDirection(2); }}
        >
        <View
          style={{
          width: 70,
          height: 70,
          borderWidth: 1,
          borderColor: 'black'
          }}>
        </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { this.onPressDirection(1); }}
        >
        <View
          style={{
          width: 70,
          height: 70,
          borderWidth: 1,
          borderColor: 'black'
          }}>
        </View>
        </TouchableOpacity>

      </View>
    );
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

    //绘制snack
    var items = this.getBodyItemsPositon();
    var snackView = items.map((data) => {
      return this.getBodyItemView(data.row, data.column);
    });

    return (
      <View
        style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'grey'
        }}>
        <View style={{borderWidth: 5, borderColor: 'black', position: 'absolute', left: margin - 3, top: margin - 3, width: windowWidth - margin * 2 + 6, height: gridCountVertical * gridSize + 6}}/>
        { snackView }
        { this.getBodyItemView(this.state.food.row, this.state.food.column) }
        { this.getControlView() }
      </View>
    );
  }

  onPress() {
    this.setState({started: true});
  }

  onPressDirection(d) {
    if ((this.state.direction + 1) % 4 == d) {
      this.setState({direction: this.state.direction + 1});
    } else if ((this.state.direction - 1) % 4 == d) {
      this.setState({direction: this.state.direction - 1});
    }
  }

  next() { //snack前进，并判断吃食物或者死亡
    var resultData = JSON.parse(JSON.stringify(this.state.data));
    var curHead = {...this.state.data.head};
    var firstCorner = this.state.data.cornerPoints[0];
    var nextPos = {row: curHead.row - 1, column: curHead.column};
    if (this.state.direction % 4 == 1) {
      nextPos = {row: curHead.row, column: curHead.column + 1};
    } else if (this.state.direction % 4 == 2) {
      nextPos = {row: curHead.row + 1, column: curHead.column};
    } else if (this.state.direction % 4 == 3) {
      nextPos = {row: curHead.row, column: curHead.column - 1};
    }
    if ((curHead.row == firstCorner.row && firstCorner.row == nextPos.row) || (curHead.column == firstCorner.column && firstCorner.column == nextPos.column)) { //仅更新头位置
      resultData.head = nextPos;
    } else { //拐弯
      resultData.head = nextPos;
      resultData.cornerPoints.unshift(curHead);
    }
    if (nextPos.row == this.state.food.row && nextPos.column == this.state.food.column) { //吃食物
      resultData.count = resultData.count + 1;
      var randomRow = Math.floor(Math.random() * gridCountVertical);
      var randomColumn = Math.floor(Math.random() * gridCountHori);
      this.setState({food: {row: randomRow, column: randomColumn}});
    }
    if (nextPos.row < 0 || nextPos.row >= gridCountVertical || nextPos.column < 0 || nextPos.column >= gridCountHori) { //死1
      clearInterval(this.timer);
      return;
    }
    if (this.getBodyItemsPositon().findIndex((e) => e.row == nextPos.row && e.column == nextPos.column) != -1) { //死2
      clearInterval(this.timer);
      return;
    }
    this.setState({data: resultData});
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.next();
    }, 150);
  }
}

AppRegistry.registerComponent('rn61', () => App);
