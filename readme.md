# import
```jsx
import { 
  DateField,
  MapField,
  SuggestField,
} from 'react-components'
```

# DateField
```jsx
<DateField
  selectedValue={this.state.value || new Date()}
  onValueChange={value => this.setState({ value })}
  androidStyles={{
    pickerholder: {},
    pickerStyle: {},
    itemStyle: {},
  }}
  selectedValue
  mode="date" || "datetime"
  maxDate=""
/>
```

# MapField
googlePlaceKey
https://console.developers.google.com
 + Google Places API Web Service
 + Google Maps Geocoding API