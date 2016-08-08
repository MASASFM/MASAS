var { getLikes } = require('../ajaxCalls.jsx')

var Likes = {}

// Which part of the Redux global state does our component want to receive as props?
Likes.mapStateToProps = function(state) {
	return {
		// userLikes: state.likesReducer.userLikes,
		userData: state.appReducer.userData,
		SCinfo: state.likesReducer.SCinfo,
		userPk: state.appReducer.MASASuserPk,
		reFetch: state.likesReducer.reFetch,
		searchInput: state.likesReducer.searchInput,
	}
}

// Which action creators does it want to receive by props?
Likes.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
		getLikes: (userPk) => getLikes(userPk),
		updateLikes: (SCinfo) => dispatch({ type: 'UPDATE_LIKES', SCinfo, userLikes: null })
	}
}

module.exports = Likes
