import React from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, ImageBackground } from 'react-native'
import { Images } from './DevTheme'
import ButtonBox from './ButtonBox'
import { StackNavigator } from 'react-navigation'
import { Constants, WebBrowser } from 'expo';

// Screens
import APITestingScreen from './APITestingScreen'
import ComponentExamplesScreen from './ComponentExamplesScreen'
import PluginExamplesScreen from './PluginExamplesScreen'
import ThemeScreen from './ThemeScreen'
import FaqScreen from './FaqScreen'
import SubMenuScreen from './SubMenuScreen'
import SubMenuOptionsScreen from './SubMenuOptionsScreen'
import AddToCartScreen from './AddToCartScreen'
import CartScreen from './CartScreen'
import OrdersScreen from './OrdersScreen'
import PaymentDetailsScreen from './PaymentDetailsScreen'

// Styles
import styles from './Styles/PresentationScreenStyles'

// Data
import { coldDrinks, sweetDesserts, specialMenu, hotBeverages, server_url, customer_email } from '../../data'
var items = {}
class PresentationScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
       email: this.props.email
    }
  }
  componentDidMount(){
    this.setState({
        email: this.props.email
    });
}

  getItemsFromApi(category) {
    console.log('loading from api: ' + category)
    
    return fetch(server_url + category)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
  }

  openComponents = () => {
    // this.props.navigation.navigate('ComponentExamplesScreen')
  }

  openUsage = () => {
    // this.props.navigation.navigate('PluginExamplesScreen')
  }

  openApi = () => {
    fetch(server_url + 'desserts')
    .then((response) => response.json())
    .then((responseJson) => {
    sweetDesserts.items = responseJson;
    items = sweetDesserts;
    imageIcon = Images.api;
    this.props.navigation.navigate('SubMenuScreen', { ...items, imageIcon })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  openSpecialMenu = () => {
    fetch(server_url + 'special')
    .then((response) => response.json())
    .then((responseJson) => {
    specialMenu.items = responseJson;
    items = specialMenu;
    console.log('SPECIAL MENU: ' + JSON.stringify(specialMenu));
    imageIcon = Images.specialMenu;
    this.props.navigation.navigate('SubMenuScreen', { ...items, imageIcon })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  openTheme = () => {
    fetch(server_url + 'colddrinks')
    .then((response) => response.json())
    .then((responseJson) => {
    coldDrinks.items = responseJson;
    items = coldDrinks;
    imageIcon = Images.theme;
    this.props.navigation.navigate('SubMenuScreen', { ...items, imageIcon })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  openFaq = () => {
    // this.props.navigation.navigate('FaqScreen')
  }

  openCart = () => {
    this.props.navigation.navigate('CartScreen')
  }

  openOrders = () => {

    var data = {};
    data.email = global.loggedEmail;

    console.log('EMAIL ACTIVE: ' + global.loggedEmail);

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }

    fetch(server_url + 'orders/user/' + data.email)
    .then((response) => response.json())
    .then((responseJson) => {
    items = responseJson;
    global.orders = responseJson
    console.log("ITEMS: " + JSON.stringify(items))
    console.log(typeof(items))
    
    imageIcon = Images.coffeeIcon;
    this.props.navigation.navigate('OrdersScreen', { ...items, imageIcon })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  openBeveragesSubMenu = () => {
    fetch(server_url + 'hotbeverage')
    .then((response) => response.json())
    .then((responseJson) => {
    hotBeverages.items = responseJson;
    items = hotBeverages;
    imageIcon = Images.coffeeIcon;
    this.props.navigation.navigate('SubMenuScreen', { ...items, imageIcon })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  openSweetsSubMenu = () => {
    fetch(server_url + 'desserts')
    .then((response) => response.json())
    .then((responseJson) => {
    sweetDesserts.items = responseJson;
    items = sweetDesserts;
    imageIcon = Images.api;
    this.props.navigation.navigate('SubMenuScreen', { ...items, imageIcon })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render () {
    var subMenuItens = [];
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <TouchableOpacity onPress={this.props.screenProps.toggle} style={{
          position: 'absolute',
          paddingTop: 30,
          paddingHorizontal: 10,
          zIndex: 10
        }}>
          <Image source={Images.closeButton} />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.igniteClear} style={styles.logo} />
          </View>

          <Text style={styles.sectionText}>
            Indulge yourselves in our world class and mouthwatering delicacies.
          </Text>
          <View>
            <ImageBackground  style={styles.buttonsContainer} source={Images.specialMenuBg}>
              <ButtonBox onPress={this.openSpecialMenu} data={specialMenu} style={styles.componentButton} image={Images.components} text='Special Menu' />
            </ImageBackground>
          </View>
          <View style={styles.buttonsContainer}>
            <ImageBackground  style={styles.buttonsContainer} source={Images.hotBeveragesBg}>
              <ButtonBox onPress={this.openBeveragesSubMenu} data={hotBeverages} style={styles.componentButton} image={Images.coffeeIcon} text='Hot Beverages' />
          </ImageBackground>
          </View>
          <View style={styles.buttonsContainer}>
            <ImageBackground style={styles.buttonsContainer} source={Images.sweetDessertsBg}>
              <ButtonBox onPress={this.openApi} style={styles.componentButton} image={Images.api} text='Sweet Desserts' />
            </ImageBackground>
            <ImageBackground style={styles.buttonsContainer} source={Images.coldDrinksBg}>
              <ButtonBox onPress={this.openTheme} style={styles.componentButton} image={Images.theme} text='Cold Beverages' />
            </ImageBackground>
          </View>
          <View style={styles.buttonsContainer}>
            <ImageBackground style={styles.buttonsContainer} source={Images.plainBlack}>
              <ButtonBox style={styles.deviceButton} image={Images.deviceInfo} text="Let's Talk" onPress={() => WebBrowser.openBrowserAsync("https://www.facebook.com/NetzCoffee/")}/>
            </ImageBackground>
            <ImageBackground style={styles.buttonsContainer} source={Images.plainBlack}>
              <ButtonBox style={styles.componentButton} image={Images.faq} text='Find Us' onPress={() => WebBrowser.openBrowserAsync("http://netzglasstower.com/")}/>
            </ImageBackground>
          </View>
          <View style={styles.buttonsContainer}>
            <ImageBackground  style={styles.buttonsContainer} source={Images.hotBeveragesBg}>
              <ButtonBox onPress={this.openOrders} data={items} style={styles.componentButton} image={Images.coffeeIcon} text='My Orders' />
          </ImageBackground>
          </View>
        </ScrollView>
        <View style={styles.banner}>
          <Text style={styles.bannerLabel}>Made with ❤️ by Ahmet, Mitch, and Liowkee</Text>
        </View>
      </View>
    )
  }
}

export default StackNavigator({
  PresentationScreen: {screen: PresentationScreen},
  APITestingScreen: {screen: APITestingScreen},
  ComponentExamplesScreen: {screen: ComponentExamplesScreen},
  SubMenuScreen: {screen: SubMenuScreen},
  SubMenuOptionsScreen: {screen: SubMenuOptionsScreen},
  AddToCartScreen: {screen: AddToCartScreen},
  PluginExamplesScreen: {screen: PluginExamplesScreen},
  ThemeScreen: {screen: ThemeScreen},
  FaqScreen: {screen: FaqScreen},
  CartScreen: { screen: CartScreen },
  PaymentDetailsScreen: { screen: PaymentDetailsScreen },
  OrdersScreen: { screen: OrdersScreen }
}, {
  cardStyle: {
    opacity: 1
  },
  initialRouteName: 'PresentationScreen',
  headerMode: 'none',
  // Keeping this here for future when we can make
  navigationOptions: {
    header: {
      left: (
        <TouchableOpacity onPress={() => window.alert('pop')} ><Image source={Images.closeButton} style={{marginHorizontal: 10}} /></TouchableOpacity>
      ),
      style: {
      }
    }
  }
})
