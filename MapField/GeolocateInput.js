import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import MapView from 'react-native-maps'

import defaultStyles from './styles'

const getRegion = region => {
  return region ? {
    ...region,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  } : null
}

class GeolocateInput extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      displayMap: false,
      location: props.location,
    }
  }

  componentWillMount () {
    this.checkRegion(this.props)
  }

  componentWillReceiveProps (props) {
    this.setState({
      location: props.location,
    })

    this.checkRegion(props)
  }

  checkRegion (props) {
    if (!props.region.latitude) {
      navigator.geolocation.getCurrentPosition(position => {
        if (!position.coords) {
          return false
        }

        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
        this.setState({
          region: getRegion(region),
        })
      })
    } else {
      this.setState({
        region: getRegion(props.region),
      })
    }
  }

  locationSet (e) {
    let location
    try {
      location = e.nativeEvent.coordinate
    } catch (e) {
      console.log(e)
    }

    this.setState({
      location,
      displayMap: false,
    })
    this.props.onLocationSet(location)
  }

  getMapRegion () {
    return this.state.location ? { ...this.state.region, ...this.state.location } : this.state.region
  }

  render () {
    if (!this.state.region) {
      return (
        <Text>chargement ...</Text>
      )
    }

    const styles = {
      ...defaultStyles,
      ...this.props.styles,
    }

    return (
      <View style={styles.mapContainer}>
        <MapView
          legalLabelInsets={{left: -1000}}
          scrollEnabled={this.props.allowScroll}
          style={styles.map}
          onPress={e => this.props.onLocationSet ? this.locationSet(e) : null}
          region={this.getMapRegion()}
        >
          {this.state.location.latitude ? (<MapView.Marker coordinate={this.state.location} />) : null }
        </MapView>
        <View style={styles.mapMask} />
      </View>
    )
  }
}

GeolocateInput.propTypes = {
  allowScroll: React.PropTypes.bool,
  value: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  region: React.PropTypes.shape({
    latitude: React.PropTypes.number,
    longitude: React.PropTypes.number,
  }),
  styles: React.PropTypes.object,
  onLocationSet: React.PropTypes.func,
}

GeolocateInput.defaultProps = {
  allowScroll: true,
}

export default GeolocateInput
