var SC = require('soundcloud')

let exportVar = {}

exportVar.defaultState = {
	choosingTime: {}, //null,				// (object)  song info from SC (if not null => show picking time screen)
	isConnectedSoundcloud: true,//SC.isConnected(),    // IS USER CONNECTED TO SOUNDCLOUD
	soundcloudUserTracks: null, // ['LOADING'],      // SOUNDCLOUD USER TRACK TABLE CONTENT
	masasUserTracks: null,
	SCusername: null,	
	pickTimeUpload: 2, 				// (int) 1 to 6, time interval
	pickTimeSliderValue: 10,			// (int) 0 - 100 __ [ slider controls pickTimeUpload ]
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
		case 'HANDLE_PICK_TIME_UPLOAD':  				// (updated TO BE TESTED
			// var pickTimeUpload = Math.floor(action.rangeValue/100*6) + 1

			// if(pickTimeUpload > 6)
			// 	pickTimeUpload = 6
			// if(pickTimeUpload < 0)
			// 	pickTimeUpload = 0

			return {
				...state,
				pickTimeUpload: action.pickTimeUpload,
				pickTimeSliderValue: action.rangeValue
			}
		default:
			return state
	}

}


module.exports = exportVar