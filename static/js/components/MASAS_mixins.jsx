import $ from 'jquery'

let MASAS_mixins = {}

MASAS_mixins.MobileBlurBackground = {
	componentDidMount: function() {

		// add blur class to background
		$('#body--background').addClass('blurred-mobile')
	},

	componentWillUnmount: function() {
		// remove blur class from background
		$('#body--background').removeClass('blurred-mobile')
	}
}

module.exports = MASAS_mixins
