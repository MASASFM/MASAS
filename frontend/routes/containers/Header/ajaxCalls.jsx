let ajaxCalls = {}

const $ = require('jquery')

ajaxCalls.getUsername = (dispatch, MASASuser) => {
	// console.log(MASASuser)
	var header = "Bearer " + MASASuser
	$.ajax({
		type: "GET",
		url: 'api/check-user/',	
		headers: {
			"Authorization": header,
		},
		success: (data) => {
			console.log(data)
			var username = data.user
			if (username.length > 13)
				username = username.substr(0,13) + "..."

			// document.getElementById('username-header').innerHTML = username
			dispatch({type:'SET_USERNAME', username: username})
			return data
		},
		error: (err) => {
			console.log(err)
		},
	})
}

module.exports = ajaxCalls