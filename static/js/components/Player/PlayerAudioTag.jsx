// mounts audio tag into dom and initializes jPlayer

var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/PlayerAudioTag.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
// import { BlurBackground } from "../MASAS_mixins.jsx"
// var { Link } = require("../UI/UI.jsx")

// var Template = (props) => {

// }

var PlayerAudioTag = React.createClass({
	propTypes: {
	},

	componentDidMount: function() {
		$("#jquery_jplayer_1").jPlayer({
			ready: function(	) {
				var streamURL = "http://www.xamuel.com/blank-mp3-files/point1sec.mp3"
				$(this).jPlayer("setMedia", {
					mp3: streamURL,
					oga: ""
				})

				var click = document.ontouchstart === undefined ? 'click' : 'touchstart'
				var kickoff = function () {
					$("#jquery_jplayer_1").jPlayer("play")
					document.documentElement.removeEventListener(click, kickoff, true)
				}
				document.documentElement.addEventListener(click, kickoff, true)
			},

			keyBindings: {
				play: {
					key: 32,
					fn: function(f) {
						if(f.status.paused) {
							f.play()
						} else {
							f.pause()
						}
					}
				}
			},
			swfPath: "http://jplayer.org/latest/dist/jplayer",
			supplied: "mp3, oga",
			wmode: "window",
			useStateClassSkin: true,
			autoBlur: false,
			smoothPlayBar: true,
			keyEnabled: true,
			remainingDuration: true,
			toggleDuration: true
		})
	},

	render: function() {
		return (
			<div id="jquery_jplayer_1">
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(PlayerAudioTag)