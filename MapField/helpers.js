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
  const result = await fetch(url)
    .then(response => response.json())
    .catch(err => console.log(err))
  return result
}

export const geocode = async (placeId, address) => {
  let query = ''
  if (placeId) {
    query = `place_id=${placeId}`
  } else if (address) {
    query = `address=${encodeURI(address)}`
  }
  const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&${query}`
  const result = await callGoogleAPI(url)
  return result
}

export const getPlaceByLocation = async location => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&latlng=${location.latitude},${location.longitude}`
  const result = await callGoogleAPI(url)
  return result
}

export const extractAddressParts = response => {
  const addressParts = response.formatted_address.split(',')
  const zipCity = addressParts[1].trim().split(' ')
  const zip = zipCity.length ? zipCity[0] : ''
  const city = zipCity.slice(1).join(' ')

  const address = {
    full_address: response.formatted_address,
    street: addressParts[0] ? addressParts[0].trim() : '',
    zipCode: zip.trim(),
    city: city.trim(),
    country: addressParts[2] ? addressParts[2].trim() : '',
  }

  return address
}
