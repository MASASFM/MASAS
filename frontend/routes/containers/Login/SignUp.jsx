
var ReactRedux = require("react-redux")
var SignUpForm = require('../../components/Login/SignUp.jsx')


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {

	}
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: 'Sign-up', pageType: '0'})
	}
}

var SignUpForm = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm)
module.exports = SignUpForm;
