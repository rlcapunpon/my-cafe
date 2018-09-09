import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { Tile } from 'react-native-elements';
import { Images } from './DevTheme'
import styles from './Styles/PresentationScreenStyles'

class SubMenuScreen extends React.Component {
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

  onLearnMore = (item, picture, itemName) => {
    this.props.navigation.state.activeMenuItem = "itemName";
    this.props.navigation.navigate('SubMenuOptionsScreen', {...item, picture, itemName});
  };

  render() {
    const { items, imageIcon } = this.props.navigation.state.params;
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
        <ScrollView style={{alignContent: 'center'}}>
          <View style={{flex:1, alignItems: 'center', paddingTop: 10}}>
            <Image source={imageIcon} style={this.inStyle.logo} />
          </View>
          {items.map((item) => (
            <Tile
            key={item.name}
            imageSrc={{ uri: item.picture.large}}
            featured
            title={`${item.name}`}
            caption={`${item.description}`}
            onPress={() => this.onLearnMore(item, item.picture.large, item.name)}
          />
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default SubMenuScreen;