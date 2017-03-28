import { 
  StyleSheet,
  PixelRatio,
  Dimensions
} from 'react-native'

const { width, height } = Dimensions.get('window')
const ratio = PixelRatio.get()

export default StyleSheet.create({
  pickerholder: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
	container: {
		flex: 1,
    height: 100,
    marginRight: 10,
    marginLeft: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: null
	},
	up: {
		height: 90,
		overflow: 'hidden',
		backgroundColor: 'transparent',
	},
	upView: {
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	upText: {
		paddingTop: 0,
		height: 30,
		fontSize: 20,
		color: '#000',
		opacity: .5,
		paddingBottom: 0,
		marginTop: 0,
		marginBottom: 0
	},
	middle: {
		height: 40,
		width: width,
		overflow: 'hidden',
		borderColor: '#5ac3eb',
		borderTopWidth: 10 / ratio,
		borderBottomWidth: 10 / ratio,
		backgroundColor: 'transparent',
	},
	middleView: {
		height: 40,
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	middleText: {
		paddingTop: 0,
		height: 40,
		color: '#000',
		fontSize: 28,
		paddingBottom: 0,
		marginTop: 0,
		marginBottom: 0
	},
	down: {
		height: 90,
		overflow: 'hidden',
		backgroundColor: 'transparent',
	},
	downView: {
		overflow: 'hidden',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: 'transparent',
	},
	downText: {
		paddingTop: 0,
		height: 30,
		fontSize: 16,
		color: '#000',
		opacity: .5,
		paddingBottom: 0,
		marginTop: 0,
		marginBottom: 0
	}
})
