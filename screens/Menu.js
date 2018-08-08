import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import { Tile } from 'react-native-elements';
import { mainMenu } from '../config/data';

class Menu extends Component {
  onLearnMore = (menu) => {
    this.props.navigation.navigate('SubMenu', { ...menu });
  };

  render() {
    return (
      <ScrollView>
          {mainMenu.map((menu) => (
            <Tile
            style={styles.red}
            key={menu.title}
            imageSrc={{ uri: menu.picture.large}}
            featured
            title={`${menu.title}`}
            onPress={() => this.onLearnMore(menu)}
          />
          ))}
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

export default Menu;