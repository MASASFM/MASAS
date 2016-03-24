var React = require("react")
var ReactDOM = require("react-dom")

// var {goToURL} = require("../../../MASAS_functions.jsx")
var { Button, Checkbox } = require("../../containers/UI/UI.jsx")
var { getCookie } = require("../../../MASAS_functions.jsx")
var TimePicker = require("./TimePicker.jsx")

// var Template = (props) => {

// }

var PickTimeUpload = React.createClass({
	propTypes: {
	},

	componentWillMount: function() {
		this.props.updateTitle('Upload', '0')		// 0 = menu icon; 1 = arrow back
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
				this.props.closeWindow()
			},
			error: (err) => {
				console.log(err)
			},
		})
	},

	render: function() {
		return (
			<div className="pick-time-sc-sync">
				<img src={this.props.track.artwork_url} alt="song artwork" className="artwork" />
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
					<Button noBorders={true} onClick={this.props.closeWindow}>Cancel</Button>
				</div>
			</div>
		)
	}
});

module.exports = PickTimeUpload