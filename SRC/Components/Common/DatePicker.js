import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';

export default class MyDatePicker extends Component {
    constructor(props) {
        super(props)
        let date = new Date().getDate(); 
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        const today = date+'-'+month+'-'+year;
        this.state = {
            date: today
        }
    }
    render(){
    return (
      <DatePicker
        style={{width: 295}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="DD-MM-YYYY"
        minDate="01-01-1999"
        maxDate="31-12-2100"
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
        onDateChange={(date) => {this.setState({date: date})}}
      />
    )
  }
}