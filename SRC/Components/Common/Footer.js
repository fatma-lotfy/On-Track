import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  senToLogin=()=>{
    this.props.navigation.navigate('login',{})
  }
  render() {
    return (
      <View style={styles.logOutContainerStyle}>
        <TouchableOpacity onPress={this.sendToLogin}>
          <Text style={styles.logoutBtn}>Log out</Text>
        </TouchableOpacity>
        <Text style={styles.logOutTextStyle}>
          {" "}
          Developed by : Ontrack Team ...{" "}
        </Text>
      </View>
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
    fontSize: 20,
    fontweight: "600"
  },
  logoutBtn: {
    color: "#2170FF",
    fontSize:14,
    fontweight:"600",
    textDecorationLine:"underline"
  }
});