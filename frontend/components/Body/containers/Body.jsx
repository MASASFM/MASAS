
// var Body = require('../../components/Body/Body.jsx')

var Body = {}

// Which part of the Redux global state does our component want to receive as props?
Body.mapStateToProps = function(state) {
	return {
		title: state.appReducer.pageTitle
	}
}

// Which action creators does it want to receive by props?
Body.mapDispatchToProps = function(dispatch) {
	return {

	}
}

module.exports = Body
