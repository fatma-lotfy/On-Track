import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AccordionComponent from './../Common/AccordionComponent';
import axios from 'axios';
import Ip from '../IP';

export default class ProjectActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_Name: "",
      id:'',
      activities: [],
      error:'',
      activity:{},
      user:{}
    };
  }
  componentWillMount(){
    const { getParam } = this.props.navigation;
    const project = getParam("project", {});
    const user = getParam("user", {});
    this.setState({
      id:project.id,
      error:'',
      activities:project.activities,
      project_Name:project.project_Name,
      user:user
    });
  }
  sendToLogin=()=>{
    this.props.navigation.navigate("login", {});
  }
  getActivityData=(id)=>{
    axios.get(Ip+"/OnTrack/api/activities/getactivity/?id="+id)
    .then(response=>{this.setState({ activity:response.data })
                      this.props.navigation.navigate('activity',{activity:response.data, user:this.state.user}) }
                      )    
     
    .catch(err=> this.setState({
      error:err,
    }))
  }
  render() {
    const {activities}=this.state;
    let onProgressActivities = [];
    let completedActivities = [];
    let pendingActivities = [];


    for (let i = 0; i < activities.length; i++) {
      if (activities[i].status == 1) {
        onProgressActivities.push(activities[i]);        
      }
      if (activities[i].status == 2) {
        completedActivities.push(activities[i]);       
      }
      if (activities[i].status == 0) {
        pendingActivities.push(activities[i]);        
      }
    }

    return (
      <ScrollView contentContainerStyle={{ minHeight: Dimensions.get("window").height -215, flexDirection:"column", justifyContent:"space-between" }}>
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>
              {this.state.project_Name}
            </Text>
            <Text style={styles.headerText}>All Activities</Text>
          </View>
          {/*Accordions*/}
          <View style={{ marginTop: 10 }}>
            <AccordionComponent
              HeaderText="On Progress Activities"
              dataArray={onProgressActivities}
              accessor="name"
              sendToItem={item => {
                this.getActivityData(item.id);
              }}
            />
            <AccordionComponent
              HeaderText="Pending Activities"
              dataArray={pendingActivities}
              accessor="name"
              sendToItem={item => {
                this.getActivityData(item.id);
              }}
            />
            <AccordionComponent
              HeaderText="Completed Activities"
              dataArray={completedActivities}
              accessor="name"
              sendToItem={item => {
                this.getActivityData(item.id);
              }}
            />
          </View>
          
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
  }
});