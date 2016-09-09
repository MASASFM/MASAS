var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/TeachUploadModals.jsx")

var { getCookie, updateProfileInfo } = require("../../MASAS_functions.jsx")
var { Button, TimePicker } = require("../UI/UI.jsx")

var TeachUploadModals = {}

TeachUploadModals.TeachUploadModal1 = ReactRedux.connect(
		mapStateToProps,
		mapDispatchToProps
	)(React.createClass({
		propTypes: {
		},

		componentWillMount: function() {
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
				success: (r) => {
					updateProfileInfo(this.props.toogleIsModalOpened)
					console.log(r)
				},
				error: (e) => console.log(e),
			})
		},

		render: function() {
			return (
				<div className="teach-modal--wrapper">
					<p className="bold">
						Hey, Meet the Discovery Slider
					</p>
					<p>
						It's your new friend! Match your daily journey with 6 different moods
					</p>
					<div className="teach-modal-pickTime--wrapper"  style={{ height: '90px', width: '150px' }}>
						<TimePicker 
							onSliderChange={ () => {} }
							initialDiscover={ 3 } 
							currentDiscover={ 1 } 
							wrapperClassName="teach-modal-pickTime--wrapper"
							canvasId="teach-modal-pickTime--canvas" 
							showHashtag={ false }
							sliderValue={ 50 }/>
					</div>
					<Button 
						isBigButton={ false }
						onClick={ this.props.closeModal }>Close tip</Button>

				</div>
			)
		}
	})
)


module.exports = TeachUploadModals