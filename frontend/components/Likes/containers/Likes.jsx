var Likes = {}

// Which part of the Redux global state does our component want to receive as props?
Likes.mapStateToProps = function(state) {
	return {
		userLikes: state.likesReducer.userLikes,
		SCinfo: state.likesReducer.SCinfo,
		userPk: state.appReducer.MASASuserPk,
		reFetch: state.likesReducer.reFetch,
	}
}

Likes.mapDispatchToProps = function(dispatch) {
	$.ajax({
		type: "GET",
		// url: 'api/users/' + userPk + '/',	
		url: '/api/statuses/?user=' + userPk + '&status=1',	

			 // -u"<client_id>:<client_secret>" 
		success: (data) => {
			
			// get songs from the likes relationship
			if(data.results.length > 0) {
				var idString = data.results.map((like) => {return like.song.SC_ID}).join()
				SC.get('tracks', {limit: 200, ids: idString}).then( (response) => {
					console.log(response)
					// this.setState({userInfo: data, userSCSongs: response})
					dispatch({ type: 'UPDATE_LIKES', SCinfo: response, userLikes: data.results })
				})
			} else
				dispatch({ type: 'UPDATE_LIKES', SCinfo: null, userLikes: null })
		},
		error: (err) => {
			console.log(err)
		},
	})
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
		getLikes: (userPk) => getLikes(dispatch, userPk)
	}
}

module.exports = Likes
