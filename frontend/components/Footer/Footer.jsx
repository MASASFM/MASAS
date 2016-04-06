var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Footer.jsx")

var Radium = require("radium")

var Player = require("../Player/PlayerBar.jsx")
var { getCookie } = require("../../MASAS_functions.jsx")

var Footer = React.createClass({

	componentWillMount: function() {
		// init progress bar width
		var progressBarWidth = 0

		// init interval for progress bar width
		this.interval = setInterval( () => {
			// if player is playing
			if(typeof($("#jquery_jplayer_1").data('jPlayer')) !== "undefined" && !this.props.isPlayerPaused) {
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

	componentWillUnmount: function() {
		clearInterval(this.interval)
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

	toogleMenu: function() {
		if(!this.props.isModalOpened)
			this.props.toogleIsOpened()
	},

	render: function() {
		return (
			<div className="footer--wrapper">
				<div className={ "slider--wrapper " + (this.props.isPlayerBarOpened ? "opened" : "") }>
					<div className="visible--wrapper">
						<div className="playerProgressBar--wrapper">
							<div className="playerProgressBar" style={{width: this.props.progressBarWidth + '%' }}>
							</div>
							<div className="bufferingBar--wrapper">
								<div className={ "bufferingBar" + (this.props.isBuffering && this.props.playerAtTime ? " buffering" : "")}>
								</div>
							</div>
						</div>
						<div className="row no-margin"  style={{height: '100%'}}>
							<div className="col-md-2 col-display-none-sm buffer-info">
								<div className="box">
									<div className="">
										{this.props.isBuffering ? " Buffering..." : ""}
									</div>
								</div>
							</div>
							<div className="col-xs-10 col-md-8 player--wrapper">
								<Player />
							</div>
							<div className="col-xs-2 col-md-2 col-display-none-sm extra-controls--wrapper">
								<div className="box nextSong--wrapper">
									<img onClick={this.playRandomSong} src="/static/img/MASAS_next.svg" alt="next song" className="next-icon" />
								</div>
								<div 
									className={ "toogle-open-tray-icon " + (this.props.isPlayerBarOpened ? "opened" : "") } 
									onClick={  this.toogleMenu } >
								</div>
							</div>
						</div>
					</div>
					<div className="hidden--wrapper">
						<div className="col-md-2 col-display-none-sm">
							<div className="box">
								
							</div>
						</div>
						<div className="dislike-choices--wrapper">
							<span className="copyright">Report as Copyright Infringment</span>
							<hr />
							<span className="spam">Report as SPAM</span>
							<hr />
							<span className="suggest-time">Suggest another time</span>
							<hr />
							<span className="no-like">I don't like it</span>
						</div>
						<div className="col-md-2 col-display-none-sm">
							<div className="box">
								
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Footer)