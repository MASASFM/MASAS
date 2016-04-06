var { browserHistory } = require('react-router')

const { dispatch } = require('../../reducers/reducers.js')

var ajaxCalls = {}

ajaxCalls.getLikes = (userPk) => {
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

module.exports = ajaxCalls