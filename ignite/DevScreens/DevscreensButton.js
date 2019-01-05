import React from 'react'
import { View, Modal } from 'react-native'
import DebugConfig from '../../App/Config/DebugConfig'
import RoundedButton from '../../App/Components/RoundedButton'
import PresentationScreen from './PresentationScreen'

export default class DevscreensButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      email:this.props.email
    }
  }
  componentDidMount(){
    global.loggedEmail = this.props.email
    this.setState({
        showModal: false,
        email:this.props.email
    });
}

  toggleModal = () => {
    console.log('TOGGLE user: ' + this.state.email);
    this.setState({ showModal: !this.state.showModal })
  }

  render () {
    if (DebugConfig.showDevScreens) {
      return (
        <View>
          <RoundedButton onPress={this.toggleModal}>
            Checkout our Menu
          </RoundedButton>
          <Modal
            visible={this.state.showModal}
            onRequestClose={this.toggleModal}>
            <PresentationScreen screenProps={{ toggle: this.toggleModal }} email={this.props.email} />
          </Modal>
        </View>
      )
    } else {
      return <View />
    }
  }
}
