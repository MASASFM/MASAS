var React = require("react")
var ReactDOM = require("react-dom")

// var {goToURL} = require("../../../MASAS_functions.jsx")
// var {getCookie} = require("../../../MASAS_functions.jsx")
// var { Link } = require("../../containers/UI/UI.jsx")

// var Marquee = (props) => {
// 	<div className="title MASAS_marquee">
// 		<span>{ artworkPlaying.title }</span>
// 	</div>
// }

let Marquee = React.createClass({
	propTypes: {
	},

	getInitialState: function() {
		return {
			overflow: false,			// (BOOL) is text overflowing
			// refresh: false			// (BOOL) triggers a refresh necessary to recalc overflow
		}
	},

	componentDidMount: function() {
		this.checkTextOverflow()
	},

	componentDidUpdate: function(nextProps) {
		this.checkTextOverflow()
	},

	checkTextOverflow: function() {
		const element = this.refs.wrapper

		if (element.offsetWidth < element.scrollWidth) {
			console.log('overflow')
			if(!this.state.overflow)
				this.setState({ overflow: true })
		} else {
			console.log('no overflow')
			if(this.state.overflow)
				this.setState({ overflow: false })
		}
	},

	render: function() {
		console.log(this.props.children)
		return (
			<div className={ (this.props.className ? this.props.className : "") + " MASAS_marquee"} ref="wrapper">
				<span className={ this.state.overflow ? "text" : "" }>{ this.props.children }</span>
			</div>
		)
	}
})

module.exports = Marquee