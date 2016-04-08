var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/FooterModals.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
var { TimePicker } = require("../UI/UI.jsx")

// var Template = (props) => {

// }

var FooterModal = React.createClass({
	propTypes: {
		isSpamModal: React.PropTypes.bool,				// is spam modal content
		isCopyrightModal: React.PropTypes.bool,			// is report copyright modal content
		isSuggestTimeModal: React.PropTypes.bool, 			// is suggest another time modal content
	},

	componentWillMount: function() {
	},

	getModalContent: function() {
		const { isSpamModal, isCopyrightModal, isSuggestTimeModal } = this.props

		if(isSpamModal)
			return (
				<div className="footer-modal-content">
					<h2>
						do you really want to report this sound as spam?
					</h2>
				</div>
				)

		if(isCopyrightModal)
			return (
				<div className="footer-modal-content">
					<h2>
						do you really want to report this sound as copyright infringement?
					</h2>
				</div>
				)

		if(isSuggestTimeModal)
			return (
				<div className="footer-modal-content">
					<h2>
						when would you most likely listen to this sound?
					</h2>
					<div className="suggest-time-modal--wrapper">
						<TimePicker
							wrapperClassName="suggest-time-modal--wrapper"
							canvasId="suggest-time-modal-timePicker-canvas-id"
							initialDiscover={ 3 }
							pickTimeUpload={ 2 }
							onSliderChange={ () => { console.log("YAY") } } />
					</div>
				</div>
				)
		else
			return <div></div>
	},

	render: function() {
		return (
			<div className="footer-modal--wrapper">
				<div className="song-info--wrapper">
					<div className="artwork">
						<img src={ this.props.SC_songInfo.artwork_url } alt="artwork" />
					</div>
					<div className="song-title">
						{ this.props.SC_songInfo.title }
					</div>
				</div>
				{ this.getModalContent() }
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(FooterModal)