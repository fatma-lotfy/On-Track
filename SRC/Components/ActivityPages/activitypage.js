import React, { Component } from "react";
import { View, Text, Dimensions, TouchableOpacity, ScrollView, StyleSheet, RefreshControl} from "react-native";
import ActivityLineChart from "../ChartsComponents/ActivityLineChart";
import ActivityProgressChart from "../ChartsComponents/ActivityProgressChart";

export default class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: {}
    };
  }
  componentWillMount() {
    const { getParam } = this.props.navigation;
    const activity = getParam("activity", {});
    this.setState({ activity: activity });
  }
  navigateToCreateRfi = () => {
    this.props.navigation.navigate("createRfi", {});
  };
  navigateToaActivityRFIS = () => {
    this.props.navigation.navigate("ActivityRFIS", {});
  };
  render() {
    return (
      <ScrollView style={styles.screenContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.state.activity.activityName}</Text>

          <TouchableOpacity
            style={styles.rfiBtn}
            onPress={this.navigateToCreateRfi}
          >
            <Text>Add RFI</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rfiBtn}
            onPress={this.navigateToaActivityRFIS}
          >
            <Text>RFIs</Text>
          </TouchableOpacity>
        </View>

        <ActivityLineChart />
        <ActivityProgressChart />
        <View
          style={{
            height: 100
          }}
        />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  screenContainer: {
    padding: 20,
    backgroundColor: "rgba(255,255,255,1)",
    paddingBottom: 20,
    paddingLeft: 20
  },
  titleContainer: {
    height: 50,
    paddingLeft: 15,
    alignItems: "center",
    borderBottomWidth: 1.5,
    borderBottomColor: "rgba(0, 0, 0, 1.0)",
    marginBottom: 20,
    flexDirection: "row"
  },
  title: {
    fontFamily: "Montserrat",
    fontSize: 24,
    fontWeight: "500",
    color: "rgba(0,0,0,1.0)",
    flex: 0.7
  },
  rfiBtn: {
    height: 30,
    borderBottomColor: "#0F52BA",
    borderBottomWidth: 1,
    borderTopColor: "#0F52BA",
    borderTopWidth: 1,
    borderLeftColor: "#0F52BA",
    borderLeftWidth: 1,
    borderRightColor: "#0F52BA",
    borderRightWidth: 1,
    borderRadius: 3,
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  }
});