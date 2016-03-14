var SC = require('soundcloud')

let exportVar = {}

exportVar.defaultState = {
	choosingTime: null,	
	isConnectedSoundcloud: SC.isConnected(),    // IS USER CONNECTED TO SOUNDCLOUD
	soundcloudUserTracks: null, // ['LOADING'],      // SOUNDCLOUD USER TRACK TABLE CONTENT
	masasUserTracks: null,
	SCusername: null,	
	pickTimeUpload: null, 				// (int) 1 to 6, time interval
}
const { defaultState } = exportVar

exportVar.uploadSCReducer = function(state = defaultState, action) {
	
	switch(action.type) {
		case 'SYNC_SONG':
			return {
				...state,
				choosingTime: action.song
			}
		case 'UPDATE_SC_USER_TRACKS':
			return {
				...state,
				soundcloudUserTracks: action.soundcloudUserTracks
			}
		case 'UPDATE_MASAS_USER_TRACKS':
			return {
				...state,
				masasUserTracks: action.masasUserTracks
			}
		case 'UPDATE_SC_USERNAME':
			return {
				...state,
				SCusername: action.SCusername
			}
		case 'UPDATE_IS_CONNECTED_SC':
			return {
				...state,
				isConnectedSoundcloud: action.isConnectedSoundcloud
			}
		case 'HANDLE_PICK_TIME_UPLOAD':
			return {
				...state,
				pickTimeUpload: action.time
			}
		default:
			return state
	}

}


module.exports = exportVar