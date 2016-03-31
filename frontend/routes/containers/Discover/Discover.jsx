var ReactRedux = require("react-redux")
var Discover = require('../../components/Discover/Discover.jsx')


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {
		discoverNumber: state.discoverReducer.discoverNumber,
		history: state.discoverReducer.history,
		songPlaying: state.playerReducer.songPlaying,
	}
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
		handleTimePickerChange: (discoverNumber) => dispatch({ type: 'CHANGE_DISCOVER_NUMBER', discoverNumber})
	}
}

var Discover = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Discover)
module.exports = Discover
