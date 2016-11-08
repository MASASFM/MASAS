export const UPDATE_SC_USER_TRACKS = 'UPDATE_SC_USER_TRACKS'
export const UPDATE_MASAS_USER_TRACKS = 'UPDATE_MASAS_USER_TRACKS'
export const UPDATE_SC_USERNAME = 'UPDATE_SC_USERNAME'
export const UPDATE_IS_CONNECTED_SC = 'UPDATE_IS_CONNECTED_SC'
export const HANDLE_PICK_TIME_UPLOAD = 'HANDLE_PICK_TIME_UPLOAD'
export const UPDATE_UPLOAD_TIP_TIME_PICKER_VALUE = 'UPDATE_UPLOAD_TIP_TIME_PICKER_VALUE'

export function updateUploadTipTimePickerValue(tipTimePickerValue) {
	return {
		type: UPDATE_UPLOAD_TIP_TIME_PICKER_VALUE,
		tipTimePickerValue
	}
}

export function handlePickTimeUpload(newDiscover) {
	return {
		type: HANDLE_PICK_TIME_UPLOAD,
		newDiscover
	}
}

export function updateSCUserTracks(soundcloudUserTracks) {
	return {
		type: UPDATE_SC_USER_TRACKS,
		soundcloudUserTracks,
	}
}

export function updateMasasUserTracks(masasUserTracks) {
	return {
		type: UPDATE_MASAS_USER_TRACKS,
		masasUserTracks,
	}
}

export function updateSCUsername(SCusername) {
	return {
		type: UPDATE_SC_USERNAME,
		SCusername,
	}
}

export function updateIsConnectedSC(isConnectedSoundcloud) {
	return {
		type: UPDATE_IS_CONNECTED_SC,
		isConnectedSoundcloud
	}
}