import DashBoard from './ProjectDashBoard';
import Activities from './ProjectActivities';
import RFIs from './ProjectRFIS';
import IRs from './ProjectIRs'
import{createAppContainer, createMaterialTopTabNavigator} from 'react-navigation';

const tabNavigator= createMaterialTopTabNavigator({
    "Dash-Board": DashBoard,
    "Activities": Activities,
    "RFIs":RFIs,
    "IRs": IRs
})
export default createAppContainer(tabNavigator);