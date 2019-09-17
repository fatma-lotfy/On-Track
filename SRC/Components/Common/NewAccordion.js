import React, { Component } from "react";
import { Content, Accordion, View } from "native-base";
const dataArray = [
  { title: <View></View>, content: "Lorem ipsum dolor sit amet" },
  { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];
export default class AccordionExample extends Component {
    constructor(){
        this.state={
            dataArray:[],
        }
    }
    componentWillMount(){
        this.setState({
            dataArray:this.props.dataArray
        })
    }
  render() {
    return (      
        <Content padder>
          <Accordion dataArray={dataArray} expanded={0} />
        </Content>      
    );
  }
}