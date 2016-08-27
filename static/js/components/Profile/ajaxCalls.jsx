var { browserHistory } = require('react-router')

const { dispatch, getState } = require('../../reducers/reducers.js')

var ajaxCalls = {}

ajaxCalls.updateProfileInfo = () => {
	const { MASASuser, userData } = getState().appReducer

	const header = "Bearer " + MASASuser

	$.ajax({
		type: 'GET',
		url: userData.url,
		headers: {
			"Authorization": header,
		},
		success: (userData) => {
			dispatch({ type: 'UPDATE_USER_DATA', userData })
		},
		error: (e) => {
		}
	})
}

module.exports = ajaxCalls