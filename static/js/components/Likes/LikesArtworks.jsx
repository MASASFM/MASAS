var React = require("react")
// commented because we may need this line in the near future
// var { mapStateToProps, mapDispatchToProps } = require("./containers/LikesArtworks.jsx")

var { goToURL } = require("../../MASAS_functions.jsx")
var { Button } = require("../UI/UI.jsx")

var LikesItem = require("./LikesItem.jsx")

// DISPLAYS USER LIKES (propTypes)
// creates invisible artworks to keep the last line aligned left using flexbox
var LikesArtworks = React.createClass({
	propTypes: {
		SCinfo: React.PropTypes.array,
		userData: React.PropTypes.object,		
		userLikes: React.PropTypes.array,
	},

	componentWillMount: function() {
	},

	// show songs if user has any likes
	// otherwise, let him know he hasn't liked any songs yet
	renderLikes: function() {
		var songs = this.props.SCinfo

		if (!songs) {
			$('#body--background').removeClass('blurred-mobile')
			$('#body--background').addClass('blurred')

			return (
				<div className="no-like--wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', minHeight: '17rem'}}>
						<img src="/static/img/MASAS_no_likes.svg" alt="like icon" />
						<p style={{ fontSize: '1.2rem'}}>
							You haven't liked any sounds yet
						</p>
						<Button 
							isBigButton={ true } 
							isSecondaryAction={ false } 
							onClick={ () => { $('#body--background').removeClass('blurred'); goToURL('/discover') } }>
							Start discovering new music
						</Button>
					</div>
				</div>
			)
		} else {
			$('#body--background').removeClass('blurred')
			$('#body--background').addClass('blurred-mobile')
			// // sort by uploaded time

			const songs = this.props.userLikes
			var songList =  songs.map((song) => { 
					return <LikesItem 
							key={ song.MASAS_songInfo.pk } 
							MASAS_songPk={ song.MASAS_songInfo.pk } 
							SCinfo={ song.SC_songInfo } 
							MASASinfo={ song.MASAS_songInfo.song }
							isShowingArtistInfo={ song.showProfile } />
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