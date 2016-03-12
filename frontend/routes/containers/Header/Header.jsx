var ReactRedux = require("react-redux")
var Header = require('../../components/Header/Header.jsx')
var {browserHistory} = require('react-router')


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {
		pageType: state.appReducer.pageType,
		pageTitle: state.appReducer.pageTitle,
		user: state.appReducer.MASASuser
	}
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
  	onSetNavSidebarOpen: () => dispatch({type:'TOOGLE_NAV_SIDEBAR'}),
  }
}

Header = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
module.exports = Header
