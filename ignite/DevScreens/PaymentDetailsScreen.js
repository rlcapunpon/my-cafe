import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button
} from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import { Images } from './DevTheme'
import styles from './Styles/PresentationScreenStyles'

class PaymentDetailsScreen extends React.Component {
  inStyle = StyleSheet.create({
    logo: {
      width: 30,
      height: 30,
      margin: 30
    },
    titleText: {
      fontSize: 16,
      alignItems: 'center',
      color: 'white',
      margin: 10
    }
  
  });

  render() {
    return (
      <View style={styles.container}>
      <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
      <View style={styles.centered}>
            <Image source={Images.igniteClear} style={styles.logo} />
      </View>
      <ScrollView style={{alignContent: 'center'}}>
      <Text style={styles.buttonText}>
        To complete your order, please wait for our customer representative to call you.
      </Text>
      <Button 
      type="backToMain"
      title="Back To Main Menu"
      onPress={() => {
        console.log("...................CONTINUE ORDERING....................");
        this.props.navigation.navigate('PresentationScreen');
      }} />
      </ScrollView>
      </View>
    );
  }
}

export default PaymentDetailsScreen;