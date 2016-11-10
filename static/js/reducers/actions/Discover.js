export const ADD_SONG_TO_HISTORY = "ADD_SONG_TO_HISTORY"
export const POP_SONG_FROM_HISTORY = "POP_SONG_FROM_HISTORY"
export const CHANGE_DISCOVER_NUMBER = "CHANGE_DISCOVER_NUMBER"
export const REMOVE_SONG_FROM_HISTORY = "REMOVE_SONG_FROM_HISTORY"

export function removeSongFromHistory(indexToRemove) {
	return {
		type: REMOVE_SONG_FROM_HISTORY,
		indexToRemove
	}
}

export function changeDiscoverNumber(discoverNumber) {
	return {
		type: CHANGE_DISCOVER_NUMBER,
		discoverNumber
	}
}

export function addSongToHistory(MASAS_songInfo, SC_songInfo, artistInfo) {
	return {
		type: ADD_SONG_TO_HISTORY,
		MASAS_songInfo,
		SC_songInfo,
		artistInfo
	}
}

export function popSongFromHistory() {
	return {
		type: POP_SONG_FROM_HISTORY
	}
}

