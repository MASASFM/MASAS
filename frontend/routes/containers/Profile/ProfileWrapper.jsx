
var ReactRedux = require("react-redux")
var ProfileWrapper = require('../../components/Profile/ProfileWrapper.jsx')


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {
		title: state.appReducer.pageTitle,
	}
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		// updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType})
	}
}

var ProfileWrapper = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileWrapper)
module.exports = ProfileWrapper
