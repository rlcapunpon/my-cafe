import React, { Component } from 'react'
import { ScrollView, Text, Image, View, 
  TextInput, Button, Alert } from 'react-native'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'

import { Images } from '../Themes'
import { server_url, customer_email } from '../../data.js';
// Styles
import styles from './Styles/LaunchScreenStyles'
function handleResponse (response) {
  return response.text().then(text => {
    const data = text
    if (!response.ok) {
      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }
    return Promise.resolve(data)
  })
}

export default class LoginScreen extends Component {
  
  state = { customerName: '', customerAddress: '', customerContact: '', customerEmail: '', customerPassword: '', customerRetypePassword: '' }

  onChangeText = (key, val) => {
    this.setState({ [key]: val})
  }
  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>
          <TextInput
            placeholder='Email'
            onChangeText={val => this.onChangeText('customerEmail', val)}
          />
          <TextInput
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={val => this.onChangeText('customerPassword', val)}
          />
          <Button 
            type="continue"
            title="Login"
            onPress={() => {
              if(this.state.customerEmail != '' && this.state.customerPassword != '') {
                var data = {};
                  data.email = this.state.customerEmail
                  data.password = this.state.customerPassword

                  const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                  }

                  console.log('REGISTER DATA: ' + JSON.stringify(data))
                  
                  fetch(server_url + `login/authenticate`, requestOptions)
                  .then((response) => response.json())
                  .then((responseJson) => {
                      if(responseJson.token != null) {
                        this.props.navigation.state.useremail = data.email
                        var email = data.email
                        console.log('PROPS USER: ' + this.props.navigation.state.useremail)
                        this.props.navigation.navigate('LaunchScreen', {
                          email
                        }) 
                      } else {
                        Alert.alert(
                          'Error',
                          'Incorrect email and/or password.')
                      }// your JSON response is here
                  })
                  // .then(handleResponse).success(data => {
                  //   this.props.navigation.state.user = data
                  //   this.props.navigation.navigate('LaunchScreen')   
                  // }
                  // )
                  .catch((error) => {
                    Alert.alert(
                      'Error',
                      'Unable to login. Check email and password.')
                  });
              } else {
                Alert.alert(
                  'Warning',
                  'Please enter all information required.')
              }
            }}
          />
          <Button 
            type="continue"
            title="Don't have an Account yet? Click Here."
            onPress={() => {
                this.props.navigation.navigate('RegisterScreen');
            }}
          /> 
        </ScrollView>
      </View>
    )
  }
}
