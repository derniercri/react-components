import React from 'react'
import {
  View,
  DatePickerIOS,
  Platform,
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

const formatOutputDate = rawDate => moment(rawDate).format('DD MMM YYYY, hh:mm')

const Picker = Platform.OS === 'ios' ? DatePickerIOS : DatePickerAndroid

const DateInput = ({
  selectedValue,
  androidStyles,
  mode,
  onValueChange,
  minDate,
  maxDate,
}) => (
  <View style={androidStyles.pickerHolder}>
    <Picker
      initDate={formatDateValue(selectedValue)}
      date={formatDateValue(selectedValue)}
      minimumDate={minDate}
      maximumDate={maxDate}
      mode={mode}
      androidStyles={androidStyles}
      onDateChange={date => onValueChange(formatOutputDate(date))}
    />
  </View>
)

DateInput.propTypes = {
  androidStyles: React.PropTypes.object,
  selectedValue: React.PropTypes.oneOfType([React.PropTypes.instanceOf(Date), React.PropTypes.number, React.PropTypes.string]),
  mode: React.PropTypes.string,
  minDate: React.PropTypes.instanceOf(Date),
  maxDate: React.PropTypes.instanceOf(Date),
  onValueChange: React.PropTypes.func.isRequired,
}

DateInput.defaultProps = {
  selectedValue: new Date(),
  mode: 'datetime',
  maxDate: moment().toDate(),
}

export default DateInput
