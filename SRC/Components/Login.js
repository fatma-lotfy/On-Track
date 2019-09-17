import React, { Component } from 'react';
import {StyleSheet,Text,View,TextInput, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import axios from 'axios';
import Loading from './Common/Loading';
import Ip from './IP';

export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            projects:[],
            user:{},
            error:'',
            loading:false
        }
    }
    componentWillMount(){
      this.setState({
        email:'',
        password:'',
        projects:[],
        user:'',
        error:'',
        loading: false
      })
    }
    navigateToProjectsHome=(projects)=>{
        this.props.navigation.navigate("projectsPage", {projects:projects, user:this.state.user});
    }
    getUserData=()=>{
      if(this.state.email && this.state.password == "P@ssw0rd"){
        this.setState({
          loading: true
        });
        axios
          .get(Ip+"/OnTrack/api/user/login?email="+this.state.email)
          .then(response => {
            this.setState({
              loading: false,
              projects: response.data.projects,
              user: response.data.user
            });
            this.navigateToProjectsHome(this.state.projects);
          })
          .catch(err =>
            this.setState({
              error: err.toString(),
              loading: false
            })
          );
      }
      else{
        this.setState({
          error:"Password or Email can not be left empty !!!"
        })
      }
    }
    render(){
        return (
                <View style={styles.container}>
                    
                    <Image resizeMethod="auto" resizeMode="cover" style={styles.bgImage} source={require("../Images/OntrackLogIn.png")}/>
                    
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                        placeholder="Email"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(email) => this.setState({email:email, error:''})}/>
                        <Image style={styles.inputIcon} source={require("../Images/email2.png")}/>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Password"
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            onChangeText={(password) => this.setState({password:password, error:''})}/>
                        <Image style={styles.inputIcon} source={require("../Images/password2.png")}/>
                    </View>

                    <TouchableOpacity style={styles.btnForgotPassword}>
                        <Text style={styles.btnText}>Forgot your password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.getUserData}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.errorStyle}>{this.state.error}</Text>

                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.btnText}>Register</Text>
                    </TouchableOpacity>

                </View>
        );
    }
}
const resizeMode = 'center';
const styles = StyleSheet.create({
  errorStyle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF0000",
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#DCDCDC"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: "transparent"
  },
  btnForgotPassword: {
    height: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 10,
    width: 300,
    backgroundColor: "transparent"
  },
  loginButton: {
    backgroundColor: "#00b5ec",
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19
  },
  loginText: {
    color: "white"
  },
  bgImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  btnText: {
    color: "white",
    fontWeight: "bold"
  }
});