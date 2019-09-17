import React, { Component } from "react";
import {Text,View,TextInput, TouchableOpacity, ScrollView, StyleSheet} from "react-native";
import { Icon } from "react-native-elements";

export default class RFIDetails extends Component{
  constructor(props){
    super(props);
    this.state={
      rfi:{},
      projectName:'',
      activityName:'',
      rfiCreator:{},
      rfiReciever:{}
    }
  }
  componentWillMount(){
    const { getParam } = this.props.navigation;
    const rfi = getParam("rfi", {});
    const projectName = getParam("projectName", {});
    const activityName = getParam("activityName", {});
    const rfiCreator = getParam("rfiCreator", {});
    const rfiReciever = getParam("rfiReciever", {});
    this.setState({
      rfi:rfi,
      projectName:projectName,
      activityName:activityName,
      rfiCreator:rfiCreator,
      rfiReciever:rfiReciever
    });
  }
  renderReplySection=()=>{
    if (this.state.rfi.rfiStatus == 0){
      return (
        <View style={{ flexDirection: "column" }}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>Reply: </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Icon
                name="comment"
                color="#547980"
                type="material"
                size={34}
                iconStyle={{
                  marginRight: 5,
                  flex: 1
                }}
              />
              <Text>{this.state.rfi.reply}</Text>
            </View>
          </View>

          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>ٌResponse Date: </Text>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="date-range"
                color="#547980"
                type="material"
                size={34}
                iconStyle={{
                  marginRight: 5,
                  flex: 1
                }}
              />
              <Text>
                {new Date(this.state.rfi.responseDate).toDateString()}
              </Text>
            </View>
          </View>
        </View>
      );
    } //replied rfi
      
    else {
      return (
        <View style={{ flexDirection: "column" }}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>Reply: </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Icon
                name="description"
                color="#1E9F61"
                type="material"
                size={34}
                iconStyle={{
                  marginRight: 5,
                  flex: 1
                }}
              />
              <TextInput
                multiline
                scrollEnabled
                style={styles.textArea}
                placeholder="Enter the RFI Reply here ..... "
              />
            </View>
          </View>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }    
  render(){
        return(
          <ScrollView>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{this.state.projectName}</Text>
            <Text style={styles.headerText}>RFI - {this.state.rfi.id}</Text>
          </View>
  
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>Activity: </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Icon
                name="developer-board"
                color="#547980"
                type="material"
                size={34}
                iconStyle={{
                  marginRight: 5,
                  flex: 1
                }}
              />
              <Text>{this.state.activityName}</Text>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>Creator: </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Icon
                name="person"
                color="#547980"
                type="material"
                size={34}
                iconStyle={{
                  marginRight: 5,
                  flex: 1
                }}
              />
              <Text>{this.state.rfiCreator.fullName}</Text>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>Reciever: </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Icon
                name="person"
                color="#547980"
                type="material"
                size={34}
                iconStyle={{
                  marginRight: 5,
                  flex: 1
                }}
              />
              <Text>{this.state.rfiReciever.fullName}</Text>
            </View>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Date Created: </Text>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="date-range"
                color="#547980"
                type="material"
                size={34}
                iconStyle={{
                  marginRight: 5,
                  flex: 1
                }}
              />
              <Text>{new Date(this.state.rfi.dateCreated).toDateString()}</Text>
            </View>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Date Needed by: </Text>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="date-range"
                color="#547980"
                type="material"
                size={34}
                iconStyle={{
                  marginRight: 5,
                  flex: 1
                }}
              />
              <Text>{new Date(this.state.rfi.dateNeededBy).toDateString()}</Text>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>Question: </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Icon
                name="comment"
                color="#547980"
                type="material"
                size={34}
                iconStyle={{
                  marginRight: 5,
                  flex: 1
                }}
              />
              <Text>{this.state.rfi.question}</Text>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>Suggestion: </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
            <Icon
              name="comment"
              color="#547980"
              type="material"
              size={34}
              iconStyle={{
                marginRight: 5,
                flex: 1
              }}
        />
        <Text>{this.state.rfi.suggestion}</Text>
      </View>
    </View>
          {this.renderReplySection()}
        </ScrollView>
  
        );
    }
  } 
  const styles = StyleSheet.create({
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
    headerText: {
      fontSize: 14,
      fontWeight: "400",
      color: "#ffffff"
    },
    dateContainer: {
      paddingLeft: 15,
      paddingTop: 10,
      paddingBottom: 10,
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
    dateLabel: {
      color: "#000",
      fontSize: 14,
      fontWeight: "400",
      marginBottom: 5
    },
    datePicker: {
      marginLeft: 15,
      borderRadius: 3,
      borderColor: "#547980",
      borderWidth: 2
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
    textArea: {
      flex: 6,
      height: 60,
      borderWidth: 2,
      borderColor: "#1E9F61",
      borderRadius: 10
    },
    uploadButton: {
      marginTop: 10,
      height: 45,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 30,
      backgroundColor: "#547980",
      marginHorizontal: 10
    },
    uploadButtonText: {
      color: "#FFFFFF",
      fontSize: 20
    }
  });