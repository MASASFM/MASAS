import {
	updatePageTitle
} from "../../../reducers/actions/App.js"

import {
	toogleLegalsPageNumber
} from "../../../reducers/actions/Legals.js"

var LegalsHome = {}

LegalsHome.mapStateToProps = function(state) {
	return {
		pageNumber: state.legalsReducer.pageNumber,
	}
}

LegalsHome.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
		goToPage: pageNumber => dispatch(toogleLegalsPageNumber(pageNumber))
	}
}

module.exports = LegalsHome
