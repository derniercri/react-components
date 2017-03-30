let apiKey = ''

const callGoogleAPI = async url => {
  const response = await fetch(url).then(res => res.json())
  if (response.status === 'OK' && response.results.length) {
    return response.results[0]
  } else {
    return null
  }
}

export const setApiKey = key => {
  apiKey = key
}

export const autocomplete = async query => {
  const url = `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=${apiKey}&input=${encodeURI(query)}`
  return await fetch(url)
    .then(response => response.json())
    .catch(err => console.log(err))
}

export const geocode = async placeId => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&${placeId ? `place_id=${placeId}` : `address=${encodeURI(this.state.address)}`}`
  return await callGoogleAPI(url)
}

export const getPlaceByLocation = async location => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&latlng=${location.latitude},${location.longitude}`
  return await callGoogleAPI(url)
}

export const extractAddressParts = response => {
  const addressParts = response.address_components
  const partsLength = addressParts.length
  const address = {
    full_address: response.formatted_address,
  }

  address.zipCode = addressParts[partsLength - 1].long_name
  address.country = addressParts[partsLength - 2].long_name
  address.county = addressParts[partsLength - 3].long_name
  address.department = addressParts[partsLength - 4].long_name
  address.city = addressParts[partsLength - 5].long_name
  address.street_only = addressParts[partsLength - 6].long_name
  address.number_only = addressParts[partsLength - 7] ? addressParts[partsLength - 7].long_name : ''
  address.street = `${address.number_only ? `${address.number_only} ` : ''}${address.street_only}`

  return address
}
