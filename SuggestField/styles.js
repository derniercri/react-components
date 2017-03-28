import { StyleSheet, Dimensions } from 'react-native'
import { colors, fonts } from '../../constants/styles'

const { width, height } = Dimensions.get('window')

const imageSize = 42
const centerButtonHeight = 33
const progressBarHeight = 7
const formOffset = -27
const progressBarBorderWidth = 2

export const fieldStyle = StyleSheet.create({
  fieldContainer: {
    height: 37,
    backgroundColor: colors.greyOpac1,
    borderRadius: 23
  },
  field: {
    flexGrow: 1,
    height: 17,
    alignItems: 'flex-start',
    textAlign: 'center',
    fontFamily: fonts.quickSandRegular,
    color: colors.greyOpac4,
    fontSize: 17,
    padding: 5
  },
  tagContainer: {
    paddingBottom: 150
  },
  suggestHolder: {
    marginTop: 20,
    paddingBottom: 100,
    height: 100
  },
  suggestText: {
    marginLeft: 15,
    paddingVertical: 5,
    fontSize: 14,
    color: colors.purpleDark,
    alignSelf: 'flex-start'
  },
  suggestTextLight: {
    fontFamily: fonts.quickSandRegular
  },
  suggestTextBold: {
    fontFamily: fonts.quickSandBold
  },
})
