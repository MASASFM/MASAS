let exportVar = {}

exportVar.defaultState = {
	// profileInfo: {},						// user MASAS profile Info
}
const { defaultState } = exportVar

exportVar.profileReducer = function(state = defaultState, action) {
	
	switch(action.type) {

		default:
			return state
	}

}


module.exports = exportVar