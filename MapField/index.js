import React from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import GeolocateInput from './GeolocateInput'
import defaultStyles from './styles'
import {
  autocomplete,
  extractAddressParts,
  geocode,
  getPlaceByLocation,
  setApiKey,
} from './helpers'

class MapField extends React.Component {
  constructor (props) {
    super(props)
    this.mounted = false
    this.searchTimeout = null

    const {address, coords, googlePlaceKey} = props

    setApiKey(googlePlaceKey)

    this.state = {
      address,
      coords,
      suggestions: [],
      typing: false,
    }
  }

  componentWillMount () {
    if (this.state.address) {
      this.getCoordsForAddress(this.state.address)
    }
  }

  componentDidMount () {
    this.mounted = true
  }

  componentWillUnmount () {
    this.mounted = false
  }

  async getCoordsForAddress (address) {
    this.geocode(null, address)
  }

  geocode (placeId, address) {
    geocode(placeId, address).then(response => {
      if (response) {
        const { lat, lng } = response.geometry.location
        this.setState({
          coords: {
            latitude: lat,
            longitude: lng,
          },
        }, () => {
          this.setState({
            typing: false,
          })
          this.props.onChange(extractAddressParts(response))
        })
      }
    })
  }

  setByCoords (location) {
    getPlaceByLocation(location)
      .then(response => {
        if (response && this.mounted) {
          const { geometry, formatted_address } = response
          const { lat, lng } = geometry.location
          this.setState({
            address: formatted_address,
            coords: {
              latitude: lat,
              longitude: lng,
            },
          }, () => {
            this.setState({
              typing: false,
            })
            this.props.onChange(extractAddressParts(response))
          })
        }
      })
  }

  onChangeText (text, searchAutocomplete, placeId) {
    clearTimeout(this.searchTimeout)
    if (this.mounted) {
      if (searchAutocomplete) {
        this.searchTimeout = setTimeout(async () => {
          const response = await autocomplete(text)
          if (response.status === 'OK' && response.predictions.length) {
            this.setState({
              suggestions: response.predictions.reduce((suggestions, place) => {
                suggestions.push({
                  name: place.description,
                  placeId: place.place_id,
                })
                return suggestions
              }, []),
            })
          }
        }, 200)
      } else {
        this.setState({
          suggestions: [],
        })
        this.geocode(placeId)
      }
      this.setState({
        typing: true,
        address: text,
      }, () => {
        this.props.onChange(text)
      })
    }
  }

  render () {
    const {
      customStyles,
      placeholder,
      pinImage,
    } = this.props

    const styles = {
      ...defaultStyles,
      ...customStyles,
    }

    return (
      <View>
        <View style={styles.fieldContainer}>
          <TextInput
            placeholder={placeholder}
            value={this.state.address}
            style={styles.field}
            onChangeText={text => this.onChangeText(text, true)}
            underlineColorAndroid="transparent"
          />
        </View>
        {this.state.typing ? (
          <ScrollView style={styles.mapSuggestHolder}>
            {this.state.suggestions.map(suggest => (
              <TouchableOpacity key={`suggest-${suggest.name}`} onPress={() => this.onChangeText(suggest.name, false, suggest.placeId)} style={styles.mapSuggestButton}>
                <Text style={styles.suggestText}>
                  {suggest.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.mapHolder}>
            <GeolocateInput
              allowScroll={true}
              styles={styles}
              location={this.state.coords}
              region={this.state.coords}
              mapPreviewerHeight={350}
              onLocationSet={location => this.setByCoords(location)}
              pinImage={pinImage}
            />
          </View>
        )}
      </View>
    )
  }
}

MapField.propTypes = {
  customStyles: React.PropTypes.object,
  googlePlaceKey: React.PropTypes.string.isRequired,
  field: React.PropTypes.string.isRequired,
  address: React.PropTypes.string,
  coords: React.PropTypes.object,
  onChange: React.PropTypes.func.isRequired,
  placeholder: React.PropTypes.string,
  pinImage: React.PropTypes.any,
}

MapField.defaultProps = {
  address: '',
  coords: null,
}

export default MapField
