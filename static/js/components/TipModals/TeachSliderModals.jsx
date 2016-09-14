var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/TeachSliderModals.jsx")

var { updateProfileInfo } = require("../../MASAS_functions.jsx")
var { Button, TimePicker } = require("../UI/UI.jsx")

var TeachSliderModals = {  }

TeachSliderModals.TeachSliderModal1 = ReactRedux.connect(
		mapStateToProps,
		mapDispatchToProps
	)(React.createClass({
		propTypes: {
			title: React.PropTypes.string,
			paragraph: React.PropTypes.string,
			requireSunDrag: React.PropTypes.bool,

			// redux
			MASASuser: React.PropTypes.string,
			userData: React.PropTypes.object,
			pickTimeUpload: React.PropTypes.number,
			tipTimePickerValue: React.PropTypes.number,

			toogleIsModalOpened: React.PropTypes.func,
			handleTimePickerChange: React.PropTypes.func,
			closeModal: React.PropTypes.func,
			updateTipTimePickerValue: React.PropTypes.func,
		},

		getDefaultProps: function() {
			return {
				title: "To upload this song,",
				paragraph: "Drag the sun around the arc to select a category for your song to be discoverable from.",
				requireSunDrag: true,
			}
		},

		getInitialState: function() {
			return {
				paragraph: this.props.paragraph,
				title: this.props.title,
			}
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
			if(this.hasMovedSlider) {
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
			} else {
				this.setState({ paragraph: "Drag the sun around to close this tip!", title: "" })
			}
		},

		render: function() {
			if(!this.hasMovedSlider && this.props.tipTimePickerValue !== this.sliderInitValue)
				this.hasMovedSlider = true

			return (
				<div className="teach-modal--wrapper">
					<p className="title">
						{ this.state.title }
					</p>
					<p className="paragraph" style={{ fontFamily: this.state.title === "" ? "Lato-Semibold" : "Lato-Light" }}>
						{ this.state.paragraph }
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
						isBigButton={ false }
						onClick={ this.closeTip }>
							Close tip
						</Button>

				</div>
			)
		}
	})
)


module.exports = TeachSliderModals