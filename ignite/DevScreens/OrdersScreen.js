import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Images } from './DevTheme'
import styles from './Styles/ComponentExamplesScreenStyles'

function getOrders() {
  console.log(this.user)
  return []
}

function getItemStatus(value) {
  switch(value) {
    case 0: 
    return 'Received';
    case 1:
    return 'Preparing';
    case 2:
    return 'Completed';
  }
}

class OrdersScreen extends Component {
  
  render() {
    const { user } = global.loggedEmail;
    const { items, imageIcon } = this.props.navigation.state.params;

    console.log('ITEMS :' + items)
    console.log(typeof(items))

    return (
      <View style={styles.container}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{
          position: 'absolute',
          paddingTop: 30,
          paddingHorizontal: 5,
          zIndex: 10
        }}>
          <Image source={Images.backButton} />
        </TouchableOpacity>
        <ScrollView style={{marginTop: 60}}>
          {global.orders.map((items) => (
            
            <List
            key={items._id}
            title={items.status}
            >
            <Text> Order Status: {getItemStatus(items.status)}</Text>
            {items.items.map((unit) => (
              <ListItem
              key={unit.id}
              title={`${unit.name}`}
              subtitle={`Php ${unit.price}`}
              hideChevron
            />
            ))}
          </List>
          ))
          }      
        </ScrollView>
      </View>
    );
  }
}

export default OrdersScreen;