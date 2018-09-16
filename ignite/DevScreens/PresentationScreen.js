import React from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, ImageBackground } from 'react-native'
import { Images } from './DevTheme'
import ButtonBox from './ButtonBox'
import { StackNavigator } from 'react-navigation'
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
import PaymentDetailsScreen from './PaymentDetailsScreen'

// Styles
import styles from './Styles/PresentationScreenStyles'

// Data
import { coldDrinks, sweetDesserts, specialMenu, hotBeverages } from '../../data'

class PresentationScreen extends React.Component {

  handleClick = (link) => {
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log("Unable to open link: " + link);
      }
    });
  }

  openComponents = () => {
    // this.props.navigation.navigate('ComponentExamplesScreen')
  }

  openUsage = () => {
    // this.props.navigation.navigate('PluginExamplesScreen')
  }

  openApi = () => {
    items = sweetDesserts;
    imageIcon = Images.api;
    this.props.navigation.navigate('SubMenuScreen', { ...items, imageIcon })
  }

  openSpecialMenu = () => {
    items = specialMenu;
    imageIcon = Images.specialMenu;
    this.props.navigation.navigate('SubMenuScreen', { ...items, imageIcon })
  }

  openTheme = () => {
    items = coldDrinks;
    imageIcon = Images.theme;
    this.props.navigation.navigate('SubMenuScreen', { ...items, imageIcon })
  }

  openFaq = () => {
    // this.props.navigation.navigate('FaqScreen')
  }

  openCart = () => {
    this.props.navigation.navigate('CartScreen')
  }

  openBeveragesSubMenu = () => {
    items = hotBeverages;
    imageIcon = Images.coffeeIcon;
    this.props.navigation.navigate('SubMenuScreen', { ...items, imageIcon })
  }

  openSweetsSubMenu = () => {
    items = sweetDesserts
    imageIcon = Images.components;
    this.props.navigation.navigate('SubMenuScreen', { ...items, imageIcon })
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
            <ImageBackground  style={styles.buttonsContainer} source={Images.hotBeveragesBg}>
              <ButtonBox onPress={this.openBeveragesSubMenu} data={hotBeverages} style={styles.componentButton} image={Images.coffeeIcon} text='Hot Beverages' />
          </ImageBackground>
          </View>
          <View>
            <ImageBackground  style={styles.buttonsContainer} source={Images.specialMenuBg}>
              <ButtonBox onPress={this.openSpecialMenu} data={spec} style={styles.componentButton} image={Images.components} text='Special Menu' />
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
              <ButtonBox style={styles.deviceButton} image={Images.deviceInfo} text="Let's Talk" onPress={this.handleLinkUrl("https://www.facebook.com/NetzCoffee/")}/>
            </ImageBackground>
            <ImageBackground style={styles.buttonsContainer} source={Images.plainBlack}>
              <ButtonBox style={styles.componentButton} image={Images.faq} text='Find Us' onPress={this.handleLinkUrl("http://netzglasstower.com/")}/>
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
  PaymentDetailsScreen: { screen: PaymentDetailsScreen }
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
