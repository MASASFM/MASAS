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
				<div className="checkbox--wrapper">
					<div className="column">
						<span className="radio--wrapper"><input type="radio" 
								value = {1}
								checked={this.props.pickTimeUpload === 1}
								onChange={this.props.onTimeChanged.bind(this, 1)}
								className="radio-button"
								/><span className="radioButton-label">5-8AM</span></span>
						<span className="radio--wrapper"><input type="radio" 
								value = {2}
								checked={this.props.pickTimeUpload === 2}
								onChange={this.props.onTimeChanged.bind(this, 2)}
								className="radio-button"
								/><span className="radioButton-label">5-8AM</span></span>
						<span className="radio--wrapper"><input type="radio" 
								value = {3}
								checked={this.props.pickTimeUpload === 3}
								onChange={this.props.onTimeChanged.bind(this, 3)}
								className="radio-button"
								/><span className="radioButton-label">2-5AM</span></span>
					</div>
					<div className="column">
						<span className="radio--wrapper"><input type="radio" 
								value = {4}
								checked={this.props.pickTimeUpload === 4}
								onChange={this.props.onTimeChanged.bind(this, 4)}
								className="radio-button"
								/><span className="radioButton-label">8-11AM</span></span>
						<span className="radio--wrapper"><input type="radio" 
								value = {5}
								checked={this.props.pickTimeUpload === 5}
								onChange={this.props.onTimeChanged.bind(this, 5)}
								className="radio-button"
								/><span className="radioButton-label">9-12PM</span></span>
						<span className="radio--wrapper"><input type="radio" 
								value = {6}
								checked={this.props.pickTimeUpload === 6}
								onChange={this.props.onTimeChanged.bind(this, 6)}
								className="radio-button"
								/><span className="radioButton-label">1-3AM</span></span>
					</div>
				</div>
				<div className="button--wrapper">
					<Button className="submit" small={true} white={true} onClick={this.submitSong}>Submit</Button>
					<Button noBorders={true} onClick={this.props.closeWindow}>Cancel</Button>
				</div>
			</div>
		)
	}
});

module.exports = PickTimeUpload