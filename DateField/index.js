import React from 'react'
import {
  View,
  DatePickerIOS,
  Platform
} from 'react-native'
import moment from 'moment'
import 'moment/locale/fr'

import DatePickerAndroid from './DatePickerAndroid'

moment.locale('fr')

const formatDateValue = rawDate => {
  const dateValue = typeof rawDate === 'number'
    ? parseFloat(rawDate) * 1000
    : rawDate
  return new Date(dateValue)
}

const Picker = Platform.OS === 'ios' ? DatePickerIOS : DatePickerAndroid

const DateInput = ({
  styles,
  value,
  mode,
  format,
  onChange,
  minDate,
  maxDate
}) => (
  <View>
    <Picker
      initDate={formatDateValue(value)}
      date={formatDateValue(value)}
      minimumDate={minDate}
      maximumDate={maxDate}
      mode={mode}
      onDateChange={onChange}
    />
  </View>
)

DateInput.propTypes = {
  format: React.PropTypes.string,
  styles: React.PropTypes.objectOf(React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.objectOf(React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]))
  ])),
  value: React.PropTypes.oneOfType([React.PropTypes.instanceOf(Date), React.PropTypes.number]),
  mode: React.PropTypes.string,
  minDate: React.PropTypes.instanceOf(Date),
  maxDate: React.PropTypes.instanceOf(Date),
  onChange: React.PropTypes.func.isRequired
}

DateInput.defaultProps = {
  format: 'dd. DD MMM YYYY',
  styles: {
    value: {},
    picker: {}
  },
  value: new Date(),
  mode: 'date',
  maxDate: moment().toDate()
}

export default DateInput
