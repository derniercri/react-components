import {
  extractAddressParts,
} from '../helpers'
/*
export const extractAddressParts = response => {
  const addressParts = response.formatted_address.split(',')
  const cityZip = addressParts[1].trim().split(' ')
  const address = {
    full_address: response.formatted_address,
    street: addressParts[0] ? addressParts[0].trim() : '',
    zipCode: cityZip[0] ? cityZip[0].trim() : '',
    city: cityZip[1] ? cityZip[1].trim() : 0,
    country: addressParts[2] ? addressParts[2].trim() : 0,
  }

  return address
}
*/

const getInlineAddress = address => {
  const zipCity = [address.zip, address.city].join(' ')
  return {
    formatted_address: [address.street, zipCity, address.country].join(', '),
  }
}

describe('Helpers', () => {
  it('must correctly parse "60 Rue Wolfgang Amadeus Mozart, 59760 Grande Synthe, FRANCE"', () => {
    const address = {
      street: '60 Rue Wolfgang Amadeus Mozart',
      zip: '59760',
      city: 'Grande Synthe',
      country: 'FRANCE',
    }

    const response = getInlineAddress(address)
    const parsed = extractAddressParts(response)

    expect(parsed.street).toBe(address.street)
    expect(parsed.zipCode).toBe(address.zip)
    expect(parsed.city).toBe(address.city)
    expect(parsed.country).toBe(address.country)
  })

  it('must correctly parse "4 Bd Marie et Alexandre Oyon, 72100 Le Mans, FRANCE"', () => {
    const address = {
      street: '4 Bd Marie et Alexandre Oyon',
      zip: '72100',
      city: 'Le Mans',
      country: 'FRANCE',
    }

    const response = getInlineAddress(address)
    const parsed = extractAddressParts(response)

    expect(parsed.street).toBe(address.street)
    expect(parsed.zipCode).toBe(address.zip)
    expect(parsed.city).toBe(address.city)
    expect(parsed.country).toBe(address.country)
  })
})
