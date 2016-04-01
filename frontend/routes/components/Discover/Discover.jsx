var React = require("react")
var ReactDOM = require("react-dom")

// var {goToURL} = require("../../../MASAS_functions.jsx")
// var {getCookie} = require("../../../MASAS_functions.jsx")
var { TimePicker } = require("../../containers/UI/UI.jsx")

// var Template = (props) => {

// }

var ArtworkLine = React.createClass({
 // = (props) => {
 	render: function() {
 		console.log('ARTWORK LINE=>', this.props.history)
		let history = this.props.history.all.filter( ({MASAS_songInfo}) => {
			console.log('BLABLA=>', MASAS_songInfo.timeInterval.substr(MASAS_songInfo.timeInterval.length - 2, 1))
			console.log('BLABLA2=>', MASAS_songInfo.timeInterval.substr(MASAS_songInfo.timeInterval.length - 2, 1) === this.props.discoverNumber)
			console.log('BLABLA3=>', MASAS_songInfo.timeInterval.substr(MASAS_songInfo.timeInterval.length - 2, 1) == this.props.discoverNumber)
			console.log('BLABLA4=>', typeof(MASAS_songInfo.timeInterval.substr(MASAS_songInfo.timeInterval.length - 2, 1)))
			console.log('BLABLA45>', typeof(this.props.discoverNumber))
			return MASAS_songInfo.timeInterval.substr(MASAS_songInfo.timeInterval.length - 2, 1) === this.props.discoverNumber
		})

		console.log('DISCOVER #=>', this.props.discoverNumber)
		console.log('HISTORY=>', history)

		if(history.length === 0)
			return (
				<div className="play-discover--wrapper">
					<h1 >Click here to play from discover</h1>
				</div>
				)
		else {
			// artwork line (song history)
			let artworkLine =  history.map( ({ SC_songInfo }) => {
				let artworkURL = ""
				if(SC_songInfo.artwork_url !== null) {
				 	artworkURL = SC_songInfo.artwork_url.substring(0,SC_songInfo.artwork_url.lastIndexOf("-"))+"-t300x300.jpg"
				 }
				return (
					<div className="artwork--wrapper" key={SC_songInfo.id}>
						<img src={ artworkURL } alt="artwork" className="artwork"/>
						<div className="song-info--wrapper">
							{ SC_songInfo.id }
						</div>
					</div>
					)
			})
			console.log("artworkline => ", artworkLine)
			artworkLine.pop()
			console.log("artworkline => ", artworkLine)

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
					<div className="artwork-playing">	
						<img src={ artworkPlayingURL } alt="song playing" />
					</div>
					<div className="right-side">
					</div>
				</div>
				)
		}
	}
})

ArtworkLine.propTypes = {
	history: React.PropTypes.object.isRequired,
	discoverNumber: React.PropTypes.number.isRequired
}


var Discover = React.createClass({
	propTypes: {
	},

	componentWillMount: function() {
		this.props.updateTitle('Discover', '0')		// 0 = menu icon; 1 = arrow back
	},

	componentWillReceiveProps: function(nextProps) {
		console.log("props =>", this.props.history)
		console.log("nextProps =>", nextProps.history)
	},

	render: function() {
		console.log('RENDER DISCOVER')
		return (
			<div className="discover--wrapper">
				<div className="multi-page--wrapper">
					<div className={ this.props.discoverNumber === 1 ? "page1" : "page2" }>
						<h1>#EarlyMorning</h1>
						<ArtworkLine  history={ this.props.history } discoverNumber="1" />
					</div>
					<div className={ this.props.discoverNumber === 2 ? "page1" : "page2" }>
						<h1>#LateMorning</h1>
						<ArtworkLine  history={ this.props.history } discoverNumber="2" />
					</div>
					<div className={ this.props.discoverNumber === 3 ? "page1" : "page2" }>
						<h1>#EarlyAfternoon</h1>
						<ArtworkLine  history={ this.props.history } discoverNumber="3" />
					</div>
					<div className={ this.props.discoverNumber === 4 ? "page1" : "page2" }>
						<h1>#LateAfternoon</h1>
						<ArtworkLine  history={ this.props.history } discoverNumber="4" />
					</div>
					<div className={ this.props.discoverNumber === 5 ? "page1" : "page2" }>
						<h1>#EarlyEvening</h1>
						<ArtworkLine  history={ this.props.history } discoverNumber="5" />
					</div>
					<div className={ this.props.discoverNumber === 6 ? "page1" : "page2" }>
						<h1>#LateAfternoon</h1>
						<ArtworkLine  history={ this.props.history } discoverNumber="6" />
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