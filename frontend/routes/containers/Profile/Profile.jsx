var ReactRedux = require("react-redux")
var Profile = require('../../components/Profile/Profile.jsx')


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {
		userToken: state.appReducer.MASASuser,
		userPk: state.appReducer.MASASuserPk
	}
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType})
	}
}

var Profile = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
module.exports = Profile;
