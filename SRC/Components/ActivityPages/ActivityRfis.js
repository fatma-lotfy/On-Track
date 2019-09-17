import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions} from 'react-native';
import { Button } from 'react-native-elements';
import RFICardDetails, {} from '../Common/RFICardDetails';
import axios from 'axios';
import Ip from '../IP';

export default class ActivityRFIS extends Component {
  constructor(props) {
    super(props);
   this.state = {
     rfIs :[],
     activity:{},
     activityName:'',
     user:{},
     rfi:{},
     error:''     
    }
    
  }
  componentWillMount(){
    const { getParam } = this.props.navigation;
    const activity = getParam("activity", {});
    const user = getParam("user", {});
    this.setState({
      activity:activity,
      rfIs:activity.rfIs,
      activityName:activity.name,
      user:user,
    });
  }
  getRFIdetails=(id)=>{
    axios.get(Ip+"/OnTrack/api/rfis/getrfibyid/"+id)
    .then(response=>{this.setState({rfi:response.data})
          this.props.navigation.navigate('RFIDetailsFromActivity',{rfi:response.data, activity:this.state.activity});
  })
    .catch(err=>this.setState({
      error:err
    }))    
  }
  renderProjectList=()=>{
    return this.state.rfIs.map(rfi => (
      <View key={rfi.id}>
        <RFICardDetails rfi={rfi} />
        <Button
          title={"Details"}
          type="outline"
          onPress={() => this.getRFIdetails(rfi.id)}
          buttonStyle={{
            borderColor: "#547980",
            marginBottom: 10,
            height: 30,
            borderRadius: 15
          }}
          titleStyle={{ color: "#547980", fontSize: 16 }}
        />
      </View>
    ));
}
  render() {
    return (
      <ScrollView>
      <View style={styles.Container}>
          <View style={textContainer}>
              <Text style={welcomeTextStyle}> {this.state.activityName}' RFIs </Text>
          </View>
          <View style={{paddingHorizontal:5}}>
              {this.renderProjectList()}
          </View>
      </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  Container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
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
    fontSize: 22,
    color: "#fff",
    fontWeight: "800"
  }
});
const{textContainer, welcomeTextStyle}=styles