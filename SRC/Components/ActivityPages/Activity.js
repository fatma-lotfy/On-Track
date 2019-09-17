import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Progress from "react-native-progress";

export default class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity:{},
      id: 0,
      name: "",
      description: "",
      status: 0,
      early_Start_Date: "",
      early_Finish_Date: "",
      late_Start_Date: "",
      late_Finish_Date: "",
      actual_Start_Date: "",
      actual_End_Date: "",
      costStatus: "",
      activityFiles: [],
      activityCreator: {},
      assignedConsultant: {},
      assignedContractor: {},
      budgetCostWorkScheduling:0,
      actualCostofWorkPerformed_ACWP: 0,
      budgetCostofWorkPerformed_BCWP: 0,
      percentageOfCompletion: 0,
      schudulingIndex_SI: 0,
      costIndex_CI: 0,
      expectedFinalDuration: 0,
      expectedFinalCost: 0,
      expectedFinalDate: '',
      estimatedDuration: 0,
      totalFloat: 0,
      rfIs: [],
      inspectionRequests:[],
      user:{}
    };
  }
  componentWillMount() {
    const { getParam } = this.props.navigation;
    const activity = getParam("activity", {});
    const user = getParam("user", {});
    this.setState({
      activity:activity,
      id: activity.id,
      name: activity.name,
      description: activity.description,
      status: activity.status,
      early_Start_Date: activity.early_Start_Date,
      early_Finish_Date: activity.early_Finish_Date,
      late_Start_Date: activity.late_Start_Date,
      late_Finish_Date: activity.late_Finish_Date,
      actual_Start_Date: activity.actual_Start_Date,
      actual_End_Date: activity.actual_End_Date,
      costStatus: activity.costStatus,
      activityFiles: activity.activityFiles,
      activityCreator: activity.activityCreator,
      assignedConsultant: activity.assignedConsultant,
      assignedContractor: activity.assignedContractor,
      budgetCostWorkScheduling: activity.budgetCostWorkScheduling,
      actualCostofWorkPerformed_ACWP: activity.actualCostofWorkPerformed_ACWP,
      budgetCostofWorkPerformed_BCWP: activity.budgetCostofWorkPerformed_BCWP,
      percentageOfCompletion: activity.percentageOfCompletion,
      schudulingIndex_SI: activity.schudulingIndex_SI,
      costIndex_CI: activity.costIndex_CI,
      expectedFinalDuration: activity.expectedFinalDuration,
      expectedFinalCost: activity.expectedFinalCost,
      expectedFinalDate: activity.expectedFinalDate,
      estimatedDuration: activity.estimatedDuration,
      totalFloat: activity.totalFloat,
      rfIs: activity.rfIs,
      inspectionRequests: activity,
      user:user
    });
  }  
  GoToCreateRFI =()=>{
    this.props.navigation.navigate('createRfi',{activity:this.state.activity})
  }
  ViewsRFIs = ()=>{
    this.props.navigation.navigate('ActivityRFIS',{activity:this.state.activity, user:this.state.user})
  }
  render() {   
      let elapsedTime, activityDuration;
      if(this.state.status == 2){
          this.setState({status:"Completed Activity"});
          elapsedTime=(Math.ceil((new Date(this.state.actual_End_Date)-new Date(this.state.actual_Start_Date))/1000/60/60/24)).toString();
          activityDuration=elapsedTime;
      }
      if(this.state.status == 1){
          this.setState({status:"On Progress Activity"});
          elapsedTime= (Math.ceil(new Date()-new Date(this.state.actual_Start_Date)) / 1000 / 60 / 60 / 24).toString();
          activityDuration = Math.ceil(
            (new Date(this.state.late_Finish_Date) - new Date(this.state.actual_Start_Date)) / 1000 / 60 / 60 / 24
          ).toString();
      }
      if (this.state.status == 0) {
        this.setState({ status: "Pending Activity" });
      }
    return (
      <ScrollView>
        {/*header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{this.state.name} Activity</Text>
          <Text style={styles.headerText}>Activity details</Text>
          {this.state.expectedFinalDate ? (
            <Text style={styles.descriptionText}>
              Final Date:{" "}
              {new Date(this.state.expectedFinalDate).toDateString()}
            </Text>
          ) : (
            <Text />
          )}
        </View>

        {/*activity progress*/}
        <View style={styles.statisticsElementContentView}>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <Text style={styles.infoElementLabel}>
              Project Progress Status
            </Text>
            <Text style={styles.chartDataStyle}>
              {Math.ceil(
                (this.state.percentageOfCompletion *
                  this.state.estimatedDuration) /
                  100
              )}{" "}
              out of {this.state.estimatedDuration} estimated Days
            </Text>
          </View>
          <Progress.Circle
            progress={this.state.percentageOfCompletion / 100}
            size={70}
            showsText={true}
            formatText={() => this.state.percentageOfCompletion + " %"}
            direction="clockwise"
            strokeCap="round"
            thickness={4}
            color="#2C9FCC"
            animated
            style={{ marginBottom: 10 }}
          />
        </View>

        {/*activity description*/}
        <View style={{ marginTop: 10 }}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>Description: </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text>{this.state.description}</Text>
            </View>
          </View>
        </View>
        {/*activity status*/}
        <View style={{ marginTop: 10 }}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>Activity Status: </Text>
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center"
              }}
            >
              <Text>
                current Status:{" "}
                <Text style={styles.descriptionText}>
                  {this.state.status}
                </Text>{" "}
              </Text>
              <Text>
                Expected Final Cost:{" "}
                <Text style={styles.descriptionText}>
                  {this.state.expectedFinalCost}
                </Text>{" "}
              </Text>
              <Text>
                Expected Final date:{" "}
                <Text style={styles.descriptionText}>
                  {new Date(this.state.expectedFinalDate).toDateString()}
                </Text>{" "}
              </Text>
              <Text>
                Cost status:{" "}
                <Text style={styles.descriptionText}>
                  {this.state.costStatus}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        {/*activity StakeHolder*/}
        <View style={{ marginTop: 10 }}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>Stake Holders: </Text>
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center"
              }}
            >
              <Text>
                Project Manager:{" "}
                <Text style={styles.descriptionText}>
                  {this.state.activityCreator.fullName}
                </Text>
              </Text>
              <Text>
                Consultant:{" "}
                <Text style={styles.descriptionText}>
                  {this.state.assignedConsultant.fullName}
                </Text>
              </Text>
              <Text>
                Main Contractor:{" "}
                <Text style={styles.descriptionText}>
                  {this.state.assignedContractor.fullName}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        {/*activity dates*/}
        <View style={{ marginTop: 10 }}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>Activity Dates: </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "space-between",
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flex: 1
                }}
              >
                <Text>
                  {" "}
                  E.S:
                  <Text style={styles.descriptionText}>
                    {" "}
                    {new Date(this.state.early_Start_Date).toDateString()}
                  </Text>
                </Text>
                <Text>
                  {" "}
                  E.F:
                  <Text style={styles.descriptionText}>
                    {" "}
                    {new Date(this.state.early_Finish_Date).toDateString()}
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1
                }}
              >
                <Text>
                  {" "}
                  L.S:
                  <Text style={styles.descriptionText}>
                    {" "}
                    {new Date(this.state.late_Start_Date).toDateString()}
                  </Text>
                </Text>
                <Text>
                  {" "}
                  L.F:
                  <Text style={styles.descriptionText}>
                    {" "}
                    {new Date(this.state.late_Finish_Date).toDateString()}
                  </Text>
                </Text>
              </View>
              <View />
            </View>
          </View>
        </View>

        {/*activity Actual dates*/}
        {this.state.status !== 0 ? (
          <View style={{ marginTop: 10 }}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>
                Activity Actual Dates:{" "}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flex: 1
                  }}
                >
                  {this.state.actual_Start_Date ? (
                    <Text>
                      {" "}
                      Actual Start Date:
                      <Text style={styles.descriptionText}>
                        {" "}
                        {new Date(
                          this.state.actual_Start_Date
                        ).toDateString()}
                      </Text>
                    </Text>
                  ) : (
                    <Text />
                  )}
                  {this.state.actual_End_Date ? (
                    <Text>
                      {" "}
                      Actual End Date
                      <Text style={styles.descriptionText}>
                        {" "}
                        {new Date(
                          this.state.actual_End_Date
                        ).toDateString()}
                      </Text>
                    </Text>
                  ) : (
                    <Text />
                  )}
                </View>

                <View />
              </View>
            </View>
          </View>
        ) : (
          <Text />
        )}

        {/*activity indices*/}
        <View style={{ marginTop: 10 }}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>Activity Indices: </Text>
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center"
              }}
            >
              <Text>
                ACWP:{" "}
                <Text style={styles.descriptionText}>
                  {this.state.actualCostofWorkPerformed_ACWP}
                </Text>
              </Text>
              <Text>
                BWCS:{" "}
                <Text style={styles.descriptionText}>
                  {this.state.budgetCostWorkScheduling}
                </Text>
              </Text>
              <Text>
                BCWP:{" "}
                <Text style={styles.descriptionText}>
                  {this.state.budgetCostofWorkPerformed_BCWP}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        {/*Create RFI */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={this.GoToCreateRFI}
        >
          <Text style={styles.submitText}>Create RFI</Text>
        </TouchableOpacity>

        {/*View Activity RFIs */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={this.ViewsRFIs}
        >
          <Text style={styles.submitText}>View Activity RFIs</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  statisticsElementContentView: {
    marginHorizontal:15,
    backgroundColor: "#fff",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#547980",
    borderWidth: 1.5,
    borderRadius: 5,
    padding: 5,
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  infoElementLabel: {
    color: "#000",
    fontSize: 12
  },
  chartDataStyle: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600"
  },
  header: {
    flex: 1,
    backgroundColor: "#83AF9B"
  },
  headerText: {
    fontSize: 20
  },
  headerContainer: {
    backgroundColor: "#547980",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 10
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#ffffff"
  },
  headerText1: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff"
  },
  descriptionContainer: {
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: "column",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    shadowColor: "#dfdfdf",
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 6
    },
    elevation: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 10
  },
  descriptionText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 5
  },
  submitButton: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    marginBottom: 30,
    height: 40,
    borderColor: "#547980",
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  submitText: {
    fontSize: 16,
    color: "#547980",
    fontWeight: "400"
  }
});