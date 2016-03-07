var React = require("react")
var ReactDOM = require("react-dom")

// var {goToURL} = require("../../../MASAS_functions.jsx")
var { Button, Checkbox } = require("../../containers/UI/UI.jsx")
var {getCookie} = require("../../../MASAS_functions.jsx")

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
				SC_ID: this.props.track.id
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
				<div className="checkbox--wrapper">
					<div className="column">
						<Checkbox>5-8AM</Checkbox>
						<Checkbox>5-8AM</Checkbox>
						<Checkbox>2-5PM</Checkbox>
					</div>
					<div className="column">
						<Checkbox>8-11AM</Checkbox>
						<Checkbox>9-12PM</Checkbox>
						<Checkbox>1-3AM</Checkbox>
					</div>
				</div>
				<Button white={true} onClick={this.submitSong}>Submit</Button>
				<Button onClick={this.props.closeWindow}>Cancel</Button>
			</div>
		)
	}
});

module.exports = PickTimeUpload