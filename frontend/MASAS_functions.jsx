var {browserHistory} = require('react-router')

var MASAS_functions = {}

MASAS_functions.goToURL = (path) => {
	browserHistory.push(path)
}

/*
	takes dispatch (from mapDispatchToProps(dispatch) in containers) and user token
	result: returns nothing. but updates appReducer's auth token and user pk
*/
MASAS_functions.logInWithToken = (dispatch, userToken) => {
	var header = "Bearer " + userToken
	$.ajax({
		type: "GET",
		url: 'api/check-user/',	
		headers: {
			"Authorization": header,
		},
		success: (data) => {
			console.log(data)
			var pk = data.userPk

			dispatch({type: 'UPDATE_USER_PK', pk: pk})
			dispatch({type: 'LOGIN', token: userToken})
		},
		error: (err) => {
			console.log(err)
		},
	})
}

// using jQuery
MASAS_functions.getCookie = function(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie != '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = jQuery.trim(cookies[i]);
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) == (name + '=')) {
			    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
			    break;
			}
		}
	}
	return cookieValue;
}

module.exports = MASAS_functions