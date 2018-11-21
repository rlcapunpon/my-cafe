import React, { Component } from 'react';
import { ScrollView, Image, TouchableOpacity, View } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { Images } from './DevTheme'
import styles from './Styles/ComponentExamplesScreenStyles'
import AddToCartButton from '../../App/Components/AddToCartButton'

class AddToCartScreen extends Component {
  createItem = (id, name, price, menuName) => {
    var item = {};
    item.id = id;
    item.name = name;
    item.price = price;
    item.menuName = menuName;

    return item;
  };

  render() {
    const { name, price, picture, menuName } = this.props.navigation.state.params;
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
        <ScrollView>        
            <Tile
              imageSrc={{ uri: picture}}
              featured
              />
            <List>
              <ListItem
                title="Item Name"
                rightTitle={menuName}
                hideChevron
              />
              <ListItem
                title=""
                rightTitle={name}
                hideChevron
              />
              <ListItem
                title="PHP"
                rightTitle={price.toString()}
                hideChevron
              />
            </List>
            <AddToCartButton id={(new Date()).toLocaleTimeString()} name={name} price={price} menu={menuName} onPress={this.navigateToMenuScreen}/>
        </ScrollView>
      </View>
    );
  }
}

export default AddToCartScreen;