
var ReactRedux = require("react-redux")
var Textbox = require('../../components/UI/Textbox.jsx')


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

var Textbox = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Textbox)
module.exports = Textbox;
