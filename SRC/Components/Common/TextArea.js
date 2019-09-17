import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, TextInput} from 'react-native';

export default class TextArea extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('RFI Description is saved !!');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <TextInput style={{flex:1, height:250, borderColor:"#000"}}></TextInput>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }} style={{width:250, borderColor:"#547980"}}>
                <Text>Submit Description</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Enter Description</Text>
        </TouchableHighlight>
      </View>
    );
  }
}