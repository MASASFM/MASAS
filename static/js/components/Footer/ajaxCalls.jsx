var { browserHistory } = require('react-router')

const { dispatch } = require('../../reducers/reducers.js')

const { playRandomSong, getTimeIntervalFromURL, updateNotificationBar } = require('../../MASAS_functions.jsx')


var ajaxCalls = {}

ajaxCalls.reportSpam = () => {
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
			status: -3
		},
		success: (r) => {
			console.log(r)

			// play next song
			playRandomSong( MASASuser, getTimeIntervalFromURL(MASAS_songInfo.timeInterval) )

			// close modal
			dispatch({ type: 'TOOGLE_IS_MODAL_OPENED' })

			// notify user about success
			updateNotificationBar("Spam reported")
		},
		error: (e) => {
			console.warn(e)
			// notify user about error
			updateNotificationBar("Error reporting spam")
		}
	})
}

ajaxCalls.reportCopyright = () => {
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
			playRandomSong( MASASuser, getTimeIntervalFromURL(MASAS_songInfo.timeInterval) )

			// close modal
			dispatch({ type: 'TOOGLE_IS_MODAL_OPENED' })

			// notify user about success
			updateNotificationBar("Copyright infringement reported")
		},
		error: (e) => {
			console.warn(e)
			// notify user about error
			updateNotificationBar("Error reporting copyright infringement")
		}
	})
}

module.exports = ajaxCalls