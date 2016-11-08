import {
	updatePageTitle,
} from "../../../reducers/actions/App.js"

var Template = {}

Template.mapStateToProps = function(state) {
	return {
	}
}

Template.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
	}
}

module.exports = Template
