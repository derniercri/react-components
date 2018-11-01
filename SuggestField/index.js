import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native'
import { fieldStyle } from './styles'

class SuggestField extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      suggestSource: props.fieldSource,
      suggests: [],
      changed: false,
      value: props.fieldSource[props.value] || ''
    }
  }

  componentWillMount () {
    this.setSuggests(true)
  }

  onChangeText (value, cb) {
    this.setState({ value }, () => {
      this.setSuggests()
    })
  }

  onSuggestPressed (text) {
    this.setState({
      value: this.state.suggestSource[text]
    }, () => {
      this.props.onChange(this.props.field, text) // TODO: à revoir pour le cas d'ajout d'un tag
    })
  }

  addSetSuggesstion () {
    const { value } = this.state
    this.setState({
      suggestSource: {
        ...this.state.suggestSource,
        [value]: value
      }
    }, () => {
      this.setSuggests()
      this.props.onChange(this.props.field, value)
    })
  }

  setSuggests (initial = false) {
    const { value, suggestSource } = this.state
    const suggests = []

    Object.keys(suggestSource).forEach(word => {
      const suggest = suggestSource[word]
      if (suggest.includes(value) || initial) {
        suggests.push(word)
      }
    })

    this.setState({
      suggests,
      changed: true
    })
  }

  render () {
    const { placeholder, onChange } = this.props
    const { value, suggests, suggestSource, changed } = this.state

    return (
      <View style={fieldStyle.tagContainer}>
        <View style={fieldStyle.fieldContainer}>
          <TextInput
            style={fieldStyle.field}
            placeholder={placeholder}
            value={value}
            onChangeText={text => this.onChangeText(text, onChange)}
            underlineColorAndroid="transparent"
            returnKeyType="done"
          />
        </View>

        <ScrollView style={fieldStyle.suggestHolder}>
          {suggests.length > 0
            ? suggests.map((value) => (
              <TouchableOpacity key={`suggest-${value}`} onPress={() => this.onSuggestPressed(value)}>
                <Text style={fieldStyle.suggestText}>
                  <Text style={fieldStyle.suggestTextBold}>
                    {suggestSource[value].toUpperCase()}
                  </Text>
                </Text>
              </TouchableOpacity>
            ))
            : value.length && changed > 0
              ? (
                <TouchableOpacity onPress={() => this.addSetSuggesstion()}>
                  <Text style={fieldStyle.suggestText}>
                    <Text style={fieldStyle.suggestTextLight}>
                      {'AJOUTE : '}
                    </Text>
                    <Text style={fieldStyle.suggestTextBold}>
                      {value.toUpperCase()}
                    </Text>
                  </Text>
                </TouchableOpacity>
              )
              : null
          }
        </ScrollView>
      </View>
    )
  }
}

SuggestField.propTypes = {
  fieldSource: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  field: PropTypes.string,
  placeholder: PropTypes.string,
}

export default SuggestField
