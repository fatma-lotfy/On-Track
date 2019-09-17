import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

export default class ActivityLineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[],
      highlabels:["1","2","3","4","5"],
      highdata:[1,2,3,4,5],
      showLoading:false
    };
  }
  shuffle(array) {
    let currentIndex = array.length,
      temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  componentWillMount(){
        this.setState({showLoading: true});
        setTimeout(()=>{
          this.setState({
            showLoading:false,
          })
        },5000);
        
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response => {
          const users = this.shuffle(response.data);
          const labels = users.map((user)=>{return user.name.split(" ",1)});
          const locationData = users.map((user)=>{return user.address.geo.lng});
          return this.setState({ 
            users: response.data,
            highlabels:labels,
            highdata:locationData,
            showLoading:false
          });
        })
        .catch(error => {alert(error.message)});
  }
  render() {
    const chartConfig = {
          backgroundGradientFrom: "#000080",
          backgroundGradientTo: "#0F52BA",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          strokeWidth: 3,
        };
        const newUserNames = this.state.highlabels;
        const newLocations = this.state.highdata;
        const data = {
            labels: newUserNames.slice(0,4),
            datasets: [{
                data: newLocations.slice(0,4),
            }]
        }

        return(
        <View>
          <Spinner
                    style={{flex:1}}
                    visible={this.state.showLoading}
                    textContent={'Loading...'}
                    animation="slide"
                    overlayColor="rgba(0,0,0,0.4)"
                    color="rgba(255,255,255,1)"
                    textStyle={{color:"rgba(255,255,255,1)"}}
                    size="small"
                    cancelable={true}
                    />
          <LineChart
                users={this.props.users}
                data={data}
                width={Dimensions.get('window').width-40}
                height={200}
                chartConfig={chartConfig}
                Bezier
                style = {{
                  borderRadius: 20,
                }}
            />
            <Text style={{
              fontSize:12,
              color:'rgba(0,0,0,1)',
              marginLeft:10,
              marginTop: 10,
            }}>Activity Cost Tracking Chart</Text>
          </View> 
            );
  }
}