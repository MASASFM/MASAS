
var ReactRedux = require("react-redux")
var Password = require('../../components/UI/Password.jsx')


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {

	}
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {

	}
}

var Password = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Password)
module.exports = Password
