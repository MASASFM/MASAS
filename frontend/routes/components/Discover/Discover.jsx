var React = require("react")
var ReactDOM = require("react-dom")

// var {goToURL} = require("../../../MASAS_functions.jsx")
// var {getCookie} = require("../../../MASAS_functions.jsx")
var { TimePicker, Marquee } = require("../../containers/UI/UI.jsx")

// var Template = (props) => {

// }

<<<<<<< HEAD
// var ArtworkLine = React.createClass({
var ArtworkLine = (props) => {
 	// render: function() {
		if(props.history.length === 0)
=======
var ArtworkLine = React.createClass({
 // = (props) => {
 	render: function() {
		let history = this.props.history.all.filter( ({MASAS_songInfo}) => {
			return MASAS_songInfo.timeInterval.substr(MASAS_songInfo.timeInterval.length - 2, 1) === this.props.discoverNumber
		})

		if(history.length === 0)
>>>>>>> 931d7a14fd22cf5b9c213dc01d1265805f9c4d98
			return (
				<div className="play-discover--wrapper">
					<h1 >Click here to play from discover</h1>
				</div>
				)
		else {
<<<<<<< HEAD
			// filter current Discover history
			let history = props.history.filter( ({ MASAS_songInfo }) => {
				var discoverNumber = parseInt(MASAS_songInfo.timeInterval.substr(MASAS_songInfo.timeInterval.length - 2, 1))
				return discoverNumber === props.discoverNumber
			})
			// artwork line (song history)
			const artworkLine =  history.map( ({ SC_songInfo }) => {
=======
			// artwork line (song history)
			let artworkLine =  history.map( ({ SC_songInfo }) => {
>>>>>>> 931d7a14fd22cf5b9c213dc01d1265805f9c4d98
				let artworkURL = ""
				if(SC_songInfo.artwork_url !== null) {
				 	artworkURL = SC_songInfo.artwork_url.substring(0,SC_songInfo.artwork_url.lastIndexOf("-"))+"-t300x300.jpg"
				 }
				return (
					<div className="artwork--wrapper" key={SC_songInfo.id}>
						<img src={ artworkURL } alt="artwork" className="artwork"/>
						<div className="song-info--wrapper">
							<Marquee className="title">{ SC_songInfo.title }</Marquee>
							<Marquee className="artist">{ SC_songInfo.user.username }</Marquee>
						</div>
					</div>
					)
			})
			artworkLine.pop()

			// bigger artwork in center
			const artworkPlaying = history.map( ({ SC_songInfo }) => SC_songInfo ).pop()

			// get bigger artwork
			let artworkPlayingURL = ""
			 if(typeof(artworkPlaying) !== "undefined") {
			 	artworkPlayingURL = artworkPlaying.artwork_url.substring(0,artworkPlaying.artwork_url.lastIndexOf("-"))+"-t300x300.jpg"
			 }
			return  (
				<div className="artwork-line--wrapper">
					<div className="left-side">
						<div className="artwork-line">
							{ artworkLine }
							<div className="empty-artwork" style={{ visibility: 'hidden' }}></div>
						</div>
					</div>
					<div className="artwork-playing--wrapper">	
						<div className="artwork-playing">	
							<img src={ artworkPlayingURL } alt="song playing" />
						</div>
						<div className="song-info--wrapper">
							<div className="like-icon" onClick={ this.props.toggleSongLike.bind(this, this.props.userToken, this.props.songPlaying) }>
								{
									this.props.isSongPlayingLiked ?
										<img src="/static/img/MASAS_liked.svg" alt="like" />
									:
										<img src="/static/img/MASAS_like_shadow.svg" alt="like" />
								}
							</div>
							<div className="song-info">
								<div className="title"><Marquee>{ artworkPlaying.title }</Marquee></div>
								<div className="artist"><Marquee>{ artworkPlaying.user.username }</Marquee></div>
							</div>
						</div>
					</div>
					<img className="next-button" src="/static/img/MASAS_next.svg" alt="next" />
					<div className="right-side">
					</div>
				</div>
				)
		}
	// }
}

ArtworkLine.propTypes = {
<<<<<<< HEAD
	history: React.PropTypes.array.isRequired,			// array containing all the songs played
	discoverNumber: React.PropTypes.array.number,		// show songs from discover #
=======
	history: React.PropTypes.object.isRequired,
	discoverNumber: React.PropTypes.string.isRequired
>>>>>>> 931d7a14fd22cf5b9c213dc01d1265805f9c4d98
}


var Discover = React.createClass({
	propTypes: {
	},

	componentWillMount: function() {
		this.props.updateTitle('Discover', '0')		// 0 = menu icon; 1 = arrow back
	},

	componentWillReceiveProps: function(nextProps) {
	},

	render: function() {
		return (
			<div className="discover--wrapper">
				<div className="multi-page--wrapper">
					<div className={ this.props.discoverNumber === 1 ? "page1" : "page2" }>
						<h1>#EarlyMorning</h1>
<<<<<<< HEAD
						<ArtworkLine  history={ this.props.history } discoverNumber={ 1 } />
					</div>
					<div className={ this.props.discoverNumber === 2 ? "page1" : "page2" }>
						<h1>#LateMorning</h1>
						<ArtworkLine  history={ this.props.history } discoverNumber={ 2 } />
					</div>
					<div className={ this.props.discoverNumber === 3 ? "page1" : "page2" }>
						<h1>#EarlyAfternoon</h1>
						<ArtworkLine  history={ this.props.history } discoverNumber={ 3 } />
					</div>
					<div className={ this.props.discoverNumber === 4 ? "page1" : "page2" }>
						<h1>#LateAfternoon</h1>
						<ArtworkLine  history={ this.props.history } discoverNumber={ 4 } />
					</div>
					<div className={ this.props.discoverNumber === 5 ? "page1" : "page2" }>
						<h1>#EarlyEvening</h1>
						<ArtworkLine  history={ this.props.history } discoverNumber={ 5 } />
					</div>
					<div className={ this.props.discoverNumber === 6 ? "page1" : "page2" }>
						<h1>#LateAfternoon</h1>
						<ArtworkLine  history={ this.props.history } discoverNumber={ 6 } />
=======
						<ArtworkLine 
							songPlaying={ this.props.songPlaying }
							userToken={ this.props.userToken }
							toggleSongLike={ this.props.toggleSongLike } 
							isSongPlayingLiked={ this.props.isSongPlayingLiked }
							history={ this.props.history }
							discoverNumber="1" />
					</div>
					<div className={ this.props.discoverNumber === 2 ? "page1" : "page2" }>
						<h1>#LateMorning</h1>
						<ArtworkLine 
							songPlaying={ this.props.songPlaying }
							userToken={ this.props.userToken }
							toggleSongLike={ this.props.toggleSongLike } 
							isSongPlayingLiked={ this.props.isSongPlayingLiked }
							history={ this.props.history }
							discoverNumber="2" />
					</div>
					<div className={ this.props.discoverNumber === 3 ? "page1" : "page2" }>
						<h1>#EarlyAfternoon</h1>
						<ArtworkLine
							songPlaying={ this.props.songPlaying }
							userToken={ this.props.userToken } 
							toggleSongLike={ this.props.toggleSongLike } 
							isSongPlayingLiked={ this.props.isSongPlayingLiked } 
							history={ this.props.history } 
							discoverNumber="3" />
					</div>
					<div className={ this.props.discoverNumber === 4 ? "page1" : "page2" }>
						<h1>#LateAfternoon</h1>
						<ArtworkLine
							songPlaying={ this.props.songPlaying }
							userToken={ this.props.userToken } 
							toggleSongLike={ this.props.toggleSongLike } 
							isSongPlayingLiked={ this.props.isSongPlayingLiked } 
							history={ this.props.history } 
							discoverNumber="4" />
					</div>
					<div className={ this.props.discoverNumber === 5 ? "page1" : "page2" }>
						<h1>#EarlyEvening</h1>
						<ArtworkLine  
							songPlaying={ this.props.songPlaying }
							userToken={ this.props.userToken }
							toggleSongLike={ this.props.toggleSongLike } 
							isSongPlayingLiked={ this.props.isSongPlayingLiked } 
							history={ this.props.history } 
							discoverNumber="5" />
					</div>
					<div className={ this.props.discoverNumber === 6 ? "page1" : "page2" }>
						<h1>#LateEvening</h1>
						<ArtworkLine 
							songPlaying={ this.props.songPlaying }
							userToken={ this.props.userToken } 
							toggleSongLike={ this.props.toggleSongLike } 
							isSongPlayingLiked={ this.props.isSongPlayingLiked } 
							history={ this.props.history } 
							discoverNumber="6" />
>>>>>>> 931d7a14fd22cf5b9c213dc01d1265805f9c4d98
					</div>
				</div>
				<div className="time-picker--wrapper">
					<TimePicker 
						canvasId="timePicker--canvas" 
						wrapperClassName="timePicker--wrapper" 
						onSliderChange={ this.props.handleTimePickerChange } 
						currentDiscover={ this.props.discoverNumber }/>
				</div>
			</div>
		)
	}
})

module.exports = Discover