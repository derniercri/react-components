import React from 'react'
import { View } from 'react-native'
import Picker from './PickerAndroid'
import moment from 'moment'

import defaultStyles from './styles'
const PickerItem = Picker.Item
const monthLabel = [
  'janv',
  'févr',
  'mars',
  'avr',
  'mai',
  'juin',
  'juill',
  'août',
  'sept',
  'oct',
  'nov',
  'déc',
]

const getYearsDifference = date => {
  const now = moment()
  const diff = moment.duration(now.diff(date))

  return diff.asYears()
}

const getYears = (count = 50) => {
  const currentYear = parseInt(moment().format('YYYY'))
  let firstYear = currentYear - count
  const years = []

  for (i = currentYear; i >= firstYear ; i-- ) {
    years.push(`${i}`)
  }

  return years
}

const getDays = (year, month) => {
  const dayCount = new Date(year, month + 1, 0).getDate()
  const day = []

  for (var i = 1; i <= dayCount; i++) {
    day.push(i)
  }

  return day
}

const getHour = () => {
  const hour = []

  for (var i = 1; i <= 24; i++) {
    hour.push(i)
  }

  return hour
}

const getMinute = () => {
  const minute = []

  for (var i = 1; i <= 60; i++) {
    minute.push(i)
  }

  return minute
}

const getFieldValues = date => {
  const currentDate = moment(date)

  return {
    day: parseInt(currentDate.format('DD')),
    month: parseInt(currentDate.format('MM')) - 1,
    year: parseInt(currentDate.format('YYYY')),
    hour: parseInt(currentDate.format('hh')),
    minute: parseInt(currentDate.format('mm')),
  }
}

const updateState = (key, choice, date, cb) => {
  const values = {
    ...getFieldValues(date),
    [key]: choice,
  }

  const {
    day,
    month,
    year,
    hour,
    minute,
  } = values
  const newDate = new Date(year, month, day, hour, minute)

  cb(newDate)
}

const DatePickerAndroid = ({androidStyles, date, mode, onDateChange, minimumDate}) => {
  const styles = {
    ...defaultStyles,
    ...androidStyles,
  }
  const {
    day,
    month,
    year,
    hour,
    minute,
  } = getFieldValues(date)

  const yearDifference = getYearsDifference(minimumDate)

  const yearList = getYears(yearDifference)
  const dayList = getDays(year, month)
  const hourList = getHour()
  const minuteList = getMinute()

  return (
    <View style={styles.pickerholder}>
      <Picker
        key="day"
        itemStyle={styles.itemStyle}
        pickerStyle={styles.pickerStyle}
        selectedValue={day}
        onValueChange={choice => updateState('day', choice, date, onDateChange)}
      >
        {dayList.map((dayItem, i) => (
          <PickerItem
            key={i}
            value={dayItem}
            label={dayItem}
          />
        ))}
      </Picker>
      <Picker
        key="month"
        itemStyle={styles.itemStyle}
        pickerStyle={styles.pickerStyle}
        selectedValue={month}
        onValueChange={choice => updateState('month', choice, date, onDateChange)}
      >
        {monthLabel.map((monthItem, i) => (
          <PickerItem
            key={i}
            value={i}
            label={monthItem}
          />
        ))}
      </Picker>
      <Picker
        key="year"
        itemStyle={styles.itemStyle}
        pickerStyle={styles.pickerStyle}
        selectedValue={`${year}`}
        onValueChange={choice => updateState('year', choice, date, onDateChange)}
      >
        {yearList.map((yearItem, i) => (
          <PickerItem
            key={i}
            value={yearItem}
            label={yearItem}
          />
        ))}
      </Picker>
      {mode === 'datetime' && (
        <Picker
          key="hour"
          itemStyle={styles.itemStyle}
          pickerStyle={styles.pickerStyle}
          selectedValue={hourList.indexOf(hour)}
          onValueChange={choice => updateState('hour', choice, date, onDateChange)}
        >
          {hourList.map((hourItem, i) => (
            <PickerItem
              key={i}
              value={hourItem}
              label={hourItem}
            />
          ))}
        </Picker>
      )}
      {mode === 'datetime' && (
        <Picker
          key="minute"
          itemStyle={styles.itemStyle}
          pickerStyle={styles.pickerStyle}
          selectedValue={minuteList.indexOf(minute)}
          onValueChange={choice => updateState('minute', choice, date, onDateChange)}
        >
          {minuteList.map((minuteItem, i) => (
            <PickerItem
              key={i}
              value={minuteItem}
              label={minuteItem}
            />
          ))}
        </Picker>
      )}
    </View>
  )
}

DatePickerAndroid.propTypes = {
  androidStyles: React.PropTypes.object,
  onDateChange: React.PropTypes.func.isRequired,
  date: React.PropTypes.instanceOf(Date),
  mode: React.PropTypes.string,
  minimumDate: React.PropTypes.object,
}

DatePickerAndroid.defaultProps = {
  mode: 'date', // or "datetime"
  minimumDate: moment().subtract(50, 'years'),
}

export default DatePickerAndroid
