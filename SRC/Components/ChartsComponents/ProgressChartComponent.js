import { PieChart ,LineChart ,ProgressChart} from 'react-native-chart-kit';
import React, { Component } from 'react';
import { View, Text , Dimensions } from 'react-native';

export default class ProgressChartComponent extends Component {
render() {
  const data = [0.4, 0.6, 0.8]
    return (
    <View>
    <Text style={{ paddingLeft :25}}> Project Progress Status </Text>
    <ProgressChart style={{  marginTop:10}}
    data={data}
    width={Dimensions.get('window').width}
    height={220}
    chartConfig={{
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#547980',
    backgroundGradientTo: '#7F7F7F',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    //strokeWidth: 2 
    style: {
        borderRadius: 16
      }
  }}
     />
    </View>
    );
  }
}
//Pie Chart
 //   const data= [
  //     { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  //     { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  //     { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  //     { name: 'New York', population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  //     { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
  //   ]
// <View>
  // <PieChart
  // data = {data}
  // width ={Dimensions.get('window').width}
  // hight = {220}
  // chartConfig = {{
  //   backgroundColor: '#1E2923',
  //   backgroundGradientFrom: '#1E2923',
  //   backgroundGradientTo: '#08130D',
  //   decimalPlaces: 2,
  //   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  //   //strokeWidth: 2 
  //   style: {
  //       borderRadius: 16
  //     }
  // }}
  // accessor ="population"
  // backgroundColor = "transparent"
  // paddingLeft ="15"
  // absolute
  // />
  // </View>