/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { random, range } from "lodash";
import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Platform,
  Text,
  View,
  Alert,
  Image,
  TouchableOpacity
} from "react-native";
import Svg, { Stop, Defs, LinearGradient } from "react-native-svg";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryArea,
  VictoryScatter,
} from "victory-native";

const dataArray0 = [{ time: 4, value: 0},
  { time: 5, value: 0},
  { time: 6, value: 10},
  { time: 7, value: 10},
  { time: 8, value: 30},
  { time: 9, value: 20},
  { time: 10, value: 50},
  { time: 11, value: 80},
  { time: 12, value: 100},
  { time: 1, value: 70},
  { time: 2, value: 30},
  { time: 3, value: 0},
  { time: 4, value: 20},
  { time: 5, value: 40},
  { time: 6, value: 10},
  { time: 7, value: 20}];

const dataArray1 = [{ time: 4, value: 0},
  { time: 5, value: 20},
  { time: 6, value: 40},
  { time: 7, value: 30},
  { time: 8, value: 10},
  { time: 9, value: 50},
  { time: 10, value: 50},
  { time: 11, value: 40},
  { time: 12, value: 70},
  { time: 1, value: 100},
  { time: 2, value: 30},
  { time: 3, value: 60},
  { time: 4, value: 20},
  { time: 5, value: 40},
  { time: 6, value: 40},
  { time: 7, value: 10},];

const dataArray2 = [{ time: 4, value: 40},
  { time: 5, value: 20},
  { time: 6, value: 10},
  { time: 7, value: 70},
  { time: 8, value: 30},
  { time: 9, value: 20},
  { time: 10, value: 50},
  { time: 11, value: 80},
  { time: 12, value: 100},
  { time: 1, value: 70},
  { time: 2, value: 30},
  { time: 3, value: 0},
  { time: 4, value: 20},
  { time: 5, value: 40},
  { time: 6, value: 10},
  { time: 7, value: 20},];

const buttonImages = [{
  normal: require('./images/btn1.png'),
  clicked: require('./images/btn1_clicked.png')
},
{
  normal: require('./images/btn2.png'),
  clicked: require('./images/btn2_clicked.png')
},
{
  normal: require('./images/btn3.png'),
  clicked: require('./images/btn3_clicked.png')
}];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      data: this.getData(0),
      tickArray: this.getTickValue(0)
    };
  }

  getData(index) {
    var dataArray;
    if (index == 0) {
      dataArray = dataArray0;
    } else if (index == 1) {
      dataArray = dataArray1;
    } else {
      dataArray = dataArray2;
    }
    var array = [];
    for (i = 0; i < dataArray.length; i++) {
      var item = dataArray[i];
      var newItem = { x: i, y: item.value, time: item.time };
      array.push(newItem);
    }
    return array;
  }

  getTickValue(index) {
    var dataArray;
    if (index == 0) {
      dataArray = dataArray0;
    } else if (index == 1) {
      dataArray = dataArray1;
    } else {
      dataArray = dataArray2;
    }
    var array = [];
    for (i = 0; i < dataArray.length; i++) {
      array.push(i);
    }
    return array;
  }

  onButtonPress(i) {
    this.setState({
      index: i,
      data: this.getData(i),
      tickArray: this.getTickValue(i)
    });
    setTimeout(() => this.onUpdate(), 500);
  }

  onUpdate() {
    this.forceUpdate();
  }

  getImage(i) {
    if (i == this.state.index) {
      return buttonImages[i].clicked;
    }
    return buttonImages[i].normal;
  }
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.buttonGroup}>
            <TouchableOpacity onPress={() => this.onButtonPress(0)}>
              <Image source={this.getImage(0)} style={styles.checkboxImage}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onButtonPress(1)}
            style={{marginLeft: 10, marginRight: 10}}>
              <Image source={this.getImage(1)} style={styles.checkboxImage}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onButtonPress(2)}>
              <Image source={this.getImage(2)} style={styles.checkboxImage}/>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.chartView} horizontal={true} showsHorizontalScrollIndicator={false}>
            <VictoryChart
              animate={{duration: 500}}
              height={120}
              width={this.state.data.length * 70}
              domain={{ x: [-1, this.state.data.length], y: [-2, 180] }}
              padding={{left: 0, top: 0, right: 0, bottom: 40}}>

              <Defs>
                <LinearGradient id='gradientFill'
                  x1='0%'
                  x2='0%'
                  y1='0%'
                  y2='100%'
                >
                <Stop offset='0%'  stopColor={"#ffffff"} stopOpacity='0.2' />
                <Stop offset='50%' stopColor={"#ffffff"}  stopOpacity='0.02' />
                <Stop offset='70%' stopColor={"#ffffff"}  stopOpacity='0' />
                </LinearGradient>
              </Defs>

              <VictoryArea
                data={this.state.data}
                interpolation="cardinal"
                labels={(data) => `${Math.round(data.y)}%`}
                style={{
                  data: {
                    stroke: "#4f82de",
                    strokeWidth: 1,
                    fill: 'url(#gradientFill)',
                  },
                  labels: { fontSize: 12, fill: "white" },
                }}
              />

              <VictoryScatter
              style={{data:{fill: "#4f82de"}}}
              data={this.state.data}
              size={3}/>

              <VictoryAxis
              style={{
                axis: {
                  stroke: "transparent",
                },
                tickLabels : { fontSize: 12, fill: "white" },
              }}
              tickValues={this.state.tickArray}
              tickFormat={(t) => `${this.state.data[t].time}pm`}
              />
            </VictoryChart>
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a4071",
    height: 200,
    width: "100%",
  },
  chartView: {
    width: "100%",
    height: 120
  },
  buttonGroup: {
    height: 80,
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30
  },
  checkboxImage : {
    height: 50,
    width: 50
  }
});
