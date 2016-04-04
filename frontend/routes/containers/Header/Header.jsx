var ReactRedux = require("react-redux")
var Header = require('../../components/Header/Header.jsx')
var {browserHistory} = require('react-router')


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {
		pageType: state.appReducer.pageType,
		pageTitle: state.appReducer.pageTitle,
		user: state.appReducer.MASASuser,
		isPlayerBarOpened: state.footerReducer.isOpened,
		backArrowFunc: state.appReducer.backArrowFunc,
		notificationText: state.headerReducer.notificationText,
		isAppFetching: state.appReducer.isAppFetching,
	}
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		onSetNavSidebarOpen: () => dispatch({type:'TOOGLE_NAV_SIDEBAR'}),
		toogleIsOpened: () => dispatch({ type: 'TOOGLE_IS_FOOTER_OPENED' }),
		goToHomepageSlide1: () => dispatch({type: 'CHANGE_HOME_PAGE_NUMBER', pageNumber: 1, totalNumberPages: 4})
	}
}

Header = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Header)
module.exports = Header
