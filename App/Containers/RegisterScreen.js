import React, { Component } from 'react'
import { ScrollView, Text, Image, View, 
  TextInput, Button, Alert } from 'react-native'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'
import { server_url } from '../../data.js'

function handleResponse (response) {
  return response.text().then(text => {
    const data = text
    if (!response.ok) {
      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }
    return data
  })
}

export default class RegisterScreen extends Component {
  
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
            placeholder='Full Name'
            onChangeText={val => this.onChangeText('customerName', val)}
          />
          <TextInput
            placeholder='Address'
            onChangeText={val => this.onChangeText('customerAddress', val)}
          />
          <TextInput
            placeholder='Contact No.'
            onChangeText={val => this.onChangeText('customerContact', val)}
          />
          <TextInput
            placeholder='Email'
            onChangeText={val => this.onChangeText('customerEmail', val)}
          />
          <TextInput
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={val => this.onChangeText('customerPassword', val)}
          />
          <TextInput
            placeholder='Re-type Password'
            secureTextEntry={true}
            onChangeText={val => this.onChangeText('customerRetypePassword', val)}
          />
          <Button 
            type="continue"
            title="Register"
            onPress={() => {
              if(this.state.customerName != '' && this.state.customerContact != '' && this.state.customerEmail != '' 
                && this.state.customerPassword === this.state.customerRetypePassword) {

                  var data = {};
                  data.name = this.state.customerName
                  data.contact = this.state.customerContact
                  data.email = this.state.customerEmail
                  data.password = this.state.customerPassword
                  data.address = this.state.customerAddress

                  const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                  }

                  console.log('REGISTER DATA: ' + JSON.stringify(data))
                  
                  fetch(server_url + `login/register`, requestOptions)
                  .then(handleResponse).then(data => this.props.navigation.navigate('LoginScreen'))
                  .catch((error) => {
                    console.error(error);
                    Alert.alert(
                      'Error',
                      'Unable to register.')
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
            title="Already have an Account? Click Here."
            onPress={() => {
                this.props.navigation.navigate('LoginScreen');
            }}
          /> 
        </ScrollView>
      </View>
    )
  }
}
