let exportVar = {}

exportVar.defaultState = {
	userLikes: null,											// user likes from MASAS API
	SCinfo: null,												// song info corresponding to these likes from SCinfo
	reFetch: 0,													// rerender when new likes come in
	searchInput: "", 											// (string) search textbox input
	hashtagFilter: [false,false,false,false,false,false],		// (array) 1 = include in search. 1st entry = #EarlyMorning
	loadMoreLikes: true 										// (bool) need more likes to load in infinite scrool ?
}

const { defaultState } = exportVar

exportVar.likesReducer = function(state = defaultState, action) {
	
	switch(action.type) {
		case 'TOOGLE_HASHTAG_FILTER':
			var hashtagFilter = state.hashtagFilter.slice(0)
			hashtagFilter[action.hashtagNumber] = !hashtagFilter[action.hashtagNumber]

			return {
				...state,
				hashtagFilter
			}
		case 'UPDATE_LIKES':
			return {
				...state,
				SCinfo: action.SCinfo,
				userLikes: action.userLikes,
			}
		// SCinfo updated from likes page renderLikes() method
		case 'ADD_LIKE':
			return {
				...state,
				userLikes: action.userLikes,
			}
		case 'REFETCH_LIKES': // NOT TESTED
			return {
				...state,
				reFetch: ( state.reFetch > 100 ? 1 : state.reFetch+1 ),
			}
		case 'UPDATE_LIKES_SEARCH_INPUT':
			return { 
				...state,
				searchInput: action.input
			}
		default:
			return state
	}
}


module.exports = exportVar
