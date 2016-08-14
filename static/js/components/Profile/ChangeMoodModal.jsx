var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/ChangeMoodModal.jsx")

var { getCookie, updateNotificationBar, updateProfileInfo } = require("../../MASAS_functions.jsx")
var { TimePicker, Button } = require("../UI/UI.jsx")

// var Template = (props) => {

// }

var ChangeMoodModal = React.createClass({
	propTypes: {
		MASAS_info: React.PropTypes.object,
		SC_info: React.PropTypes.object,
		toggleModal: React.PropTypes.func,
		moodValue: React.PropTypes.number,
		updateMoodValue: React.PropTypes.func,
	},

	componentWillMount: function() {
		
	},

	changeMood: function() {
		var header = "Bearer " + this.props.MASASuser
		var csrftoken = getCookie("csrftoken")

		$.ajax({
			type: 'PATCH',
			url: this.props.MASAS_info.url,
			headers: {
				"Authorization": header,
				"X-CSRFToken": csrftoken
			},
			data: {
				timeInterval: "http://localhost:8000/api/time-intervals/" + this.props.moodValue + "/",
			},
			success: (r) => {
				this.props.toggleModal()
				updateNotificationBar("Song updated")
				updateProfileInfo()
			},
			error: (e) => {
				updateNotificationBar("Error")
			}
		})
	},

	render: function() {
		return (
			<div className="profile-modal--wrapper">
				<div className="song-info--wrapper">
					<div className="artwork">
						{
							this.props.SC_info.artwork_url ?
								<img src={ this.props.SC_info.artwork_url } alt="artwork" />
							:
								""
						}
					</div>
					<div className="song-title">
						{ this.props.SC_info.title }
					</div>
				</div>
				<div className="profile-modal-content">
					<h2>
						Would you like to update which discover mood your sound will play on?
					</h2>
					<div className="suggest-time-modal--wrapper">
						<TimePicker
							wrapperClassName="suggest-time-modal--wrapper"
							canvasId="suggest-time-modal-timePicker-canvas-id"
							initialDiscover={ parseInt(this.props.MASAS_info.timeInterval.substr(this.props.MASAS_info.timeInterval.length - 2, 1)) }
							currentDiscover={ this.props.moodValue }
							onSliderChange={ this.props.updateMoodValue }
							showHashtag={ true } />
					</div>
					<Button
						isSecondaryAction={ false }
						isBigButton={ false }
						isDisabled={ false }
						onClick={ this.changeMood }>
						yes
					</Button>
				</div>
				<div className="cancel-button" onClick={ this.props.toggleModal }>Cancel</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(ChangeMoodModal)