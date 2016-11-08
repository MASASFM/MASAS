import {
	updatePageTitle
} from "../../../reducers/actions/App.js"

import {
	toogleLegalsPageNumber
} from "../../../reducers/actions/Legals.js"

var LegalsContent = {}

// Which part of the Redux global state does our component want to receive as props?
LegalsContent.mapStateToProps = function(state) {
	return {

	}
}

// Which action creators does it want to receive by props?
LegalsContent.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, backArrowFunc) => dispatch(updatePageTitle(title, 1, backArrowFunc)),
		goToHome: () => dispatch(toogleLegalsPageNumber(0))
	}
}

module.exports = LegalsContent
