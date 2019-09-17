import React, { Component } from 'react'
import { Text, View , StyleSheet , TouchableOpacity } from 'react-native'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { ListItem, Separator } from 'native-base';

export default class AccordionComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
          dataArray: [],
          accessor:""
        };
    }    
    componentWillMount(){
        this.setState({
          dataArray:this.props.dataArray,
          accessor:this.props.accessor
        })
    }
    navigateToItem = (item) => {
        this.props.sendToItem(item);
    }
    render() {
    return (
    <View  style={{marginTop:10}}>
        <Collapse>
            <CollapseHeader style ={styles.header}>
                <Separator bordered style= {styles.separatorStyle}>
                    <Text style ={styles.headerText}>
                        {this.props.HeaderText}
                    </Text>
                    <Text style={styles.numberStlye}>{this.props.dataArray.length}</Text>
                </Separator>
            </CollapseHeader>
            <CollapseBody>
                {
                  this.state.dataArray.map(item => (
                  <ListItem key={item[this.state.accessor]}>
                  <TouchableOpacity onPress={()=>this.navigateToItem(item)}>
                      <Text>{item[this.state.accessor]}</Text>
                  </TouchableOpacity>
                  </ListItem>
                  ))
                }
            </CollapseBody>
        </Collapse>
    </View>
    )
  }
}
const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: "#83AF9B",
    minHeight: 40,
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10
  },
  numberStyle: {
    fontWeight: "800",
    fontSize: 20,
    color: "#000"
  },
  headerText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600"
  },
  separatorStyle: {
    backgroundColor: "#83AF9B",
    paddingHorizontal: 10,
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  containerStyle: {
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 5
  },
  infoContainerStyle: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-between",
    marginRight: 5
  },
  progressCircleContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5
  },
  titleTextStyle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000"
  },
  dataContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  dataTextStyle: {
    fontSize: 10,
    color: "#000",
    fontWeight: "300"
  },
  iconContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});