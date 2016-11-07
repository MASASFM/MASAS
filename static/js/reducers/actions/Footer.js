export const TOOGLE_IS_FOOTER_OPENED = "TOOGLE_IS_FOOTER_OPENED"
export const SET_PLAYER_PROGRESS_BAR = "SET_PLAYER_PROGRESS_BAR"

export function toogleIsFooterOpened() {
	return {
		type: TOOGLE_IS_FOOTER_OPENED,
	}
}

export function setPlayerProgressBar(progress) {
	return {
		type: 'SET_PLAYER_PROGRESS_BAR',
		progress
	}
}