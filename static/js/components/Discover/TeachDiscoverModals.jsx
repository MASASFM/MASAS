var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/TeachDiscoverModals.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
var { Button } = require("../UI/UI.jsx")

var TeachDiscoverModals = {}

TeachDiscoverModals.TeachDiscoverModal1 = ReactRedux.connect(
		mapStateToProps,
		mapDispatchToProps
	)(React.createClass({
		propTypes: {
		},

		componentWillMount: function() {
		},

		render: function() {
			return (
				<div className="teach-modal--wrapper">
					<p>
						Discover music in other moods through the time of the day with the slider
					</p>
					<Button onClick={ () => {} }>Yeah!</Button>

				</div>
			)
		}
	})
)


TeachDiscoverModals.TeachDiscoverModal2 = ReactRedux.connect(
		mapStateToProps,
		mapDispatchToProps
	)(React.createClass({
		propTypes: {
		},

		componentWillMount: function() {
		},

		render: function() {
			return (
				<div className="teach-modal--wrapper">
					BAR
				</div>
			)
		}
	})
)

module.exports = TeachDiscoverModals