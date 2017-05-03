import React from 'react'
import { View } from 'react-native'
import MapView from 'react-native-maps'

import defaultStyles from './styles'

const getRegion = (region = {}, currentRegion = {}) => {
  const defaultRegion = {
    latitude: 46.8104242,
    longitude: 1.5360035,
    latitudeDelta: 10,
    longitudeDelta: 10,
  }
  return {
    ...defaultRegion,
    ...currentRegion,
    ...region,
  }
}

class GeolocateInput extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      displayMap: false,
      location: getRegion(props.location),
    }
  }

  componentWillMount () {
    this.checkRegion(this.props)
  }

  componentWillReceiveProps (props) {
    this.setState({
      location: getRegion(props.location),
    })

    this.checkRegion(props)
  }

  checkRegion (props) {
    if (!props.region || !props.region.latitude) {
      navigator.geolocation.getCurrentPosition(position => {
        if (!position.coords) {
          return false
        }

        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }
        this.setState({
          region: getRegion(region),
        })
      }, () => {}, {
        enableHighAccuracy: false,
      })
    } else {
      this.setState({
        region: getRegion(props.region, {
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }),
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
    return this.state.location ? getRegion(this.state.location, this.state.region) : getRegion(this.state.region)
  }

  render () {
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
          {this.state.location && this.state.location.latitude ? (<MapView.Marker coordinate={this.state.location} image={this.props.pinImage}/>) : null }
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
