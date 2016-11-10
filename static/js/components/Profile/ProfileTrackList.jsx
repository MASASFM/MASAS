var React = require("react")

var { goToURL } = require("../../MASAS_functions.jsx")

// var ReactRedux = require("react-redux")
// var { mapStateToProps, mapDispatchToProps } = require("./containers/Template.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
// import { BlurBackground } from "../MASAS_mixins.jsx"
var { Button } = require("../UI/UI.jsx")
var TrackItem = require("../Profile/TrackItem.jsx")

// var Template = (props) => {

// }

var ProfileTrackList = React.createClass({
	propTypes: {
		songs: React.PropTypes.array,				// songs to show
		isPublicProfile: React.PropTypes.bool,			// is profile shown public or private
		userData: React.PropTypes.object,			// object containing user data
		userSCSongs: React.PropTypes.array,			// song info from SC
		isMiniProfile: React.PropTypes.bool,			// is tracklist in miniprofile mode
	},

	getDefaultProps: function() {
		return {
			isPublicProfile: false,
			isMiniProfile: false,
		}
	},

	render: function() {
		var { songs } = this.props

		if (!songs.length) 
			return (
				!this.props.isPublicProfile ?
					<div className="no-songs--wrapper">
						<div className="upload-button">
							<p className="bold">
								Congratulation { this.props.userData.name ? this.props.userData.name : this.props.userData.username }, you're now part of the familly
							</p>
							<p>
								This is your new profile, all your uploaded sounds will be shown here.
							</p>
							<Button isSecondaryAction={ true } onClick={goToURL.bind(null, "/upload")}>Share My First Sound</Button>
							<Button onClick={goToURL.bind(null, "/discover")}>Discover music</Button>
						</div>
					</div>
					:
					<div className="no-songs--wrapper">
						<div className="upload-button">
							<Button onClick={ () => {} } isSecondaryAction={ true } isDisabled={ true }>This user has no sounds</Button>
						</div>
					</div>
				)
		else {
			var compareFn = (a, b) => {
				var dateA = new Date(a.dateUploaded)
				var dateB = new Date(b.dateUploaded)

				if (dateA > dateB) {
					return -1
				}
				if (dateB > dateA) {
					return 1
				}

				return 0
			}
			songs.sort(compareFn)

			var songList =  songs.map((song) => { 
				var SC_songInfo = this.props.userSCSongs.filter((el) => {
					return el.id === song.SC_ID
				})[0]

				// return nothing if song no longer exists on soundcloud
				if(SC_songInfo === undefined)
					return

				return <TrackItem 
						key={song.SC_ID} 
						track={ SC_songInfo } 
						MASAS_songInfo={song} 
						allowOpen={ !this.props.isPublicProfile }
						isMiniProfile={ this.props.isMiniProfile ? true : false } />
			})

			return (
				<div>
					<div className={ "track-table--wrapper" + (this.props.isMiniProfile ? " mini-profile" : " aa") }>
						{ songList }
					</div>
				</div>
				)
		}
	}
})

module.exports = ProfileTrackList
// ReactRedux.connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(Template)