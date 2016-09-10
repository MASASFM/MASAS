var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/TeachUploadModals.jsx")

var { updateProfileInfo } = require("../../MASAS_functions.jsx")
var { Button, TimePicker } = require("../UI/UI.jsx")

var TeachUploadModals = {}

TeachUploadModals.TeachUploadModal1 = ReactRedux.connect(
		mapStateToProps,
		mapDispatchToProps
	)(React.createClass({
		propTypes: {
			MASASuser: React.PropTypes.string,
			userData: React.PropTypes.object,
			pickTimeUpload: React.PropTypes.number,
			tipTimePickerValue: React.PropTypes.number,

			toogleIsModalOpened: React.PropTypes.func,
			handleTimePickerChange: React.PropTypes.func,
			closeModal: React.PropTypes.func,
			updateTipTimePickerValue: React.PropTypes.func,
		},

		componentWillMount: function() {
			this.sliderInitValue = this.props.tipTimePickerValue
			this.hasMovedSlider = false
		},

		updateUserStep: function() {
			var header = "Bearer " + this.props.MASASuser

			$.ajax({
				type: 'POST',
				url: '/api/usersteps/',
				headers: {
					"Authorization": header,
				},
				data: {
					user: this.props.userData.url,
					step: 5,
				},
				success: () => updateProfileInfo(this.props.toogleIsModalOpened),
				error: (e) => e,
			})
		},

		closeTip: function() {
			var header = "Bearer " + this.props.MASASuser

			$.ajax({
				type: 'POST',
				url: '/api/usersteps/',
				headers: {
					"Authorization": header,
				},
				data: {
					user: this.props.userData.url,
					step: 5,
				},
				success: () => {
					updateProfileInfo(this.props.closeModal)
				},
				error: () => {},
			})
		},

		render: function() {
			if(!this.hasMovedSlider && this.props.tipTimePickerValue !== this.sliderInitValue)
				this.hasMovedSlider = true

			return (
				<div className="teach-modal--wrapper">
					<p className="bold">
						To upload this song,
					</p>
					<p>
						Drag the sun around the arc to select a category for your song to be discoverable from.
					</p>
					<div style={{ marginBottom: '2rem' }}>
						<TimePicker 
							onSliderChange={ this.props.updateTipTimePickerValue }
							initialDiscover={ this.props.tipTimePickerValue } 
							currentDiscover={ this.props.tipTimePickerValue }
							wrapperClassName="teach-modal-pickTime--wrapper"
							canvasId="teach-modal-pickTime--canvas" 
							showHashtag={ true } />
					</div>
					<Button 
						isDisabled={ !this.hasMovedSlider }
						isBigButton={ false }
						onClick={ this.closeTip }>
							{ !this.hasMovedSlider ?
								"Move the sun to close this tip"
								:
								"Close tip"
							}
						</Button>

				</div>
			)
		}
	})
)


module.exports = TeachUploadModals