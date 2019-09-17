import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import AccordionComponent from "../Common/AccordionComponent"
import axios from 'axios';
import Ip from '../IP';

export default class ProjectRFIs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_Name: "",
      activities: [],
      id:'',
      error:'',
      rfi:'',
      rfiCreator:{},
      rfiReciever:{}
    };
  }
  componentWillMount(){
    const { getParam } = this.props.navigation;
    const project = getParam("project", {});    
    this.setState({
      id:project.id,
      activities:project.activities,
      project_Name:project.project_Name
    });
  }
  sendToLogin=()=>{
    this.props.navigation.navigate("login", {});
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
  getRfiData=(id)=>{
    axios.get(Ip+"/OnTrack/api/rfis/getrfibyid/"+id)
    .then(response=>this.setState({rfi:response.data, rfiCreator:response.data.creator, rfiReciever:response.data.reciever}))
    .catch(err=> this.setState({
      error:err,
    }))
  }
  render() {
    const{activities}=this.state;
    const projectRFIs= [];
    const repliedRFIs = [];
    const notRepliedRFIs = [];

    for(let i=0; i<activities.length; i++){
      projectRFIs.push(...activities[i].rfIs);
      for(let j=0; j<activities[i].rfIs.length; j++){
        projectRFIs[j].activityName=activities[i].name
      }
    }

    for (let i=0; i<projectRFIs.length; i++){
      if(projectRFIs[i].rfiStatus == 1){
        notRepliedRFIs.push(projectRFIs[i]); 
      }
      else{
        repliedRFIs.push(projectRFIs[i])
      }
    }

    return (
      <ScrollView
        contentContainerStyle={{
          minHeight: Dimensions.get("window").height - 240,
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>
              {this.state.project_Name}{" "}
            </Text>
            <Text style={styles.headerText}>All RFIs</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <AccordionComponent
              HeaderText="Not Replied RFIs"
              dataArray={notRepliedRFIs}
              accessor="id"
              sendToItem={item => {
                this.getRfiData(item.id)
                this.props.navigation.navigate("rfiDetails", { rfi: item, projectName:this.state.project_Name, activityName:item.activityName, rfiCreator:this.state.rfiCreator, rfiReciever:this.state.rfiReciever });
              }}
            />
            <AccordionComponent
              HeaderText="Replied RFIs"
              dataArray={repliedRFIs}
              accessor="id"
              sendToItem={item => {
                this.getRfiData(item.id)
                this.props.navigation.navigate("rfiDetails", { rfi: item,  projectName:this.state.project_Name, activityName:item.activityName,rfiCreator:this.state.rfiCreator, rfiReciever:this.state.rfiReciever });
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