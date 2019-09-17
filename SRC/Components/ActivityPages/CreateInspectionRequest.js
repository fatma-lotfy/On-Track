import React, { Component } from "react";
import {View,Text,TouchableOpacity, ScrollView, StyleSheet, Dimensions} from "react-native";
import { Icon } from "react-native-elements";

export default class CreateInspectionRequest extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const screenSize = Dimensions.get("window").width;
    return (
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Project Name</Text>
          <Text style={styles.headerText}>Submittal Id: 7</Text>
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
            <Text>17-06-2019</Text>
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
            <Text>Creator Name</Text>
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
            <Text>Reciever Name</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Upload Attachments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Submit</Text>
        </TouchableOpacity>        
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
    height: 40,
    borderWidth: 2,
    borderColor: "#547980",
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