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

class SubMenuOptionsScreen extends Component {
  onLearnMore = (option, itemName, picture, menuName) => {
    this.props.navigation.navigate('AddToCartScreen', { ...option, itemName, picture, menuName });
  };

  render() {
    const { name, options, picture, itemName } = this.props.navigation.state.params;
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
          <List>
            {options.map((option) => (
              <ListItem
              key={option.name}
              title={`${option.name}`}
              subtitle={`Php ${option.price}`}
              hideChevron
              onPress={() => this.onLearnMore(option, option.name, picture, itemName)}
            />
            ))}
          </List>
        </ScrollView>
      </View>
    );
  }
}

export default SubMenuOptionsScreen;