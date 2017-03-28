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
