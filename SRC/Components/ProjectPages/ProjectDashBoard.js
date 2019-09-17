import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { Icon } from "react-native-elements";
import * as Progress from "react-native-progress";
import AccordionComponent from '../Common/AccordionComponent';
import MyPieChart from '../ChartsComponents/MyPieChart';
import Loading from '../Common/Loading';
import axios from 'axios';
import Ip from '../IP';

export default class ProjectDashBoard extends Component{
  constructor(props){
    super(props);
    this.state = {
      id: 0,
      project_Name: "",
      start_Date: "",
      end_Date: "",
      projectCreator: "",
      description: "",
      owner: "",
      contractType: "",
      projectLocation: "",
      area: 0,
      estimatedDuration: 0,
      activities: [],      
      error:'',
      loading:false,
      user:{},
      rfi:{}
    };
  }
  componentWillMount(){
    const { getParam } = this.props.navigation;
    const project = getParam("project", {});
    const user = getParam("user", {});
    this.setState({
      id:project.id,      
      project_Name: project.project_Name,
      start_Date: project.start_Date,
      end_Date: project.end_Date,
      projectCreator: project.projectCreator,
      description: project.description,
      owner: project.owner,
      contractType: project.contractType,
      projectLocation: project.projectLocation,
      area: project.area,
      estimatedDuration: project.estimatedDuration,
      activities: project.activities,
      loading: false,
      user:user
    });    
  }  
  getProjectData=()=>{
    this.setState({loading:true});
    axios
      .get(Ip+"/OnTrack/api/projects/projectdashboard?id="+this.state.id)
      .then(response =>
        this.setState({
          id: response.data.id,
          project_Name: response.data.project.project_Name,
          start_Date: response.data.project.start_Date,
          end_Date: response.data.project.end_Date,
          projectCreator: response.data.project.projectCreator,
          description: response.data.project.description,
          owner: response.data.project.owner,
          contractType: response.data.project.contractType,
          projectLocation: response.data.project.projectLocation,
          area: response.data.project.area,
          estimatedDuration: response.data.project.estimatedDuration,
          activities: response.data.project.activities,
          loading: false
        })
      )
      .catch(err => this.setState({ error: err, loading: false }));
  }
  sendToLogin=()=>{
    this.props.navigation.navigate("login", {});
  }
  getActivityData=(id)=>{
    axios.get(Ip+"/OnTrack/api/activities/getactivity/?id="+id)
    .then(response=>{
      this.setState({ activity:response.data })
      this.props.navigation.navigate('activity',{activity:response.data, user:this.state.user}) 
      } 
    )
    .catch(err=> this.setState({
      error:err,
    }))
  }
  getRfiData=(id)=>{
    axios.get(Ip+"/OnTrack/api/rfis/getrfibyid/?id="+id)
    .then(response=>{
      this.setState({rfi:response.data})
      this.props.navigation.navigate('rfiDetails',{rfi:this.state.rfi, projectName:this.state.project_Name, rfiCrteator: this.state.rfi.creator.fullName, rfiReciever:this.state.rfi.reciever.fullName, activityName:''})
    })
    .catch(err=> this.setState({
      error:err
    }))
  }
  
  render(){
    let onProgressActivities=[];
    let completedActivities=[];
    let pendingActivities=[];
    let projectRfis =[];
    let notRepliedRfis=[];
    let repliedRfis=[];
    let projectInspectionRequests=[];
    let approvedInspectionRequest=[];
    let notApprovedInspectionRequest=[];
    let pendingInspectionRequest=[];
    let projectDuration=0;
    let percentageOfCompletion=0;
    let percentageOfRFIsNotReplied=0;
    let elapsedTime=0;

    if(this.state.activities){
      for (let i = 0; i < this.state.activities.length; i++) {
        if (this.state.activities[i].status == 1) {
          onProgressActivities.push(this.state.activities[i]);
          projectRfis.push(...this.state.activities[i].rfIs);
        }
        if (this.state.activities[i].status == 2) {
          completedActivities.push(this.state.activities[i]);
          projectRfis.push(...this.state.activities[i].rfIs);
        }
        if (this.state.activities[i].status == 0) {
          pendingActivities.push(this.state.activities[i]);
          projectRfis.push(...this.state.activities[i].rfIs);
        }
      }

      for(let i=0; i<projectRfis.length; i++){
        if(projectRfis[i].rfiStatus == 0){
          repliedRfis.push(projectRfis[i]);
        }
        else{
          notRepliedRfis.push(projectRfis[i]);
        }
      }
      for(let i=0; i<this.state.activities.length; i++){
        projectInspectionRequests.push(...this.state.activities[i].inspectionRequests);
      }
      for(let i=0; i<projectInspectionRequests.length; i++){
        if(projectInspectionRequests[i].inspectionRequestStatus == 0){
          approvedInspectionRequest.push(projectInspectionRequests[i]);
        }
        else if(projectInspectionRequests[i].inspectionRequestStatus == 1){
          notApprovedInspectionRequest.push(projectInspectionRequests[i])
        }
        else{
          pendingInspectionRequest.push(projectInspectionRequests[i])
        }
      }
     projectDuration=this.state.estimatedDuration;

     elapsedTime = Math.floor((new Date()-new Date(this.state.start_Date))/(1000*60*60*24));
    
     percentageOfCompletion=Math.floor((completedActivities.length/(this.state.activities.length))*100);    
    
     percentageOfRFIsNotReplied=Math.ceil((notRepliedRfis.length/(projectRfis.length))*100);
    }
    
    return (
      <ScrollView>
        {this.state.loading ? <Loading /> : null}
        <View style={styles.container}>
          {/* Screen Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {this.state.project_Name}
            </Text>
            <Text style={{ fontSize: 20 }}>Project DashBoard</Text>
          </View>

          <View style={styles.ProjectContent}>
            {/* No of Activities Info Element */}
            <View style={styles.infoElement}>
              <Text style={styles.infoElementLabel}>
                Total Number of Activities:{" "}
              </Text>
              <View style={styles.infoElementContentView}>
                <Icon
                  name="class"
                  color="#547980"
                  type="material"
                  size={25}
                />
                <Text style={styles.infoElementTextStyle}>
                  {this.state.activities.length}
                </Text>
              </View>
            </View>

            {/* No of RFIs Info Element */}
            <View style={styles.infoElement}>
              <Text style={styles.infoElementLabel}>
                Total Number of RFIs:{" "}
              </Text>
              <View style={styles.infoElementContentView}>
                <Icon
                  name="assignment"
                  color="#547980"
                  type="material"
                  size={25}
                />
                <Text style={styles.infoElementTextStyle}>
                  {projectRfis.length}
                </Text>
              </View>
            </View>

            {/* Project Duration Info Element */}
            <View style={styles.infoElement}>
              <Text style={styles.infoElementLabel}>
                Estimated Project Duration:{" "}
              </Text>
              <View style={styles.infoElementContentView}>
                <Icon
                  name="schedule"
                  color="#547980"
                  type="material"
                  size={25}
                />
                <Text style={styles.infoElementTextStyle}>
                  {projectDuration} Days
                </Text>
              </View>
            </View>

            {/* Project location Info Element */}
            <View style={styles.infoElement}>
              <Text style={styles.infoElementLabel}>
                Project Location:{" "}
              </Text>
              <View style={styles.infoElementContentView}>
                <Icon
                  name="place"
                  color="#547980"
                  type="material"
                  size={25}
                />
                <Text style={styles.infoElementTextStyle}>
                  {this.state.projectLocation}
                </Text>
              </View>
            </View>

            {/* Project Description Info Element */}
            <View style={styles.infoElement}>
              <Text style={styles.infoElementLabel}>
                Project Description:{" "}
              </Text>
              <View style={styles.infoElementContentView}>
                <Text style={styles.ProjectDescription}>
                  {this.state.description}
                </Text>
              </View>
            </View>

            {/* Project Dates Info Element */}
            <View style={styles.infoElement}>
              <Text style={styles.infoElementLabel}>Project Dates : </Text>
              <View style={styles.dateElementContentView}>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-evenly"
                  }}
                >
                  <Text style={styles.date}>
                    Start Date :
                    {new Date(this.state.start_Date).toDateString()}
                  </Text>
                  <Text style={styles.date}>
                    End Date :{" "}
                    {new Date(this.state.end_Date).toDateString()}
                  </Text>
                </View>
              </View>
            </View>
            {/* Project statistics progress */}
            <View style={styles.infoElement}>
              <Text style={styles.infoElementLabel}>
                Project Monitoring Statistics:{" "}
              </Text>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <View style={styles.statisticsElementContentView}>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text style={styles.infoElementLabel}>
                      Project Elapsed Time
                    </Text>
                    <Text style={styles.chartDataStyle}>
                      {elapsedTime} Days out of {projectDuration} Days
                    </Text>
                  </View>
                  <Progress.Circle
                    progress={elapsedTime / projectDuration}
                    size={70}
                    showsText={true}
                    formatText={() => {
                      return (
                        Math.floor((elapsedTime / projectDuration) * 100) +
                        " %"
                      );
                    }}
                    direction="clockwise"
                    strokeCap="round"
                    thickness={4}
                    color="#2C9FCC"
                    animated
                    style={{ marginBottom: 10 }}
                  />
                </View>
                
                <View style={styles.statisticsElementContentView}>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text style={styles.infoElementLabel}>
                      Project Completion
                    </Text>
                    <Text style={styles.chartDataStyle}>
                      {completedActivities.length} Activities out of{" "}
                      {this.state.activities.length} Activities
                    </Text>
                  </View>
                  <Progress.Circle
                    progress={percentageOfCompletion / 100}
                    size={70}
                    showsText={true}
                    formatText={() => {
                      return percentageOfCompletion + " %";
                    }}
                    direction="clockwise"
                    strokeCap="round"
                    thickness={4}
                    color="#2C9FCC"
                    animated
                    style={{ marginBottom: 10 }}
                  />
                </View>
                <View style={styles.statisticsElementContentView}>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text style={styles.infoElementLabel}>
                      Pending RFIs
                    </Text>
                    <Text style={styles.chartDataStyle}>
                      {notRepliedRfis.length} RFIs out of{" "}
                      {projectRfis.length} RFIs
                    </Text>
                  </View>
                  <Progress.Circle
                    progress={percentageOfRFIsNotReplied / 100}
                    size={70}
                    showsText={true}
                    formatText={() => {
                      return percentageOfRFIsNotReplied + " %";
                    }}
                    direction="clockwise"
                    strokeCap="round"
                    thickness={4}
                    color="#2C9FCC"
                    animated
                    style={{ marginBottom: 10 }}
                  />
                </View>
                {/* Project Activities Pie Chart*/}
                <View>
                  <MyPieChart
                    OnProgressActivities={onProgressActivities.length}
                    PendingActivities={pendingActivities.length}
                    FinishedActivities={completedActivities.length}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Onprogress Activities Accordion*/}
          <View>
            <AccordionComponent
              HeaderText="On Progress Activities"
              dataArray={onProgressActivities}
              accessor="name"
              sendToItem={item=>{this.getActivityData(item.id)}}
            />

            {/* Not Replied RFIs Accordion*/}
            <AccordionComponent
              HeaderText="Pending RFIs"
              dataArray={notRepliedRfis}
              accessor="id"
              sendToItem={item=>this.getRfiData(item.id)}
            />
          </View>
              <View style={{marginTop:10}}></View>
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
  container: {
    flex: 1
  },
  infoElement: {
    flexDirection: "column",
    paddingVertical: 5
  },
  infoElementLabel: {
    color: "#000",
    fontSize: 12
  },
  infoElementContentView: {
    backgroundColor: "#fff",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
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
  statisticsElementContentView: {
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
  chartDataStyle: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600"
  },
  dateElementContentView: {
    backgroundColor: "#fff",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 5
  },
  infoElementTextStyle: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
    marginLeft: 10
  },
  header: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#547980",
    flexDirection: "column"
  },
  headerTitle: {
    fontSize: 25,
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  ProjectContent: {
    flex: 1,
    padding: 30
  },
  ProjectDescription: {
    fontSize: 12,
    marginTop: 10,
    color: "#000",
    textAlign: "justify"
  },
  date: {
    color: "#000",
    marginVertical: 5,
    fontSize: 14,
    fontWeight: "600"
  }
});