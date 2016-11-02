import 'whatwg-fetch'

export const CHANGE_UNSPLASH_ARTIST = 'CHANGE_UNSPLASH_ARTIST'

function updateUnsplashArtist (username, name, url) {
	return {
		type: 'CHANGE_UNSPLASH_ARTIST',
		unsplashArtistUsername: username,
		unsplashArtistName: name,
		backgroundURL: url
	}
}

export function changeUnsplashArtist () {
	return dispatch => {
		var unsplashClientID = "8ad2087b753cfaaa3c601d73395a8205b727571b7491dc80b68ff4bde538ee6b"

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
				updateUnsplashArtist(like.user.name, like.user.username, like.urls.regular)
			}
		}).catch( e => {

		})
	}
}