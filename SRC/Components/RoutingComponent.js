import {createStackNavigator as createStack , createAppContainer as routingContainer } from 'react-navigation';

import Login from'./Login';

import ProjectsHome from './ProjectPages/ProjectsHome';
import ProjectDashBoard from './ProjectPages/ProjectDashBoard';
import ProjectActivities from './ProjectPages/ProjectActivities';
import ProjectRFIs from './ProjectPages/ProjectRFIS';
import ProjectIRs from './ProjectPages/ProjectIRs';
import ProjectsTabNavigator from './ProjectPages/ProjectsTabNavigator'

import Activity from './ActivityPages/Activity';
import ActivityRFIS from './ActivityPages/ActivityRfis';
import CreateInspectionRequest from './ActivityPages/CreateInspectionRequest';
import CreateRfi from './ActivityPages/CreateRfi';
import InspectionReqDetails from './ActivityPages/InspectionReqDetails';
import InspectionReqToApprove from './ActivityPages/InspectionReqToApprove';
import RFIDetail from './ActivityPages/RFIDetails';
import RFIDetailsFromActivity from './ActivityPages/RFIDetailsFromActivity';


const navigation = createStack({
  login: {
    screen: Login,
    path: "/login",
    headerMode: "none",
    navigationOptions: () => ({
      header: null,
      headerVisible: false,
      title: "Login Screen",
      headerBackTitle: null
    })
  },
  projectsPage: {
    screen: ProjectsHome,
    path: "/projectsHome",
    headerMode: "none",
    navigationOptions: () => ({
      header: null,
      headerVisible: false,
      title: "Projects Home Screen",
      headerBackTitle: null
    })
  },
  project: {
    screen: ProjectDashBoard,
    path: "/project",
    navigationOptions: () => ({
      title: "Project Screen",
      headerBackTitle: null
    })
  },
  projectActivities: {
    screen: ProjectActivities,
    path: "/projectActivities",
    navigationOptions: () => ({
      title: "Project Activities",
      headerBackTitle: null
    })
  },
  projectRFIs: {
    screen: ProjectRFIs,
    path: "/projectRFIs",
    navigationOptions: () => ({
      title: "Project RFIs",
      headerBackTitle: null
    })
  },
  ProjectIRs: {
    screen: ProjectIRs,
    path: "/ProjectIRs",
    navigationOptions: () => ({
      title: "Project IRs",
      headerBackTitle: null
    })
  },
  ProjectsTabNavigator: {
    screen: ProjectsTabNavigator,
    path: "/ProjectsTabNavigator",
    headerMode: "none",
    navigationOptions: () => ({
      header: null,
      headerVisible: false,
      title: "Projects Home Screen",
      headerBackTitle: null
    })
  },

  activity: {
    screen: Activity,
    path: "/Activity",
    navigationOptions: () => ({
      title: "Activity DashBoard",
      headerBackTitle: null
    })
  },
  ActivityRFIS: {
    screen: ActivityRFIS,
    path: "/ActivityRFIS"
  },
  CreateInspectionRequest: {
    screen: CreateInspectionRequest,
    path: "/CreateInspectionRequest",
    navigationOptions: () => ({
      title: "Create Inspection Request",
      headerBackTitle: null
    })
  },
  createRfi: {
    screen: CreateRfi,
    path: "/CreateRfi",
    navigationOptions: () => ({
      title: "Create RFI",
      headerBackTitle: null
    })
  },
  InspectionReqDetails: {
    screen: InspectionReqDetails,
    path: "/InspectionReqDetails",
    navigationOptions: () => ({
      title: "Inspection Request Details",
      headerBackTitle: null
    })
  },
  InspectionReqToApprove: {
    screen: InspectionReqToApprove,
    path: "/InspectionReqToApprove",
    navigationOptions: () => ({
      title: "Approve Inspection Request",
      headerBackTitle: null
    })
  },
  rfiDetails: {
    screen: RFIDetail,
    path: "/RFIDetail",
    navigationOptions: () => ({
      title: "RFI Details",
      headerBackTitle: null
    })
  },
  RFIDetailsFromActivity: {
    screen: RFIDetailsFromActivity,
    path: "/RFIDetailsFromActivity",
    navigationOptions: () => ({
      title: "RFI Details",
      headerBackTitle: null
    })
  }
});
export default routingContainer(navigation);