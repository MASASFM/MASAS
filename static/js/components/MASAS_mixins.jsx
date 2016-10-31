const { dispatch } = require('../reducers/reducers.js')
import { changeBgState } from "../reducers/actions/App.js"

let MASAS_mixins = {}

MASAS_mixins.MobileBlurBackground = {
	componentDidMount: function() {
		// add blur class to background
		dispatch(changeBgState.blurMobile(true))
	},

	componentWillUnmount: function() {
		// remove blur class from background
		dispatch(changeBgState.blurMobile(false))
	}
}

MASAS_mixins.BlurBackground = {
	componentDidMount: function() {

		// add blur class to background
		dispatch(changeBgState.blur(true))
	},

	componentWillUnmount: function() {
		// remove blur class from background
		dispatch(changeBgState.blur(false))
	}
}

module.exports = MASAS_mixins
