import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Menu from '../screens/Menu';
import Settings from '../screens/Settings';
import UserDetail from '../screens/UserDetail';
import MyOrders from '../screens/MyOrders';
import SubMenu from '../screens/SubMenu';
import Options from '../screens/Options';
import AddToCart from '../screens/AddToCart';

export const MenuStack = createStackNavigator({
  Menu: {
    screen: Menu,
    navigationOptions: {
      title: 'Menu',
    },
  },
  SubMenu: {
    screen: SubMenu,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.title.toUpperCase()}`,
    }),
  },
  Options: {
    screen: Options,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name.toUpperCase()}`,
    }),
  },
  AddToCart: {
    screen: AddToCart,
    navigationOptions: ({ navigation }) => ({
      title: `Add To Cart`,
    }),
  },
});

export const Tabs = createBottomTabNavigator({
  Menu: {
    screen: MenuStack,
    navigationOptions: {
      tabBarLabel: 'Menu',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  MyOrders: {
    screen: MyOrders,
    navigationOptions: {
      tabBarLabel: 'My Orders',
      tabBarIcon: ({ tintColor }) => <Icon name="shopping-cart" size={35} color={tintColor} />
    },
  },
  SignOut: {
    screen: MyOrders,
    navigationOptions: {
      tabBarLabel: 'Sign In',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  }
});

export const SettingsStack = createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
    },
  },
});

export const Root = createStackNavigator({
  Tabs: {
    screen: Tabs,
  },
  Settings: {
    screen: SettingsStack,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});