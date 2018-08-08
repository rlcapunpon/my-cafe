import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

class Options extends Component {
  onLearnMore = (option, itemName, picture, menuName) => {
    this.props.navigation.navigate('AddToCart', { ...option, itemName, picture, menuName });
  };

  render() {
    const { name, options, picture, menuName } = this.props.navigation.state.params;
    return (
      <ScrollView>
        <List>
          {options.map((option) => (
            <ListItem
            style={styles.red}
            key={option.name}
            title={`${option.name}`}
            subtitle={`Php ${option.price}`}
            onPress={() => this.onLearnMore(option, option.name, picture, menuName)}
          />
          ))}
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  white: {
    color: 'white'
  }
});

export default Options;