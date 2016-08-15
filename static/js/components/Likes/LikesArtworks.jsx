var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
// var { mapStateToProps, mapDispatchToProps } = require("./containers/LikesArtworks.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
// var { Link } = require("../UI/UI.jsx")

var LikesItem = require("./LikesItem.jsx")

var LikesArtworks = React.createClass({
	propTypes: {
		SCinfo: React.PropTypes.array,
		userData: React.PropTypes.object,		
	},

	componentWillMount: function() {
	},

	renderLikes: function() {
		// console.log("RENDER LIKES")
		
		var songs = this.props.SCinfo
		// console.log('render liked songs => ', songs)

		if (!songs)
			return (<div>NO SONGS</div>)
		else {
			// // sort by uploaded time
			// songs.sort((a,b) => { return Date.parse(a.created) < Date.parse(b.created) })

			var songList =  songs.map((song) => { 
				var MASAS_songInfo = this.props.userData.likes.filter((like) => {
					return like.song.SC_ID === song.id
				})

				if(MASAS_songInfo.length === 1)
					return <LikesItem key={song.id} SCinfo={ song } MASASinfo={MASAS_songInfo[0].song} />
				else
					return null
			})

			return songList
		}
	},

	/**
		** Purpose **
		returns width of artwork and likes wrapper before component render

		** returns **
		{ artworkWidth: int, likesWrapperWidth: int }
		units: px
	*/
	getElementsWidth: function() {
		// insert artwork wrapper in body to get its width
		// for the artwork, we can just get the hardcoded width from css
		var $artworkWrapper = $("<div class='likes-item--wrapper'><div class='artwork--wrapper'><img class='artwork'/></div></div>").hide().appendTo("body")
		const artworkInnerWidth = $artworkWrapper.css("width").replace('px', '')
		const artworkMargin = window.getComputedStyle(document.getElementsByClassName('likes-item--wrapper')[0]).margin.replace('px', '')
		const artworkWidth = parseInt(artworkInnerWidth)  + 2*parseInt(artworkMargin)

		// same for likes wrapper
		// but now we have to get the getComputedStyle() because width is dynamically defined based on window width
		var $likesWrapper = $("<div class='likes-scroll--wrapper'><div class='likes--wrapper'></div></div>").hide().appendTo("body")
		const likesWrapperWidth = window.getComputedStyle(document.getElementsByClassName('likes--wrapper')[0]).width.replace('px', '')

		// remove dummy elements now that we have their width
		$artworkWrapper.remove()
		$likesWrapper.remove()

		return { artworkWidth, likesWrapperWidth }
	},

	/**
		** goal **
		calculates how many are missing on the last line to align all artworks left

		** output **
		jsx elements
	*/
	alignArtworksLeft: function() {
		const { artworkWidth, likesWrapperWidth } = this.getElementsWidth()
		// console.log("FUNCTION RETURN ======> ", this.getElementsWidth())
		// console.log('ARTWORK WIDTH ===== ', artworkWidth)
		// console.log('LIKES WRAPPER WIDTH ===== ', likesWrapperWidth)

		const A = likesWrapperWidth
		const B = artworkWidth
		let artworkCount = 0
		if(this.props.SCinfo)
			artworkCount = this.props.SCinfo.length		// artwork count

		// calculate how many artworks fit in a line
		const n_line = Math.floor(A/B)

		// calculate how many artworks are on the last line
		const n_lastLine = artworkCount % n_line

		// return the missing artworks to align the last line to the left if need be
		let divArray = []
		for(let i = 0; i < n_lastLine; i++) {
			divArray.push(<div key={ i } className="filler-artwork" style={{ height: 0, width: artworkWidth }}></div>)
		}

		// console.log("DIV ARRAY ======> ", divArray)

		return divArray
	},

	render: function() {
		return (
			<div className="likes--wrapper">
				{ this.renderLikes() }
				{ this.alignArtworksLeft() }
			</div>
		)
	}
})

module.exports = LikesArtworks