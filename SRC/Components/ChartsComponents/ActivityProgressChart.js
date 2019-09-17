import React, { Component } from 'react';
import { View, Text,Dimensions, StyleSheet } from 'react-native';
import {ProgressChart}from "react-native-chart-kit";

export default class ActivityProgressChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
            const data = [0.2,0.8];
            const chartConfig = {
            backgroundGradientFrom: '#000080',
            backgroundGradientTo: '#0F52BA',
            color: (opacity = 1) => `rgba(255, 255, 150, ${opacity})`,
            strokeWidth: 3 // optional, default 3
            };
      
    return (
        <View>
            <ProgressChart
            data = {data}
            width = {Dimensions.get('window').width-40}
            height = {200}
            style = {{marginTop: 20, borderRadius: 20,}}
            chartConfig = {chartConfig}
            />
            <Text style={styles.finishLabel}>Finished</Text>
        <Text style= {styles.pendingLabel}>Pending</Text>
        <Text style={{
            fontSize:12,
            color:'rgba(0,0,0,1)',
            marginTop:10,
            marginLeft:10
        }}>Activity Progress Chart</Text>
        {/*<Progress.Circle
        size={150}
        progress={0.2}
        endAngle={0.2}
        thickness={8}
        animated
        showsText={true}
        textStyle={{
            color:'rgba(255,30,45,1)',
            fontSize:25,            
        }}
        allowFontScaling={true}
        direction={"clockwise"}
        strokeCap={"round"}        
    />*/}
        </View>
    );
  }
}
const styles = StyleSheet.create({
    finishLabel:{
        fontSize:15,
        color:'rgba(255,255,255,1)',
        position: 'absolute',
        top: 70,
        left:250,
        zIndex:10
    },
    pendingLabel:{
        fontSize:15,
        color:'rgba(255,255,255,1)',
        position: 'absolute',
        top: 148,
        left:250,
        zIndex:10
    }
})