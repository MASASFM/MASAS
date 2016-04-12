var { browserHistory } = require('react-router')

const { dispatch } = require('../../reducers/reducers.js')

var ajaxCalls = {}

ajaxCalls.reportCopyright = () => {
	console.log('hey')
	const { getState } = require('../../reducers/reducers.js')
	const { MASASuser, userData } = getState().appReducer
	const { MASAS_songInfo, songPlaying } = getState().playerReducer

	var header = "Bearer " + MASASuser
	$.ajax({
		type: 'POST',
		url: '/api/statuses/',
		headers: {
			"Authorization": header,
		},
		data: {
			song: MASAS_songInfo.url,
			user: userData.url,
			status: -2
		},
		success: (r) => {
			console.log(r)
			// play next song
		},
		error: (e) => {
			console.warn(e)
		}
	})
}

module.exports = ajaxCalls