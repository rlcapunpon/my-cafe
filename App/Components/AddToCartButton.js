import React from 'react'
import { Button, Text, View, Form } from 'react-native'
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { addItem, deleteAll } from '../Redux/Actions/CartActions'

const mapDispatchToProps = dispatch => {
  return {
    addToCart: item => dispatch(addItem(item)),
    removeAll: item => dispatch(deleteAll())
  };
};

const createItem = (id, name, price, menuName) => {
  var item = {};
  item.id = id;
  item.name = name;
  item.price = price;
  item.menuName = menuName;
  return item;
};

class AddToCartButton extends React.Component {

  handleAddToCart = item => {
    this.props.addToCart(item)
  }

  render() {
  return (
    <Button 
    type="submit"
    title="Add To Cart"
    onPress={() => {
      console.log("...................ADDING TO CART....................");
      var item = createItem(this.props.id, this.props.name, this.props.price, this.props.menu);
      this.handleAddToCart(item);
      console.log("item is now added to cart")
      console.log(item.menuName + ", " + item.name + "\n...................ADDED TO CART....................");
      this.props.navigation.navigate('CartScreen');
    }}
    />
  )
}
}

export default withNavigation(connect(null, mapDispatchToProps)(AddToCartButton))