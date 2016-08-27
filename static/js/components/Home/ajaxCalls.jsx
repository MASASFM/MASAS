const { dispatch } = require('../../reducers/reducers.js')

var ajaxCalls = {}

ajaxCalls.getSongCount = (successFunc) => {
	$.ajax({
		type: "GET",
		url: "/api/songs/",
		success: (response) => {
			successFunc(response)
		},
		error: (e) => {
		}
	})
	
}

module.exports = ajaxCalls