import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import { mainMenu } from '../config/data';

class AddToCart extends Component {
  searchItem = (id) => {
    console.log(id)
  };

  render() {
    const { id, name, price, picture, menuName } = this.props.navigation.state.params;


    return (
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
          <Button
          title="Add To Cart"
          buttonStyle={{ marginTop: 20 }}
          onPress={this.handleSettingsPress}
        />
      </ScrollView>
    );
  }
}

export default AddToCart;