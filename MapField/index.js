import React from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import GeolocateInput from '../../geolocate-input'
import { fieldStyle } from '../styles'
import { autocomplete, geocode, getPlaceByLocation } from '../../../helpers/location'

class MapField extends React.Component {
  constructor (props) {
    super(props)

    this.searchTimeout = null

    const {value = {}} = props

    this.state = {
      typing: false,
      address: value.address || '',
      suggestions: [],
      coords: value.coords || null
    }
  }

  componentWillReceiveProps (props) {
    const {value = {}} = props
    this.setState({
      address: value.address || ''
    })
  }

  geocode (placeId) {
    geocode(placeId).then(response => {
      if (response) {
        const { lat, lng } = response.geometry.location
        this.setState({
          coords: {
            latitude: lat,
            longitude: lng
          }
        }, () => {
          this.setState({
            typing: false
          })
          const { address, coords } = this.state
          this.props.onChange('location', {address, coords})
        })
      }
    })
  }

  setByCoords (location) {
    getPlaceByLocation(location)
      .then(response => {
        if (response) {
          const { geometry, formatted_address } = response
          const { lat, lng } = geometry.location
          this.setState({
            address: formatted_address,
            coords: {
              latitude: lat,
              longitude: lng
            }
          }, () => {
            this.setState({
              typing: false
            })
            const { address, coords } = this.state
            this.props.onChange('location', {address, coords})
          })
        }
      })
  }

  onChangeText (text, searchAutocomplete, placeId) {
    clearTimeout(this.searchTimeout)
    if (searchAutocomplete) {
      this.searchTimeout = setTimeout(async () => {
        const response = await autocomplete(text)
        if (response.status === 'OK' && response.predictions.length) {
          this.setState({
            suggestions: response.predictions.reduce((suggestions, place) => {
              suggestions.push({
                name: place.description,
                placeId: place.place_id
              })
              return suggestions
            }, [])
          })
        }
      }, 200)
    } else {
      this.setState({
        suggestions: []
      })
      this.geocode(placeId)
    }
    this.setState({
      typing: true,
      address: text
    })
  }

  render () {
    return (
      <View style={this.props.lightDisplay ? fieldStyle.lightDisplay : fieldStyle.mapPage}>
        <View style={[fieldStyle.fieldContainer]}>
          <TextInput
            placeholder={this.props.placeholder}
            value={this.state.address}
            style={[fieldStyle.field]}
            onChangeText={text => this.onChangeText(text, true)}
            underlineColorAndroid="transparent"
          />
        </View>
        {this.state.typing || this.props.lightDisplay ? (
          <ScrollView style={this.props.lightDisplay ? fieldStyle.mapSuggestHolderLight : fieldStyle.mapSuggestHolder}>
            {this.state.suggestions.map((suggest, key) => (
              <TouchableOpacity key={`suggest-${suggest.name}`} onPress={() => this.onChangeText(suggest.name, false, suggest.placeId)} style={{flex: 1}}>
                <Text style={fieldStyle.suggestText}>
                    {suggest.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={fieldStyle.mapHolder}>
            <GeolocateInput
              allowScroll={true}
              styles={{container: StyleSheet.flatten(fieldStyle.mapContainer)}}
              location={this.state.coords}
              region={this.state.coords}
              mapPreviewerHeight={350}
              onLocationSet={location => this.setByCoords(location)}
            />
          </View>
        )}
      </View>
    )
  }
}

MapField.propTypes = {
  lightDisplay: React.PropTypes.bool,
  value: React.PropTypes.object,
  onChange: React.PropTypes.func,
  placeholder: React.PropTypes.string
}

export default MapField
