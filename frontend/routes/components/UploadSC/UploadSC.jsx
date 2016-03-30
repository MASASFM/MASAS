var React = require("react")
var ReactDOM = require("react-dom")
var { goToURL } = require("../../../MASAS_functions.jsx")
import { MobileBlurBackground } from "../MASAS_mixins.jsx"

var { Button } = require("../../containers/UI/UI.jsx")
var Body = require("../../containers/UI/Body.jsx")

var UploadSCItem = require("../../containers/UploadSC/UploadSCItem.jsx")
var PickTimeUpload = require("../../containers/UploadSC/PickTimeUpload.jsx")


var UploadSC = React.createClass({
	mixins: [ MobileBlurBackground ],
	
	propTypes: {
		// choosingTime: React.PropTypes.object
	},

	componentWillMount: function() {
		this.props.updateTitle('Upload', '0')
		if(this.props.isConnectedSoundcloud)
			this.getUserTracks()
	},

	componentWillReceiveProps: function(nextProps) {
		// update masas user track prop to have the sync icon updatd in real time
		console.log(this.props)
		console.log(nextProps)
		if(this.props.choosingTime !== nextProps.choosingTime)
			this.getUserTracks()
	},

	getUserTracks: function() {
		var success =  (data) => {
				console.log(data)

				this.props.updateMasasUserTracks(data.songs)
				this.getUserSCTracks()
			}

		var error = (err) => {
				console.log(err)
			}

		this.props.getUserTracks(this.props.userPk, success, error)
	},

	getUserSCTracks: function() {
		SC.get('me/favorites', {limit: 100}).then( (response) => {  // async call to SC servers
			this.props.updateSoundcloudUserTracks(response)
			console.log(this.state.soundcloudUserTracks)
		})
		// SC.get('tracks', {limit: 200, genre: 'house', ids: '246013120,246012982', duration: {to: 111111}})
	},

	connectToSC: function() {
		// window.open("https://soundcloud.com/connect?client_id=ed631b7b4a7b72dcddf94294319ef093&display=popup&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fsc-callback&response_type=code_and_token&scope=non-expiring&state=SoundCloud_Dialog_80f9e")
		SC.connect().then( () => {
			// this.setState({isConnectedSoundcloud: true})
			this.props.updateIsConnectedSC(true)
			SC.get('/me').then((r) => {
				// store suername for mobile
				this.props.updateSCusername(r.username)

				// get user track (first from MASAS API (requires log in) and then from SC API)
				this.getUserTracks()
			}).catch((err) => {
				console.log(err)
				// this.setState({SCusername: null})
				this.props.updateSCusername(null)
			})
			this.getUserTracks()
		}).catch(function(error){
			  alert('Error: ' + error.message)
		})
	},

	tracksTable: function() {
		if (this.props.soundcloudUserTracks)
			return this.props.soundcloudUserTracks.map((track) => { 
				var synced = false
				if(this.props.masasUserTracks.filter(function(song) { return song.SC_ID === track.id }).length)
					synced = true

				return <UploadSCItem key={track.id} track={ track } synced={synced}/>
			})
	},

	logoutSC: function() {
		location.reload()
	},

	render: function() {
		if(this.props.choosingTime)
			return <Body><PickTimeUpload /></Body>

		if(this.props.isConnectedSoundcloud) 
			return (
				<Body>
				<div className="upload-sc--wrapper">
					<div className="table-head">
						<div className="title">
							Title
						</div>
						<div className="duration">
							Duration
						</div>
						<div className="sync">
							Sync
						</div>
					</div>
					<div className="upload-sc-items--wrapper">
						{ this.tracksTable() }
					</div>
					<div className="logout--wrapper">
						{this.props.SCusername ?
							<span className="logout-text" onClick={this.logoutSC}>
								Log out from <span className="logout-text--username">{this.props.SCusername}</span>
							</span>
							:
							""
						}
					</div>
				</div>
				</Body>
			)
		else {

			return (
				<Body>

				<div className="connect-sc--wrapper">
					<div className="connect-sc--header">
						<img src="/static/img/MASAS_logo_soundcloud.svg" className="SC-logo" alt="soundcloud sync" />
						<img src="/static/img/MASAS_icon_synch_separator.svg" className="sync-icon" alt="soundcloud sync" />
						<img src="/static/img/MASAS_logo-M.svg" className="MASAS-logo" alt="soundcloud sync" />
					</div>
					<p>
						What about discovering new artists from your friends, upload sounds in a click and so much more ?
					</p>
					<div className="connect-button">
						<Button onClick={this.connectToSC} white={true}>Connect to SC</Button>
					</div>
				</div>
				</Body>
				);
		}
	}
});

module.exports = UploadSC