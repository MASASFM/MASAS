var { browserHistory } = require('react-router')

const { dispatch, getState } = require('../../reducers/reducers.js')

var ajaxCalls = {}

ajaxCalls.updateProfileInfo = () => {
	const { MASASuser, userData } = getState().appReducer

	const header = "Bearer " + MASASuser

	console.log("user data: =>", userData)

	$.ajax({
		type: 'GET',
		url: userData.url,
		headers: {
			"Authorization": header,
		},
		success: (userData) => {
			dispatch({ type: 'UPDATE_USER_DATA', userData })
			console.log(userData)
		},
		error: (e) => {
			console.warn(e)
		}
	})
}

module.exports = ajaxCalls