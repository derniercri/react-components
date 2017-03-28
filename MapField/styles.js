import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

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
    fontSize: 17,
    padding: 5
  },
  mapSuggestHolder: {
    flex: 1
  },
  mapSuggestHolderLight: {
    marginBottom: 20
  },
  suggestText: {
    marginLeft: 15,
    paddingVertical: 5,
    fontSize: 14,
    alignSelf: 'flex-start'
  },
  lightDisplay: {
    marginBottom: -20
  },
  mapPage: {
    position: 'absolute',
    top: height * 0.3,
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 39
  },
  mapHolder: {
    flex: 1,
    marginTop: 30,
    marginHorizontal: -39,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  mapContainer: {
    margin: 0,
    padding: 0
  }
})
