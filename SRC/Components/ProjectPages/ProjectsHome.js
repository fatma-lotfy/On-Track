import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions} from 'react-native';
import ProjectCardDetails from '../Common/ProjectCradDetails'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import axios from 'axios';
import Ip from '../IP';

export default class ProjectsHome extends Component {
  constructor(props){
    super(props);
    this.state={
      projects:[],
      project:{},
      error:'',
      user:{}
    }
  }
  componentWillMount(){
    const { getParam } = this.props.navigation;
    const projects = getParam("projects", {});
    const user = getParam("user", {});
    this.setState({
      projects:projects,
      user:user
    })
  }
  sendToLogin=()=>{
    this.props.navigation.navigate("login", {});
  }
  navigateToProjectTabNavigator=(project)=>{
    this.props.navigation.navigate("ProjectsTabNavigator", {project:project, user:this.state.user});
  }
  getProjectData=(id)=>{
    axios.get(Ip+'/OnTrack/api/projects/projectdashboard?id='+id)
    .then(response=>{
      this.setState({project:response.data.project});
      this.navigateToProjectTabNavigator(this.state.project)
    })
    .catch(err=>this.setState({
      error:err
    }))

  }
  renderProjectList=()=>{
      return this.state.projects.map(project => (
        <View key={project.id}>
          <ProjectCardDetails project={project} />
          <Button 
          title={"Go To Project"} 
          onPress={()=>{this.getProjectData(project.id)}} 
          type="outline" 
          buttonStyle={
              {
                  borderColor:"#547980",
                  marginBottom:10,
                  height:30,
                  borderRadius:15
              }
            } 
          titleStyle={{color:"#547980", fontSize:16}}/>
        </View>
      ));
  }
  render() {
        let jobType;
        const{user}=this.state;
        if(user.jobType == 1){
          jobType="Project Manager"
        }
        else if(user.jobType == 2){
          jobType="Contractor"
        }
        else{
          jobType="Consultant"
        }
        const styles = StyleSheet.create({
          contactContainer:{
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            marginLeft:170,
            marginBottom:20
          },
          contactNameTextStyle:{
            fontSize:12,
            fontWeight:"600",
            color:"#fff"
          },
          contactJobTitleStyle:{
            fontSize:10,
            color:"#fff",
            fontWeight:"300"
          },
          Container: {
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height-100,
            backgroundColor: "#DADADA"
          },
          textContainer: {
            marginBottom: 20,
            justifyContent: "center",
            alignItems: "center",
            minHeight: 100,
            backgroundColor: "#547980",
            shadowColor: "#808080",
            shadowOffset: {
              width: 0,
              height: 2
            },
            minWidth: Dimensions.get("window").width,
            shadowOpacity: 0.25,
            shadowRadius: 3.84
          },
          welcomeTextStyle: {
            fontSize: 18,
            color: "#fff",
            fontWeight: "800"
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
        const{textContainer, welcomeTextStyle}=styles
        return (
        <ScrollView contentContainerStyle={{ minHeight: Dimensions.get("window").height - 210, flexDirection:"column", justifyContent:"space-between" }}>
            <View style={styles.Container}>
                <View style={textContainer}>
                    <View style={styles.contactContainer}>
                      <Text style={styles.contactNameTextStyle}>{this.state.user.fullName}</Text>
                      <Text style={styles.contactJobTitleStyle}>{jobType}</Text>
                    </View>
                    <Text style={welcomeTextStyle}>Projects List</Text>
                </View>
                <View style={{paddingHorizontal:5}}>
                    {this.renderProjectList()}
                </View>
            </View>
            <View style={{ marginTop: 10 }} />

        {/* Footer*/}
        <View style={styles.logOutContainerStyle}>
          <TouchableOpacity onPress={this.sendToLogin}>
            <Text style={styles.logoutBtn}>Log out</Text>
          </TouchableOpacity>
          <Text style={styles.logOutTextStyle}>            
            Developed by : Ontrack Team ...
          </Text>
        </View>
        </ScrollView>
    )
  }
}