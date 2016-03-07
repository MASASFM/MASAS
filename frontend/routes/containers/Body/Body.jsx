
var ReactRedux = require("react-redux")
var Body = require('../../components/Body/Body.jsx')


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {
		title: state.appReducer.pageTitle
	}
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {

	}
}

var Body = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Body)
module.exports = Body;
