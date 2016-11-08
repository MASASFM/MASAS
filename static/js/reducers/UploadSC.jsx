var SC = require('soundcloud')

import { 
	UPDATE_SC_USER_TRACKS, 
	UPDATE_MASAS_USER_TRACKS,
	UPDATE_SC_USERNAME,
	UPDATE_IS_CONNECTED_SC,
	HANDLE_PICK_TIME_UPLOAD,
	UPDATE_UPLOAD_TIP_TIME_PICKER_VALUE,
} from './actions/UploadSC.js'

let exportVar = {}

exportVar.defaultState = {
	choosingTime: null,				// (object)  song info from SC (if not null => show picking time screen)
	isConnectedSoundcloud: SC.isConnected(),    // IS USER CONNECTED TO SOUNDCLOUD
	soundcloudUserTracks: null, // ['LOADING'],      // SOUNDCLOUD USER TRACK TABLE CONTENT
	masasUserTracks: null,
	SCusername: null,	
	pickTimeUpload: 2, 				// (int) 1 to 6, time interval
	pickTimeSliderValue: 10,			// (int) 0 - 100 __ [ slider controls pickTimeUpload ]
	checkbox1_checked: false,			// (bool) checkbox values for song ownership conf checkboxes
	checkbox2_checked: false,
	checkbox3_checked: false,
	tipTimePickerValue: 2,				// (int) \in [1,6], slider hashtag on tip modal

}
const { defaultState } = exportVar

exportVar.uploadSCReducer = function(state = defaultState, action) {
	
	switch(action.type) {
		case UPDATE_UPLOAD_TIP_TIME_PICKER_VALUE:
			var tipTimePickerValue = action.tipTimePickerValue

			if(tipTimePickerValue < 0)
				tipTimePickerValue = 0

			if(tipTimePickerValue > 100)
				tipTimePickerValue = 100

			return {
				...state,
				tipTimePickerValue,
			}
		case 'TOOGLE_CHECKBOX_1':
			return {
				...state,
				checkbox1_checked: !state.checkbox1_checked
			}
		case 'TOOGLE_CHECKBOX_2':
			return {
				...state,
				checkbox2_checked: !state.checkbox2_checked
			}
		case 'TOOGLE_CHECKBOX_3':
			return {
				...state,
				checkbox3_checked: !state.checkbox3_checked
			}
		case 'SYNC_SONG':
			return {
				...state,
				choosingTime: action.song
			}
		case UPDATE_SC_USER_TRACKS:
			return {
				...state,
				soundcloudUserTracks: action.soundcloudUserTracks
			}
		case UPDATE_MASAS_USER_TRACKS:
			return {
				...state,
				masasUserTracks: action.masasUserTracks
			}
		case UPDATE_SC_USERNAME:
			return {
				...state,
				SCusername: action.SCusername
			}
		case UPDATE_IS_CONNECTED_SC:
			return {
				...state,
				isConnectedSoundcloud: action.isConnectedSoundcloud
			}
		case HANDLE_PICK_TIME_UPLOAD:  				// (updated TO BE TESTED
			return {
				...state,
				pickTimeUpload: action.newDiscover,
			}
		case 'CLOSE_PICK_TIME_WINDOW':  				// (TO BE TESTED
			return {
				...state,
				pickTimeUpload: exportVar.defaultState.pickTimeUpload,
				pickTimeSliderValue: exportVar.defaultState.pickTimeSliderValue,
				choosingTime: null
			}
		default:
			return state
	}

}


module.exports = exportVar