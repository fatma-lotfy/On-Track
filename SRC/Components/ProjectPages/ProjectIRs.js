import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import axios from 'axios';
import AccordionComponent from '../Common/AccordionComponent';
import Ip from '../IP';

export default class ProjectIRs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_Name: '',
      activities:[],
      id:'',
      error:'',
      inspectionRequests:[]
    };
  }  
  componentWillMount(){
    const { getParam } = this.props.navigation;
    const project = getParam("project", {});
    this.setState({
      id: project.id,
      activities: project.activities,
      project_Name: project.project_Name,
      inspectionRequests: project.inspectionRequests
    });    
  }
  getProjectData=()=>{
    axios.get(Ip+"/OnTrack/api/projects/projectdashboard?id="+this.state.id)
    .then(response=>this.setState({
      activities:response.data.project.activities,
      project_Name:response.data.project.project_Name,
    }))
    .catch(err=> this.setState({
      error:err,
    }))
  }
  sendToLogin=()=>{
    this.props.navigation.navigate("login", {});
  }
  getInspectionRequest=()=>{
    axios.get(Ip+"/OnTrack/api/inspectionrequests/getinspectionrequests/?id=1055")
    .then(response=>this.setState({
      inspectionRequests:response.data
    }))
    .catch(err=> this.setState({
      error:err
    }))
  }
  navigateToInspectionRequestDetails=(item)=>{
    if (item.inspectionRequestStatus == 0 || item.inspectionRequestStatus == 1){
      this.props.navigation.navigate("InspectionReqDetails", {projectName: this.state.project_Name, dateCreated: item.dateCreated, responseDate: item.responseDate, });
    }
    else{
      this.props.navigation.navigate("InspectionReqToApprove", {});
    }
  }
  render() {
    const {activities}= this.state;
    const projectIRs=[];
    const approvedIRs=[];
    const notApprovedIRs=[];
    const pendingIRs=[];

    for(let i=0; i<activities.length; i++){
      projectIRs.push(...activities[i].inspectionRequests);
    }

    for (let i=0; i<projectIRs.length; i++){
      if(projectIRs[i].inspectionRequestStatus == 0){
        approvedIRs.push(projectIRs[i]);
      }
      else if(projectIRs[i].inspectionRequestStatus == 1){
        notApprovedIRs.push(projectIRs[i])
      }
      else{
        pendingIRs.push(projectIRs[i])
      }
    }

    return (
      <ScrollView
        contentContainerStyle={{minHeight: Dimensions.get("window").height - 210,
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>
              {this.state.project_Name}{" "}
            </Text>
            <Text style={styles.headerText}>All Inspection Requests</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <AccordionComponent
              HeaderText="Pending IRs"
              dataArray={pendingIRs}
              accessor="id"
              sendToItem={item => this.navigateToInspectionRequestDetails(item)}
            />
            <AccordionComponent
              HeaderText="Disapproved IRs"
              dataArray={notApprovedIRs}
              accessor="id"
              sendToItem={item => this.navigateToInspectionRequestDetails(item)}
            />
            <AccordionComponent
              HeaderText="Approved IRs"
              dataArray={approvedIRs}
              accessor="id"
              sendToItem={item => {
                this.props.navigation.navigate("InspectionReqDetails", { rfi: item });
              }}
            />
          </View>
          <View style={{ marginTop: 10 }} />
        </View>

        {/* Footer*/}
        <View style={styles.logOutContainerStyle}>
          <TouchableOpacity onPress={this.sendToLogin}>
            <Text style={styles.logoutBtn}>Log out</Text>
          </TouchableOpacity>
          <Text style={styles.logOutTextStyle}>
            {" "}
            Developed by : Ontrack Team ...{" "}
          </Text>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  logOutContainerStyle: {
    borderTopWidth: 2,
    borderTopColor: "#547980",
    minHeight: 60,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  logOutTextStyle: {
    color: "#000",
    fontSize: 12,
    fontWeight: "600"
  },
  logoutBtn: {
    color: "#2170FF",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
    marginBottom: 20
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
  }
});