import React from 'react'
import PropTypes from 'prop-types'
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
    ...region,
    ...currentRegion,
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
          liteMode={this.props.liteMode}
          toolbarEnabled={false}
        >
          {this.state.location && this.state.location.latitude ? (<MapView.Marker coordinate={this.state.location} image={this.props.pinImage}/>) : null }
        </MapView>
        <View style={styles.mapMask} />
      </View>
    )
  }
}

GeolocateInput.propTypes = {
  allowScroll: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  liteMode: PropTypes.bool,
  region: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  styles: PropTypes.object,
  onLocationSet: PropTypes.func,
}

GeolocateInput.defaultProps = {
  allowScroll: true,
}

export default GeolocateInput
