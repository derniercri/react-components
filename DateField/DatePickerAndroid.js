import React from 'react'
import moment from 'moment'
import PickerAndroid from './PickerAndroid'

const DatePickerAndroid = ({androidStyles, date, formatDay, formatMonth, maximumDate, minimumDate, mode, locale, onDateChange}) => (
  <PickerAndroid
    androidStyles={androidStyles}
    date={moment(date)}
    formatDay={formatDay}
    formatMonth={formatMonth}
    mode={mode}
    locale={locale}
    maxDate={moment(maximumDate)}
    minDate={moment(minimumDate)}
    onDateChange={date => onDateChange(date.toDate())}
  />
)

DatePickerAndroid.propTypes = {
  androidStyles: React.PropTypes.object,
  date: React.PropTypes.instanceOf(Date),
  formatDay: React.PropTypes.func,
  formatMonth: React.PropTypes.func,
  locale: React.PropTypes.object,
  mode: React.PropTypes.string,
  minimumDate: React.PropTypes.object,
  onDateChange: React.PropTypes.func.isRequired,
}

DatePickerAndroid.defaultProps = {
  maximumDate: moment().add(50, 'years'),
  minimumDate: moment().subtract(50, 'years'),
  mode: 'date', // or "datetime"
  locale: {
    day: '',
    month: '',
    year: '',
    hour: '',
    minute: '',
  },
  date: new Date(),
}

export default DatePickerAndroid
