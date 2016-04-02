var React = require("react")
var ReactDOM = require("react-dom")

let Marquee = React.createClass({
	propTypes: {
	},

	getInitialState: function() {
		return {
			overflow: false,			// (BOOL) is text overflowing
		}
	},

	componentDidMount: function() {
		// recompute animationDelay if need be on window resize
		$(window).resize( () => {
			this.checkTextOverflow()
		})

		// check if overflow and compute animationDelay if need be
		this.checkTextOverflow()
	},

	// called after state change induced render
	componentDidUpdate: function() {
		this.checkTextOverflow()
	},

	componentWillReceiveProps: function(nextProps) {

	},

	// update state if overflow
	checkTextOverflow: function() {
		const element = this.refs.wrapper

		if (element.offsetWidth < element.scrollWidth) {
			console.log('overflow')
			if(!this.state.overflow) {
				this.setState({ overflow: true })
			}
		} else {
			console.log('no overflow')
			if(this.state.overflow)
				this.setState({ overflow: false })
		}
	},

	render: function() {
		// compute animationDelay on render
		let animationDelay = null

		if(typeof(this.refs.wrapper) !== "undefined") {
			const a = this.refs.wrapper.offsetWidth
			const b = this.refs.text.offsetWidth
			animationDelay = -a / (a+b) * 10 + 's'
		}

		return (
			<div className={ (this.props.className ? this.props.className : "") + " MASAS_marquee"} ref="wrapper">
				<span ref="text" style={{ animationDelay: (animationDelay ? animationDelay : '0s') }} className={ this.state.overflow ? "text" : "" }>{ this.props.children }</span>
			</div>
		)
	}
})

module.exports = Marquee