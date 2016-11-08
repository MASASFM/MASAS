import 'whatwg-fetch'

export const CHANGE_UNSPLASH_ARTIST = 'CHANGE_UNSPLASH_ARTIST'
export const CHANGE_BACKGROUND = 'CHANGE_BACKGROUND'
export const CHANGE_HOME_PAGE_NUMBER = 'CHANGE_HOME_PAGE_NUMBER'

const unsplashClientID = "bdf3de47d066d021c1deef3d653c824d38d52e7c267e932473d475ab1ce21efa"

export function changeHomePageNumber(pageNumber, totalNumberPages) {
	return {
		type: CHANGE_HOME_PAGE_NUMBER,
		pageNumber,
		totalNumberPages,
	}
}

// update background unsplash artist and picture
function updateUnsplashArtist (username, name, url) {
	return {
		type: 'CHANGE_UNSPLASH_ARTIST',
		unsplashArtistUsername: username,
		unsplashArtistName: name,
		backgroundURL: url
	}
}

// get new unsplash artist (get both new unsplash artist and new picture)
export function changeUnsplashArtist () {
	return dispatch => {
		fetch("https://api.unsplash.com/users/masas/likes/?client_id=" + unsplashClientID, {
			method: "GET",
			body: {
				client_id: unsplashClientID,
				per_page: 30
			},
		}).then( r => {
			const likeNumber = Math.floor(Math.random() * r.length) - 1

			if(likeNumber > -1 && likeNumber < r.length) {
				const like = r[likeNumber]
				dispatch(updateUnsplashArtist(like.user.name, like.user.username, like.urls.regular))
			}
		}).catch( e => {

		})
	}
}

// update background state
function changeBackground(url) {
	return { 
		type: CHANGE_BACKGROUND,
		backgroundURL: url
	}
}

// get random unsplash picture from current background artist
export function getNewBackground() {
	return (dispatch, getState) => {
		const state = getState()
		const { unsplashArtistUsername } = state.homeReducer

		fetch("https://api.unsplash.com/users/masas/likes/?username=" + unsplashArtistUsername + "&client_id=" + unsplashClientID)
		.then( r => {
			dispatch(changeBackground(r.urls.regular))
		}).catch( e => {

		})
	}
}