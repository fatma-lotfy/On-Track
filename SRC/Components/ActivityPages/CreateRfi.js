import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {Icon, Divider} from 'react-native-elements';
import axios from 'axios';
import Ip from '../IP';

export default class CreateRfi extends Component {
    constructor(props){
        super(props);
        this.state ={
          activity:{},
          suggestion:'',
          question:'',
          dateNeededBy:''
        }
    }
    manipulateDate=(date)=>{
      var dateArray = date.split("-");
      var day=dateArray[2];
      var month = dateArray[1];
      var year = dateArray[0];
      return month+"/"+day+"/"+year ;
    }    
    handleSubmit = () => {
      var newDate = this.manipulateDate(this.state.dateNeededBy);
      axios.post(`${Ip}/ontrack/api/rfis/postrfis?Suggestion=${this.state.suggestion}&Question=${this.state.question}&dateNeededBy=${newDate}&creatorId=${this.state.activity.assignedContractor.id}&recieverId=${this.state.activity.assignedConsultant.id}&ActivityId=${this.state.activity.id}`)
        .then(res => { Alert.alert("Alert", "Successfully added" + res.data); })
        .catch((error) =>{ Alert.alert("Alert", "Problem is: " + error); });    
    }
    componentWillMount(){
      const { getParam } = this.props.navigation;
      const activity = getParam("activity", {});
      this.state.activity = activity;
    }
    render() {     
    const {activity}=this.state;
    return (      
      <ScrollView>        
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{activity.name}</Text>
            <Text style={styles.headerText}>Create RFI</Text>
          </View>

          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Date Needed by: </Text>
            <View style={{flexDirection:"row"}}>
              <Icon name="date-range" color = "#547980" type="material" size={34} 
              iconStyle={{ position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0}}
                            />
              <DatePicker
              date={this.state.dateNeededBy}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate={(new Date().getFullYear().toString())+"-"+((new Date().getMonth()+1).toString())+"-"+(new Date().getDate().toString())}
              maxDate={activity.project.end_Date.slice(0,10)}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateInput: {
                  marginLeft: 40,
                  borderColor: "#547980",
                  borderWidth:2,
                  borderRadius:10,
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date)=>{
                this.setState({dateNeededBy:date})                               
                }}
              //onDateChange={(date) => {this.setState({dateNeededBy: (+date.getMonth().toString()+"-"+date.getDate().toString()+"-"+date.getFullYear().toString())})}}
            />              
            </View>
          </View>
          <Text>{this.manipulateDate(this.state.dateNeededBy)}</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>Question: </Text>
            <View style={{
              flexDirection:"row",
              alignItems:"center",
              justifyContent:"center"
            }}>
              <Icon name="description" color="#547980" type="material" size={34} iconStyle={{
                marginRight:5,
                flex:1
              }}/>
              <TextInput multiline scrollEnabled 
                        style={styles.textArea} 
                        placeholder="Enter the RFI Question here ..... " 
                        keyboardType="email-address" 
                        underlineColorAndroid='transparent'
                        onChange ={(question) => this.setState({question:question})}
                        onChangeText={(question) => this.setState({question:question})}
              />

            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>Suggestion: </Text>
            <View style={{
              flexDirection:"row",
              alignItems:"center",
              justifyContent:"center"
            }}>
              <Icon name="description" color="#547980" type="material" size={34} iconStyle={{
                marginRight:5,
                flex:1
              }}/>
              <TextInput multiline scrollEnabled 
                        style={styles.textArea} 
                        placeholder="Enter the RFI Suggestion here ..... "
                        keyboardType="email-address" 
                        underlineColorAndroid='transparent'
                        onChange ={(suggestion) => this.setState({suggestion:suggestion})}
                        onChangeText={(suggestion) => this.setState({suggestion:suggestion})}
              />
            </View>
          </View>
          

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button}>
              <Icon name="add-a-photo" color="#ffff" type="material" size={30} iconStyle={{
                marginLeft:20}}/>
              <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center", width:250}}>
                <Text style={styles.btnText}>Attach photo</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Icon name="upload" color="#fff" type="font-awesome" size={30} iconStyle={{marginLeft:20}}/>
              <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center", width:250}}>
                <Text style={styles.btnText}>Attach Document</Text>
              </View>
            </TouchableOpacity>
          </View>          
          <Divider style={{ backgroundColor: "#547980", marginLeft:15, marginRight:15, height:1, marginTop:15 }}/>
          
          <TouchableOpacity style={styles.SubmitButton} onPress={this.handleSubmit}>
            <Text style={styles.SubmitButtonText}>Submit RFI</Text>
          </TouchableOpacity>

      </ScrollView>
      );
  }
}
const styles= StyleSheet.create({
  headerContainer:{
    backgroundColor:"#547980",
    paddingTop:20,
    paddingBottom: 20,
    paddingLeft: 30,
    flexDirection: 'column',
    justifyContent:"center",
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  headerTitle:{
    fontSize:20,
    fontWeight: '800',
    color:"#ffffff",
  },
  headerText:{
    fontSize:14,
    fontWeight:"400",
    color:"#ffffff",
  },
  dateContainer:{
    paddingLeft:15,
    paddingTop:10,
    paddingBottom:10,
    marginLeft: 15,
    marginRight:15,
    flexDirection:"column",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    shadowColor: '#dfdfdf',
    shadowOpacity: 0.4,
    shadowOffset:{
      width:0,
      height:6
    },
    elevation:1,
    justifyContent:"center",
    alignItems:"flex-start",
    marginBottom:10,
  },
  dateLabel:{
    color:"#000",
    fontSize:14,
    fontWeight:"400",
    marginBottom:5,
  },
  datePicker:{    
    marginLeft:15,
    borderRadius:3,
    borderColor:"#547980",
    borderWidth:2,
    width: 295
  },
  descriptionContainer:{
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight:15,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: "column",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    shadowColor: '#dfdfdf',
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 6
    },
    elevation: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  descriptionText:{
    color:"#000",
    fontSize:14,
    fontWeight:"400",
    marginBottom:5,
  },
  textArea:{    
    flex:6,
    height:80,
    borderWidth:2,
    borderColor:"#547980",
    borderRadius:10,    
  },
  buttonsContainer:{
    marginLeft:15,
    marginRight:15,
    flexDirection:"column",
  },
  button:{    
    flexDirection:"row",
    alignItems:"center",
    height:40,
    backgroundColor:"#547980",
    borderRadius:20,
    marginBottom:10
  },
  btnText:{
    color:"#ffffff",
    fontWeight:"400",
    fontSize:16,
  },
  SubmitButton: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#547980",
    marginHorizontal: 10
  },
  SubmitButtonText: {
    color: "#FFFFFF",
    fontSize: 16
  }
})