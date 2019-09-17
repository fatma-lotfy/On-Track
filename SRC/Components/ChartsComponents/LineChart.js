import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native'
import {LineChart, BarChart} from 'react-native-chart-kit'
import FlashMessage, { showMessage } from "react-native-flash-message";

export default class LineChartComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            labels:[0,1,2],
            data:[0,1,2]
        }
    }
    componentWillMount(){
        this.setState({
            labels:this.props.labels,
            data:this.props.data
        })
    }
  render() {
      const chartConfig = {
        backgroundColor: "#022173",
        backgroundGradientFrom: "#022173",
        backgroundGradientTo: "#1b3fa0",
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 3,
        style: {
            borderRadius: 16
        }
      };

      const data = {
            labels: this.state.labels,
            datasets: [{
                data: this.state.data,
            }]
        }
        let total=0;

        for(let i=0; i<this.state.data.length; i++){
            total+= this.state.data[i];
        };

    return (
      <View>
        <Text
          style={{
            fontSize: 12,
            color: "rgba(0,0,0,1)",
            marginLeft: 10,
            marginBottom: 10
          }}
        >
          {this.props.title}
        </Text>
        <BarChart
          bezier
          data={data}
          width={Dimensions.get("window").width - 60}
          height={200}
          chartConfig={chartConfig}
          style={{
            borderRadius: 20,
            marginTop: 10
          }}
          onDataPointClick={({ value }) =>
            showMessage({
              message: `${Math.floor((value / total) * 100)} %`,
              description: "percentage of selected Activities",
              backgroundColor: "#414A55"
            })
          }
        />
        <FlashMessage duration={1000} />
      </View>
    );
  }
}