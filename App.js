import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import RoutingComponent from './SRC/Components/RoutingComponent';
import RFIDetails from './SRC/Components/ActivityPages/RFIDetails';
import InspectionReqDetails from './SRC/Components/ActivityPages/InspectionReqDetails';
import InspectionReqToApprove from './SRC/Components/ActivityPages/InspectionReqToApprove';
import CreateInspectionRequest from './SRC/Components/ActivityPages/CreateInspectionRequest';
import CreateRfi from './SRC/Components/ActivityPages/CreateRfi';
import ActivityRFIS from './SRC/Components/ActivityPages/ActivityRfis';

export default class App extends React.Component {
  render() {
    return (
       //<Activity></Activity>
       <RoutingComponent/>
       //<InspectionReqDetails/>
       //<RFIDetails/>
      //<InspectionReqToApprove/>
       //<CreateInspectionRequest/>
       //<CreateRfi/>
       //<ActivityRFIS/>
       
    );
  }
}