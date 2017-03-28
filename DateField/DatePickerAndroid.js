import React from 'react'
import { View } from 'react-native'
import Picker from './PickerAndroid'
import moment from 'moment'

import styles from './styles'
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

const getYears = (count = 50) => {
  const currentYear = parseInt(moment().format('YYYY'))
  const firstYear = currentYear - count
  const years = []

  for(i = currentYear; i >= firstYear; i--){
    years.push(`${i}`)
  }

  return years
}

const getMonth = () => {
  const month = []

  for (var i = 0; i < 12; i++) {
    month.push(i)
  }

  return month
}

const getDays = (year, month) => {
  const dayCount = new Date(year, month + 1, 0).getDate()
  const day = []

  for (var i = 1; i <= dayCount; i++) {
    day.push(i)
  }

  return day
}

const getFieldValues = date => {
  const currentDate = moment(date)

  return {
    day: parseInt(currentDate.format('DD')),
    month: parseInt(currentDate.format('MM')) - 1,
    year: parseInt(currentDate.format('YYYY'))
  }
}

const updateState = (key, choice, date, cb) => {
  const values = {
    ...getFieldValues(date),
    [key]: choice
  }

  const {
    day,
    month,
    year
  } = values
  const newDate = new Date(year, month, day)

  cb(newDate)
}

const DatePickerAndroid = ({date, onDateChange}) => {
  
  const {
    day,
    month,
    year
  } = getFieldValues(date)

  const yearList = getYears()
  const dayList = getDays(year, month)
  const monthList = getMonth()

  return (
    <View style={styles.pickerholder}>
      <Picker
        key="day"
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
        selectedValue={yearList.indexOf(year)}
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
    </View>
  )
}

DatePickerAndroid.propTypes = {
  onDateChange: React.PropTypes.func.isRequired,
  date: React.PropTypes.instanceOf(Date)
}

export default DatePickerAndroid
