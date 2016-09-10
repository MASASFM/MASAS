var { browserHistory } = require('react-router')

var Home = {}

// Which part of the Redux global state does our component want to receive as props?
Home.mapStateToProps = function(state) {
	return {
		user: state.appReducer.MASASuser,
		currentPage: state.homeReducer.currentPage,
		demoTimePickerNumer: state.homeReducer.timePickerDemo,
	}
}



// Which action creators does it want to receive by props?
Home.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
		goToLogin: () => {
			browserHistory.push('/login')
		},
		goToPage: (pageNumber, totalNumberPages) => { dispatch({type: 'CHANGE_HOME_PAGE_NUMBER', pageNumber, totalNumberPages}) },
		updateTimePickerNumber: (number) => { dispatch({ type: "CHANGE_TIME_PICKER_DEMO", timePickerDemo: number })}
	}
}

module.exports = Home
