var React = require("react")
var ReactDOM = require("react-dom")
var Radium = require("radium")

var Player = require("../../containers/Player/PlayerBar.jsx")

var Footer = React.createClass({
	render: function() {
		return (
			<div className="footer--wrapper">
				<Player />
			</div>
		)
	}
})

module.exports = Footer