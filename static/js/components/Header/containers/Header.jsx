var ReactRedux = require("react-redux")

var {browserHistory} = require('react-router')

var Header = {}
// Which part of the Redux global state does our component want to receive as props?
Header.mapStateToProps = function(state) {
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
Header.mapDispatchToProps = function(dispatch) {
	return {
		onSetNavSidebarOpen: () => dispatch({type:'TOOGLE_NAV_SIDEBAR'}),
		toogleIsOpened: () => dispatch({ type: 'TOOGLE_IS_FOOTER_OPENED' }),
		goToHomepageSlide1: () => dispatch({type: 'CHANGE_HOME_PAGE_NUMBER', pageNumber: 1, totalNumberPages: 4})
	}
}

module.exports = Header
