var React = require("react")
var ReactDOM = require("react-dom")

// var {goToURL} = require("../../../MASAS_functions.jsx")
var { Button, Checkbox } = require("../../containers/UI/UI.jsx")
var { getCookie } = require("../../../MASAS_functions.jsx")
var TimePicker = require("./TimePicker.jsx")


var PickTimeUpload = React.createClass({
	propTypes: {
	},

	componentWillMount: function() {
		this.props.updateTitle('Upload', 1)		// 0 = menu icon; 1 = arrow back

		if(!$("#body--background").hasClass('blurred'))
			$("#body--background").addClass('blurred')
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
			success: (data) => {
				console.log(data)
				this.props.emitNotification('song synced ;)')
				this.props.closeWindow()

			},
			error: (err) => {
				console.log(err)
				this.props.emitNotification(err.responseJSON.SC_ID[0])
			},
		})
	},

	componentWillUnmount: function() {
		$("#body--background").removeClass('blurred')
	},

	render: function() {

		return (
			<div className="pick-time-sc-sync">
				{ 
					this.props.track.artwork_url ?
						<img src={this.props.track.artwork_url} alt="song artwork" className="artwork" />
					:
						<div className="artwork"></div>
				}

				<h2 className="song-title">{this.props.track.title}</h2>
				<div className="pickTime--wrapper">
					<div className="canvas">
						<TimePicker pickTimeUpload={this.props.pickTimeUpload} onChange={this.props.handleTimePickerChange} />
					</div>
				</div>
				<h3 className="question-text">
					when would you most likely listen to your sound?
				</h3>
				<div className="button--wrapper">
					<Button className="submit" small={true} white={true} onClick={this.submitSong}>Submit</Button>
					<Button className="cancel-button" noBorders={true} small={true} white={false} onClick={this.props.closeWindow}>cancel</Button>
				</div>
			</div>
		)
	}
})

module.exports = PickTimeUpload