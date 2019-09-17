import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

export default class MyPieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OnProgressActivities: 0,
      PendingActivities: 0,
      FinishedActivities: 0
    };
  }
  componentWillMount() {
    this.setState({
      OnProgressActivities: this.props.OnProgressActivities,
      PendingActivities: this.props.PendingActivities,
      FinishedActivities: this.props.FinishedActivities,
    });
  }
  render() {
    const chartConfig = {
      backgroundColor: "#022173",
      backgroundGradientFrom: "#022173",
      backgroundGradientTo: "#1b3fa0",
      color: () => `rgba(0, 28, 195)`,
      style: {
        borderRadius: 16,
        marginBottom:0
      }
    };
    const pieChartData = [
      {
        name: "On Progress Activities",
        Progress: this.state.OnProgressActivities,
        color: "#022173",
        legendFontColor: "#000",
        legendFontSize: 12
      },
      {
        name: "Pending",
        Progress: this.state.PendingActivities,
        color: "#1b3fa0",
        legendFontColor: "#000",
        legendFontSize: 12
      },
      {
        name: "Finished",
        Progress: this.state.FinishedActivities,
        color: "#A1ABEA",
        legendFontColor: "#000",
        legendFontSize: 12
      }
    ];
    return (
      <View>
        <PieChart
          data={pieChartData}
          height={150}
          width={Dimensions.get("window").width-100}
          chartConfig={chartConfig}
          accessor="Progress"
          style={{ marginVertical: 8, ...chartConfig.style }}
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>
    );
  }
}