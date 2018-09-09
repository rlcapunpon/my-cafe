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
import { connect } from 'react-redux';
import { getAll } from '../../App/Redux/Actions/CartActions'
import email from 'react-native-email'

const mapDispatchToProps = dispatch => {
  return {
    getItems: () => dispatch(getAll())
  };
};

const mapStateToProps = (state) => ({
  items: state.cart
});

class CartScreen extends React.Component {
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
      <List>
            {this.props.items.map((item) => (
              <ListItem
              key={item.id}
              title={` ${item.menuName} ${item.name}`}
              subtitle={`Php ${item.price}`}
              hideChevron
              onPress={() => {}}
            />
            ))}
          </List>
      <Button 
      type="continue"
      title="Continue Ordering"
      onPress={() => {
        console.log("...................CONTINUE ORDERING....................");
        this.props.navigation.navigate('PresentationScreen');
      }}
      />
      <Button 
      type="submit"
      title="Proceed to Checkout Now"
      onPress={() => {
        console.log("...................CHECKING OUT NOW....................");
        this.handleEmail();
        this.props.navigation.navigate('PaymentDetailsScreen');
      }}
      />
      </ScrollView>
      </View>
    );
  }

  handleEmail = () => {
    var orders = 'Orders: ';

    for (i = 0; i < this.props.items.length; i++) { 
      orders += this.props.items[i].menuName + " : " + this.props.items[i].name + "/ ";
    }
    
    const to = ['mycafe@bar.com'] // string or array of email addresses
    email(to, {
        // Optional additional arguments
        cc: [''], // string or array of email addresses
        bcc: '', // string or array of email addresses
        subject: 'My Cafe Orders',
        body: '<Please Enter your name and contact number here> ' + orders
    }).catch(console.error)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);