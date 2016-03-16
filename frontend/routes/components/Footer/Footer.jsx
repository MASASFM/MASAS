var React = require("react")
var ReactDOM = require("react-dom")
var Radium = require("radium")

var Player = require("../../containers/Player/PlayerBar.jsx")
var { getCookie } = require("../../../MASAS_functions.jsx")

var Footer = React.createClass({

	componentWillMount: function() {
		// init progress bar width
		var progressBarWidth = 0

		// init interval for progress bar width
		setInterval( () => {
			// if player is playing
			if(typeof($("#jquery_jplayer_1").data('jPlayer'))!=="undefined") {
				// update progress bar length
				progressBarWidth = $("#jquery_jplayer_1").data('jPlayer').status.currentTime*1000*100 / this.props.SC_songInfo.duration
				this.props.updateProgressBar(progressBarWidth)
			} else {
				// verify that progress bar isn't already 0
				if(this.props.progressBarWidth !== 0)
					this.props.updateProgressBar(0)	// reset progress bar
			}
		}, 250)
	},

	playRandomSong: function () {
		var csrftoken = getCookie('csrftoken')
		var header = "Bearer " + this.props.MASASuser

		$.ajax({
			type: "POST",
			url: '/api/play/',	
			headers: {
				"Authorization": header,
				"X-CSRFToken": csrftoken
			},
			data: {},
			success: (data) => {
				console.log(data)
				this.props.playRandomSong(data.url)
				// this.props.closeWindow()
			},
			error: (err) => {
				console.log(err)
			},
		})
	},

	render: function() {
		return (
			<div className="footer--wrapper">
				<div className="playerProgressBar--wrapper">
					<div className="playerProgressBar" style={{width: this.props.progressBarWidth + '%' }}>
					</div>
				</div>
				<div className="row no-margin"  style={{height: '100%'}}>
					<div className="col-md-2 col-display-none-sm">
						<div className="box"></div>
					</div>
					<div className="col-xs-10 col-md-8 player--wrapper">
						<Player />
					</div>
					<div className="col-xs-2 col-md-2 col-display-none-sm nextSong--wrapper1">
						<div className="box nextSong--wrapper2">
							<img onClick={this.playRandomSong} src="/static/img/MASAS_next.svg" alt="next song" className="next-icon" />
						</div>
					</div>
				</div>
				
			</div>
		)
	}
})

module.exports = Footer