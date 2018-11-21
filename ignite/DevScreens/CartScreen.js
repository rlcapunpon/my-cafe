import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  TextInput
} from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import { Images } from './DevTheme'
import styles from './Styles/PresentationScreenStyles'
import { connect } from 'react-redux';
import { getAll } from '../../App/Redux/Actions/CartActions'
import email from 'react-native-email'
import { server_url } from '../../data';

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

  state = { customerName: '', customerAddress: '', customerContact: '' }

  onChangeText = (key, val) => {
    this.setState({ [key]: val})
  }

  render() {
    return (
      <View style={styles.container}>
      <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
      <View style={styles.centered}>
            <Image source={Images.igniteClear} style={styles.logo} />
      </View>
      <ScrollView style={{alignContent: 'center'}}>
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
        this.submitOrder();
        this.props.navigation.navigate('PaymentDetailsScreen');
      }}
      />
      </ScrollView>
      </View>
    );
  }

  submitOrder = () => {
    var orders = {};
    orders.customer = {};
    orders.customer.name = this.state.customerName;
    orders.customer.address = this.state.customerAddress;
    orders.customer.contact = this.state.customerContact;
    orders.items = [];
    orders.totalAmount = 0;
    orders.relativeCategory = "orders";

    this.props.items.map((item) => {
      orders.items.push(item);
      orders.totalAmount += parseInt(item.price);
    });

    console.log(JSON.stringify(orders));
    
    // const to = ['mycafe@bar.com'] // string or array of email addresses
    // email(to, {
    //     // Optional additional arguments
    //     cc: [''], // string or array of email addresses
    //     bcc: '', // string or array of email addresses
    //     subject: 'My Cafe Orders',
    //     body: '<Please Enter your name and contact number here> ' + orders
    // }).catch(console.error)

    fetch( server_url + 'orders/add/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orders),
    });

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);