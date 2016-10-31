export const INCREMENT_LOGGED_OUT_USER_STEP = 'INCREMENT_LOGGED_OUT_USER_STEP'
export const RESET_LOGGED_OUT_USER_STEP = 'RESET_LOGGED_OUT_USER_STEP'
export const CHANGE_MODAL_CONTENT = 'CHANGE_MODAL_CONTENT'
export const UPDATE_MODAL_TYPE = 'UPDATE_MODAL_TYPE'
export const CLOSE_AND_EMPTY_MAIN_MODAL = 'CLOSE_AND_EMPTY_MAIN_MODAL'
export const TOOGLE_IS_MODAL_OPENED = 'TOOGLE_IS_MODAL_OPENED'
export const UPDATE_PAGE_TITLE = 'UPDATE_PAGE_TITLE'

export function incrementLoggedOutUserStep() {
	return {
		type: INCREMENT_LOGGED_OUT_USER_STEP
	}
}

export function resetLoggedOutUserStep() {
	return {
		type: RESET_LOGGED_OUT_USER_STEP
	}
}

export function changeModalContent(modalContent, modalType, closeModalFunc) {
	return { 
		type: CHANGE_MODAL_CONTENT, 
		modalContent, 
		modalType,
		closeModalFunc
	}
}

export function updateModalType(modalType) {
	return {
		type: UPDATE_MODAL_TYPE,
		modalType,
	}
}

export function closeAndEmptyMainModal() {
	return {
		type: CLOSE_AND_EMPTY_MAIN_MODAL
	}
}

export function toogleIsModalOpened() {
	return {
		type: TOOGLE_IS_MODAL_OPENED,
	}
}

export function updatePageTitle(title, pageType) {
	return {
		type: UPDATE_PAGE_TITLE,
		title,
		pageType
	}
}
