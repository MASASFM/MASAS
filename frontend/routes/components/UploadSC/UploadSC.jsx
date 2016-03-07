var React = require("react")
var ReactDOM = require("react-dom")
var {goToURL} = require("../../../MASAS_functions.jsx")

var { Button } = require("../../containers/UI/UI.jsx")
var Body = require("../../containers/UI/Body.jsx")

var UploadSCItem = require("../../containers/UploadSC/UploadSCItem.jsx")
var PickTimeUpload = require("../../containers/UploadSC/PickTimeUpload.jsx")


var UploadSC = React.createClass({
	propTypes: {
		// choosingTime: React.PropTypes.object
	},

	getInitialState: function() {
		return {
			// triggerSpinnerStart: 1,
			isConnectedSoundcloud: SC.isConnected(),    // IS USER CONNECTED TO SOUNDCLOUD
			soundcloudUserTracks: null, // ['LOADING'],      // SOUNDCLOUD USER TRACK TABLE CONTENT
			masasUserTracks: null,
			SCusername: null,
			// syncingSong: null,					// song currently syncing
		};
	},

	componentWillMount: function() {
		this.props.updateTitle('SC Sync', '0')
		if(this.state.isConnectedSoundcloud)
			this.getUserTracks()
	},

	getUserTracks: function() {
		$.ajax({
			type: "GET",
			url: 'api/users/' + this.props.userPk + '/',	

				 // -u"<client_id>:<client_secret>" 
			success: (data) => {
				console.log(data)
				this.setState({masasUserTracks: data.songs})
				this.getUserSCTracks()
			},
			error: (err) => {
				console.log(err)
			},
		})
	},

	getUserSCTracks: function() {
		SC.get('me/favorites', {limit: 100}).then( (response) => {  // async call to SC servers
			this.setState({soundcloudUserTracks: response})
			console.log(this.state.soundcloudUserTracks)
		})
		// SC.get('tracks', {limit: 200, genre: 'house', ids: '246013120,246012982', duration: {to: 111111}})
	},

	connectToSC: function() {
		SC.connect().then( () => {
			this.setState({isConnectedSoundcloud: true})
			SC.get('/me').then((r) => {
				console.log(r.username)
				// store suername for mobile
				this.setState({SCusername: r.username})

				// get user track (first from MASAS API (requires log in) and then from SC API)
				this.getUserTracks()
			}).catch((err) => {
				console.log(err)
				this.setState({SCusername: null})
			})
			this.getUserTracks()
		}).catch(function(error){
			  alert('Error: ' + error.message)
		})
	},

	tracksTable: function() {
		if (this.state.soundcloudUserTracks)
			return this.state.soundcloudUserTracks.map((track) => { 
				var synced = false
				if(this.state.masasUserTracks.filter(function(song) { return song.SC_ID === track.id }).length)
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

		if(this.state.isConnectedSoundcloud) 
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
						{this.state.SCusername ?
							<span className="logout-text" onClick={this.logoutSC}>
								Log out from <span className="logout-text--username">{this.state.SCusername}</span>
							</span>
							:
							""
						}
					</div>
					<div className="back-button">
						<Button onClick={goToURL.bind(null, '/')}>Go Back</Button>
					</div>
				</div>
				</Body>
			)
		else
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
					<Button onClick={this.connectToSC} white={true}>Connect to SC</Button>
				</div>
				</Body>
				);
	}
});

module.exports = UploadSC