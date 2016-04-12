var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/FooterModals.jsx")

var { getTimeIntervalFromURL } = require("../../MASAS_functions.jsx")
var { TimePicker, Button } = require("../UI/UI.jsx")

// var Template = (props) => {

// }

var FooterModal = React.createClass({
	propTypes: {
		isSpamModal: React.PropTypes.bool,				// is spam modal content
		isCopyrightModal: React.PropTypes.bool,			// is report copyright modal content
		isSuggestTimeModal: React.PropTypes.bool, 			// is suggest another time modal content
	},

	// keeping props in state so that song info doesn't change when player changes song
	getInitialState: function() {
		return {
			MASAS_songInfo: this.props.MASAS_songInfo,
			SC_songInfo: this.props.SC_songInfo,
		}
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
					<img src="/static/img/MASAS_icon_spam.svg" alt="icon" />
					<Button
						isSecondaryAction={ false }
						isBigButton={ false }
						onClick={ () => {} }
						isDisabled={ false }>
						yes
					</Button>
				</div>
				)

		if(isCopyrightModal)
			return (
				<div className="footer-modal-content">
					<h2>
						do you really want to report this sound as copyright infringement?
					</h2>
					<img src="/static/img/MASAS_icon_copyright.svg" alt="icon" />
					<Button
						isSecondaryAction={ false }
						isBigButton={ false }
						onClick={ this.props.reportCopyright }
						isDisabled={ false }>
						yes
					</Button>
				</div>
				)

		if(isSuggestTimeModal) {
			const initialTime = getTimeIntervalFromURL(this.state.MASAS_songInfo.timeInterval)

			// var { initialDiscover, currentDiscover } = this.props.
			return (
				<div className="footer-modal-content">
					<h2>
						when would you most likely listen to this sound?
					</h2>
					<div className="suggest-time-modal--wrapper">
						<TimePicker
							wrapperClassName="suggest-time-modal--wrapper"
							canvasId="suggest-time-modal-timePicker-canvas-id"
							initialDiscover={ initialTime }
							currentDiscover={ this.props.suggestNewTimeValue }
							onSliderChange={ this.props.updateTimeSuggestion } />
					</div>
					<Button
						isSecondaryAction={ this.props.initialDiscover === this.props.currentDiscover ? false : false }
						isBigButton={ false }
						onClick={ () => {} }
						isDisabled={ this.props.initialDiscover === this.props.currentDiscover ? true : false }>
						Submit
					</Button>
				</div>
				)
		}
		else
			return <div></div>
	},

	render: function() {
		console.log("this.state => ", this.state)
		return (
			<div className="footer-modal--wrapper">
				<div className="song-info--wrapper">
					<div className="artwork">
						<img src={ this.state.SC_songInfo.artwork_url } alt="artwork" />
					</div>
					<div className="song-title">
						{ this.state.SC_songInfo.title }
					</div>
				</div>
				{ this.getModalContent() }
				<div className="cancel-button" onClick={ this.props.toogleIsModalOpened }>Cancel</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(FooterModal)