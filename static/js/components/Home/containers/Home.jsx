import {
	updatePageTitle,
} from "../../../reducers/actions/App.js"

import{
	changeHomePageNumber,
	changeTimePickerDemo
} from "../../../reducers/actions/Home.js"

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
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
		goToLogin: () => {
			browserHistory.push('/login')
		},
		goToPage: (pageNumber, totalNumberPages) => dispatch(changeHomePageNumber(pageNumber, totalNumberPages)),
		updateTimePickerNumber: (number) => dispatch(changeTimePickerDemo(number))
	}
}

module.exports = Home
