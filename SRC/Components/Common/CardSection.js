import React,{Component} from 'react';
import {View} from 'react-native';

export default class CardSection extends Component{
    render(){
        const styles={
            containerStyle:{
                borderBottomWidth: 1,
                padding:5,
                backgroundColor:'#fff',
                justifyContent:'center',
                flexDirection: 'row',
                borderColor:'#ddd',
                position:'relative',
            }
        }
        return(
            <View style={styles.containerStyle}>
            {this.props.children}
            </View>
        )
    }
}