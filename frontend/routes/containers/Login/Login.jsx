
var ReactRedux = require("react-redux")
var Login = require('../../components/Login/Login.jsx')


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {
		title: state.appReducer.pageTitle,
	}
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		updateTitle: () => dispatch({type:'UPDATE_PAGE_TITLE', title: 'Login', pageType: 0})
	}
}

var Login = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
module.exports = Login;
