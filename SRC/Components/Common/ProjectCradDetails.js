import React, { Component } from "react";
import { Text, View, Dimensions} from "react-native";
import {Icon} from 'react-native-elements'

export default class ProjectDetails extends Component{
    render(){
        const{project_Name, start_Date, projectLocation, end_Date}=this.props.project;        
        const styles = {
          ContainerViewStyle:{
              marginBottom:10,
                flexDirection: 'row',
                alignItems: 'center',
                padding:10,
                backgroundColor:"#fff",
                borderWidth:0,
                borderRadius:5,
                shadowColor: "#808080",
                shadowOffset: {
                borderWidth: 0,
                height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                minHeight:100,
                minWidth:Dimensions.get('window').width-30,
                },
            iconStyle:{
                marginRight:10,
            },
          TextStyle: {
            fontSize: 12,
            color: "#000"
          },
          textContainerStyle:{
            flexDirection: 'column',
            justifyContent:'space-between'
          },
        };
        return(
            <View style={styles.ContainerViewStyle}>
                <Icon name="business" color="#547980" size={36} iconStyle={styles.iconStyle}></Icon>
                <View style={styles.textContainerStyle}>
                    <Text>Title: {project_Name}</Text>
                    <Text>Start Date: {new Date(start_Date).toDateString()}</Text>
                    <Text>End Date: {end_Date.slice(0,10)}</Text>
                    <Text>Location: {projectLocation}</Text>
                </View>
            </View>
        )
    }
}