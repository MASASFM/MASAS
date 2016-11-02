export const CHANGE_UNSPLASH_ARTIST = 'CHANGE_UNSPLASH_ARTIST'

export function changeUnsplashArtist (username, name, url) {
	return {
		type: 'CHANGE_UNSPLASH_ARTIST',
		unsplashArtistUsername: username,
		unsplashArtistName: name,
		backgroundURL: url
	}
}