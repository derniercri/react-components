import { 
  DateField,
  MapField,
  SuggestField,
} from 'react-components'

<DateField
  selectedValue={this.state.value || new Date()}
  onValueChange={value => this.setState({ value })}
  androidStyles={{
    pickerholder: {},
    pickerStyle: {},
    itemStyle: {},
  }}
/>