let exportVar = {}

exportVar.defaultState = {
	discoverNumber: 1,						// which discover to show on page

	history: {
		all: [],
		1: [],
		2: [],
		3: [],
		4: [],
		5: [],
		6: [],
	}

}

const { defaultState } = exportVar

exportVar.discoverReducer = function(state = defaultState, action) {
	
	switch(action.type) {
		case 'ADD_SONG_TO_HISTORY':
			// action.SC_songInfo: (object)
			// action.MASAS_songInfo: (object)

			// // don't add latest song in history if action.songInfo already in
			// var discoverNumber = parseInt(action.MASAS_songInfo.timeInterval.substr(action.MASAS_songInfo.timeInterval.length - 2, 1))



			// check discover number within range
			if(state.history.all.length > 0) {
				var a = state.history.all[state.history.all.length -1]
				var b = { MASAS_songInfo: action.MASAS_songInfo, SC_songInfo: action.SC_songInfo }
				if(JSON.stringify(a) === JSON.stringify(b) )
					return state
			}


			return {
				...state,
				history: {
					...state.history,
					all: [
						...state.history.all,
						{
							MASAS_songInfo: action.MASAS_songInfo, 
							SC_songInfo: action.SC_songInfo
						}
					]
				}

			}
			
		case 'POP_SONG_FROM_HISTORY':
			var stateBis = state
			stateBis.history.all.pop()

			return {
				...state,
				history: stateBis.history
			}
		case 'CHANGE_DISCOVER_NUMBER':
			var discoverNumber = action.discoverNumber
			if( !(discoverNumber <= 6 && discoverNumber >= 1) )
				discoverNumber = 1

			return {
				...state,
				discoverNumber
			}
		default:
			return state
	}
}


module.exports = exportVar