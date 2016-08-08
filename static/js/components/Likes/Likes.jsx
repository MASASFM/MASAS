var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Likes.jsx")

var LikesWrapper = require("./LikesWrapper.jsx")
var LikesItem = require("./LikesItem.jsx")
var LikesArtworks = require("./LikesArtworks.jsx")
var { Textbox } = require("../UI/UI.jsx")

var { isSubsequence } = require("../../MASAS_functions.jsx")

var Likes = React.createClass({
	propTypes: {
		SCinfo: React.PropTypes.array,
		userData: React.PropTypes.object,
		searchInput: React.PropTypes.string,
	},

	componentWillMount: function() {
		this.props.updateTitle('Likes', '0')		// 0 = menu icon; 1 = arrow back

		this.getLikes()
	},

	componentDidMount: function() {
	},

	getLikes: function() {
		// console.log('no way')
		if(typeof(this.props.userData.likes) !== "undefined") {
			var idString = this.props.userData.likes.map((like) => {return like.song.SC_ID}).join()
			SC.get('tracks', {limit: 200, ids: idString}).then( (response) => {
				// console.log(response)
				// this.setState({userInfo: data, userSCSongs: response})
				this.props.updateLikes(response)
			})
		} else {
			this.props.updateLikes(null)
		}
	},

	componentDidUpdate(prevProps, prevState) {
		if(JSON.stringify(prevProps.userData) !== JSON.stringify(this.props.userData))
			this.getLikes()
	},

	filterLikes: function() {
		if(this.props.SCinfo !== null) {
			var songs = this.props.SCinfo
			var songList =  songs.map((song) => { 
				var MASAS_songInfo = this.props.userData.likes.filter((like) => {
					return like.song.SC_ID === song.id
				})

				if(MASAS_songInfo.length === 1)
					return [MASAS_songInfo, song]
				else
					return 0
			})

			var radioTimeString = (timeIntervalURL) => {
				var switchVar = timeIntervalURL.substr(timeIntervalURL.length - 2, 1)
			
				switch(switchVar) {
					case "1":
						return "#EarlyMorning"
					case "2":
						return "#LateMorning"
					case "3":
						return "#EarlyAfternoon"
					case "4":
						return "#LateAfternoon"
					case "5":
						return "#EarlyEvening"
					case "6":
						return "#LateEvening"
					default:
						return 
				}
			}

			var filteredSongList = songList.filter((song) => {
				var songSearchString = radioTimeString(song[0][0].song.timeInterval) + " " + song[1].title + " " + song[1].tag_list

				return isSubsequence(this.props.searchInput, songSearchString)
			})

			// ony keep SC data
			filteredSongList = filteredSongList.map((song) => song[1])

			return filteredSongList
		} else 
			return
	},

	render: function() {
		// console.log("PROPS => ", this.props)
		return (
			<LikesWrapper>
				<div className="likes-searchbar--wrapper">
					<Textbox id="likes--search-textbox" actionString="UPDATE_LIKES_SEARCH_INPUT" actionParamName="input" />
				</div>
				<LikesArtworks SCinfo={ this.filterLikes(this.props.SCinfo) } userData={ this.props.userData } />
				
			</LikesWrapper>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Likes)







	// renderLikes: function() {
	// 	// console.log("RENDER LIKES")
		
	// 	var songs = this.props.SCinfo
	// 	// console.log('render liked songs => ', songs)

	// 	if (!songs)
	// 		return (<div>NO SONGS</div>)
	// 	else {
	// 		var compareFn = (a, b) => {
	// 			var dateA = new Date(a.dateUploaded)
	// 			var dateB = new Date(b.dateUploaded)

	// 			if (dateA > dateB) {
	// 				return 1
	// 			}
	// 			if (dateB > dateA) {
	// 				return -1
	// 			}
	// 				return 0
	// 		}

	// 		songs.sort(compareFn)
	// 		// console.log(songs)

	// 		var songList =  songs.map((song) => { 
	// 			var MASAS_songInfo = this.props.userData.likes.filter((like) => {
	// 				return like.song.SC_ID === song.id
	// 			})

	// 			if(MASAS_songInfo.length === 1)
	// 				return <LikesItem key={song.id} SCinfo={ song } MASASinfo={MASAS_songInfo[0].song} />
	// 			else
	// 				return null
	// 		})

	// 		return songList
	// 	}
	// },

	// /**
	// 	** Purpose **
	// 	returns width of artwork and likes wrapper before component render

	// 	** returns **
	// 	{ artworkWidth: int, likesWrapperWidth: int }
	// 	units: px
	// */
	// getElementsWidth: function() {
	// 	// insert artwork wrapper in body to get its width
	// 	// for the artwork, we can just get the hardcoded width from css
	// 	var $artworkWrapper = $("<div class='likes-item--wrapper'><div class='artwork--wrapper'><img class='artwork'/></div></div>").hide().appendTo("body")
	// 	const artworkInnerWidth = $artworkWrapper.css("width").replace('px', '')
	// 	const artworkMargin = window.getComputedStyle(document.getElementsByClassName('likes-item--wrapper')[0]).margin.replace('px', '')
	// 	const artworkWidth = parseInt(artworkInnerWidth)  + 2*parseInt(artworkMargin)

	// 	// same for likes wrapper
	// 	// but now we have to get the getComputedStyle() because width is dynamically defined based on window width
	// 	var $likesWrapper = $("<div class='likes-scroll--wrapper'><div class='likes--wrapper'></div></div>").hide().appendTo("body")
	// 	const likesWrapperWidth = window.getComputedStyle(document.getElementsByClassName('likes--wrapper')[0]).width.replace('px', '')

	// 	// remove dummy elements now that we have their width
	// 	$artworkWrapper.remove()
	// 	$likesWrapper.remove()

	// 	return { artworkWidth, likesWrapperWidth }
	// },

	// /**
	// 	** goal **
	// 	calculates how many are missing on the last line to align all artworks left

	// 	** output **
	// 	jsx elements
	// */
	// alignArtworksLeft: function() {
	// 	const { artworkWidth, likesWrapperWidth } = this.getElementsWidth()
	// 	// console.log("FUNCTION RETURN ======> ", this.getElementsWidth())
	// 	// console.log('ARTWORK WIDTH ===== ', artworkWidth)
	// 	// console.log('LIKES WRAPPER WIDTH ===== ', likesWrapperWidth)

	// 	const A = likesWrapperWidth
	// 	const B = artworkWidth
	// 	let artworkCount = 0
	// 	if(this.props.SCinfo)
	// 		artworkCount = this.props.SCinfo.length		// artwork count

	// 	// calculate how many artworks fit in a line
	// 	const n_line = Math.floor(A/B)

	// 	// calculate how many artworks are on the last line
	// 	const n_lastLine = artworkCount % n_line

	// 	// return the missing artworks to align the last line to the left if need be
	// 	let divArray = []
	// 	for(let i = 0; i < n_lastLine; i++) {
	// 		divArray.push(<div key={ i } className="filler-artwork" style={{ height: 0, width: artworkWidth }}></div>)
	// 	}

	// 	// console.log("DIV ARRAY ======> ", divArray)

	// 	return divArray
	// },
