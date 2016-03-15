var React = require("react")
var ReactDOM = require("react-dom")
var Radium = require("radium")

var Player = require("../../containers/Player/PlayerBar.jsx")
var { getCookie } = require("../../../MASAS_functions.jsx")

var Footer = React.createClass({

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