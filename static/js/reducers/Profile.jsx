import {
	UPDATE_USER_SC_SONGS,
	UPDATE_PUBLIC_PROFILE_INFO,
	UPDATE_EDIT_PROFILE_TEXTBOX_VALUES,
	TOGGLE_EDITING_PROFILE,
	UPDATE_SONG_MOOD_MODAL_VALUE,
	UPDATE_BACK_ARROW_FUNC
} from "./actions/Profile.js"

let exportVar = {}

exportVar.defaultState = {
	// profileInfo: {},						// user MASAS profile Info
	changeSongMoodValue: 0,				// (int) in [1,6], discover number on modal called when changing discover number for a song 
	isEditingProfile: false,					// (bool) is user editing profile
	textboxValues: {					// (obj) values of textboxes when editing profile info
		name: "",
		city: "",
		occupation: "",
		link_set: ["", "", "", ""],				// (array) length = 4, [0] = SC, [1] = Twitter, [2] = perso, [3] = facebook
	},		
	publicProfileInfo: {},					// (obj) public info profile on /user/:username		
	userSCSongs: [],
	backArrowFunc: null,					// (func) if not null, profile shows back arrow in header on mobile and call this callback when back arrow pressed
}

const { defaultState } = exportVar

exportVar.profileReducer = function(state = defaultState, action) {
	
	switch(action.type) {
		case UPDATE_BACK_ARROW_FUNC:
			var backArrowFunc = action.backArrowFunc
			if(typeof(backArrowFunc) !== "function")
				backArrowFunc = null

			return {
				...state,
				backArrowFunc
			}
		case UPDATE_USER_SC_SONGS:
			return {
				...state,
				userSCSongs: action.userSCSongs
			}
		case UPDATE_PUBLIC_PROFILE_INFO:
			return {
				...state,
				publicProfileInfo: action.publicProfileInfo
			}
		case UPDATE_EDIT_PROFILE_TEXTBOX_VALUES:
			var textboxValues = {...state.textboxValues, ...action.textboxValues}
			
			return {
				...state,
				textboxValues
			}
		case UPDATE_SONG_MOOD_MODAL_VALUE:
			var discoverNumber = action.discoverNumber

			if(discoverNumber < 1)
				discoverNumber = 1
			else if(discoverNumber > 6)
				discoverNumber = 6

			return {
				...state,
				changeSongMoodValue: action.discoverNumber
			}
		case TOGGLE_EDITING_PROFILE:
			return {
				...state,
				isEditingProfile: !state.isEditingProfile,
			}
		default:
			return state
	}

}


module.exports = exportVar