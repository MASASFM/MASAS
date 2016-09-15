var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/PickTimeUpload.jsx")

var { Button, Link, TimePicker } = require("../UI/UI.jsx")
var { getCookie, updateProfileInfo } = require("../../MASAS_functions.jsx")

var ModalContent = require("./ModalContent.jsx")


var PickTimeUpload = React.createClass({
	propTypes: {
		// NONE REDUX
		visible: React.PropTypes.bool,				// is cancel button visible
		checkUserStep: React.PropTypes.func,		// check user step and show tip modal if necessary 
		track: React.PropTypes.object,			// array containing track information

		// REDUX
		MASASuser: React.PropTypes.string,
		pickTimeUpload: React.PropTypes.number,

		updateTitle: React.PropTypes.func,
		emitNotification: React.PropTypes.func,
		toogleModal: React.PropTypes.func,
		closeWindow: React.PropTypes.func,
		updateModalContent: React.PropTypes.func,
		handleTimePickerChange: React.PropTypes.func,
	},

	componentWillMount: function() {
		this.props.updateTitle('Upload', 1)		// 0 = menu icon; 1 = arrow back

		if(!$("#body--background").hasClass('blurred'))
			$("#body--background").addClass('blurred')

		this.props.checkUserStep()
	},

	submitSong: function() {

		var csrftoken = getCookie('csrftoken')
		var header = "Bearer " + this.props.MASASuser
		$.ajax({
			type: "POST",
			url: 'api/songs/',	
			headers: {
				"Authorization": header,
				"X-CSRFToken": csrftoken
			},
			data: {
				trackTitle: this.props.track.title,
				trackDuration: this.props.track.duration,
				SC_ID: this.props.track.id,
				timeInterval: "http://localhost:8000/api/time-intervals/" + this.props.pickTimeUpload + "/"
			},
			success: () => {
				this.props.emitNotification('song synced ;)')

				// UPDATE USER INFO
				updateProfileInfo()

				// CLOSE MODAL 
				this.props.toogleModal()

				// CLOSE CHOOSING TIME
				this.props.closeWindow()

			},
			error: (err) => {
				// CLOSE MODAL 
				this.props.toogleModal()

				// EMIT NOTIFICATION
				this.props.emitNotification(err.responseJSON.detail)
			},
		})
	},

	componentWillUnmount: function() {
		$("#body--background").removeClass('blurred')
	},


	openModal: function() {
		// USE THIS LIFECYCLE FUNCTION TO UPDATE MODAL CONTENT
		var that = this
		this.props.updateModalContent(
			<ModalContent onSubmit={ that.submitSong }/>
			)
		this.props.toogleModal()
	},

	render: function() {

		return (
			<div className="pick-time-sc-sync">
				<div className="song-name--wrapper">
					{ 
						this.props.track.artwork_url ?
							<img src={this.props.track.artwork_url} alt="song artwork" className="artwork" />
						:
							<div className="artwork"></div>
					}

					<h2 className="song-title">{this.props.track.title}</h2>
				</div>
				<h3 className="question-text">
					when would you most likely listen to your sound?
				</h3>
				<div className="pickTime--wrapper">
					<div className="canvas">
						<TimePicker 
							initialDiscover={ 2 }
							currentDiscover={ this.props.pickTimeUpload } 
							onSliderChange={ this.props.handleTimePickerChange } 
							wrapperClassName="timePicker--pick-time-upload--wrapper"
							canvasId="timePicker--pick-time-upload--id" />
					</div>
				</div>
				<div className="button--wrapper">
					<Button className="submit" small={true} white={true} onClick={this.openModal}>Submit</Button>
					<Link 
						to="/upload" 
						className="cancel-button" 
						onClick={this.props.closeWindow}>
						<span style={{
							visibility: this.props.visible ? 'visible' : 'hidden'
						}}>cancel</span>
					</Link>
				</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(PickTimeUpload)