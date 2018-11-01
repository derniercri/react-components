import React from 'react'
import PropTypes from 'prop-types'
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

  return dateValue ? new Date(dateValue) : new Date()
}

const Picker = Platform.OS === 'ios' ? DatePickerIOS : DatePickerAndroid

const getMonthName = monthIndex => {
  const month = [
    'janv.',
    'févr.',
    'mars.',
    'avr.',
    'mai.', 
    'juin.',
    'juil.',
    'août.',
    'sept.',
    'oct.',
    'nov.',
    'déc.',
  ]

  return month[monthIndex]
}

class DateInput extends React.Component {
  componentDidMount () {
    const {
      onValueChange,
      selectedValue,
    } = this.props

    onValueChange(formatDateValue(selectedValue))
  }

  render () {
    const {
      selectedValue,
      androidStyles,
      mode,
      onValueChange,
      minDate,
      maxDate,
    } = this.props

    return (
      <View style={androidStyles.pickerHolder}>
        <Picker
          initDate={formatDateValue(selectedValue)}
          date={formatDateValue(selectedValue)}
          minimumDate={minDate}
          maximumDate={maxDate}
          mode={mode}
          androidStyles={androidStyles}
          formatDay={i => i.length < 2 ? `0${i}` : i}
          formatMonth={(i, date) => getMonthName(i)}
          onDateChange={date => onValueChange(date)}
        />
      </View>
    )
  }
}

DateInput.propTypes = {
  androidStyles: PropTypes.object,
  selectedValue: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
  mode: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  onValueChange: PropTypes.func.isRequired,
}

DateInput.defaultProps = {
  selectedValue: new Date(),
  mode: 'datetime',
  androidStyles: {},
}

export default DateInput
