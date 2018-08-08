import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import { Tile } from 'react-native-elements';

class SubMenu extends Component {
  onLearnMore = (item, picture, menuName) => {
    this.props.navigation.navigate('Options', { ...item, picture, menuName });
  };

  render() {
    const { items, title } = this.props.navigation.state.params;
    return (
      <ScrollView>
          {items.map((item) => (
            <Tile
            style={styles.red}
            key={item.name}
            imageSrc={{ uri: item.picture.large}}
            featured
            title={`${item.name}`}
            onPress={() => this.onLearnMore(item, item.picture.large, item.name)}
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

export default SubMenu;