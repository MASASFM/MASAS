var React = require("react")
var ReactDOM = require("react-dom")
var LikesWrapper = require("../../containers/Likes/LikesWrapper.jsx")
var LikesItem = require("../../containers/Likes/LikesItem.jsx")

// var {goToURL} = require("../../../MASAS_functions.jsx")
// var {getCookie} = require("../../../MASAS_functions.jsx")
var { Textbox } = require("../../containers/UI/UI.jsx")

// var Template = (props) => {

// }

var Likes = React.createClass({
	propTypes: {
	},

	componentWillMount: function() {
		this.props.updateTitle('Likes', '0')		// 0 = menu icon; 1 = arrow back

		this.props.getLikes(this.props.userPk)
	},

	componentDidMount: function() {
	},

	renderLikes: function() {
		console.log("RENDER LIKES")
		
		var songs = this.props.SCinfo

		if (!songs)
			return (<div>NO SONGS</div>)
		else {
			var songList =  songs.map((song) => { 
				console.log("======")
				console.log(song)
				var MASAS_songInfo = this.props.userLikes.filter((like) => {
					console.log(like)
					return like.SC_ID === song.id
				})[0]
				console.log('render likes')
				console.log(MASAS_songInfo)
				return <LikesItem key={song.id} SCinfo={ song } MASASinfo={MASAS_songInfo}/>
			})

			console.log(songList)
			return songList
		}
	},

	render: function() {
		return (
			<LikesWrapper>
				<div className="likes-searchbar--wrapper">
					<Textbox />
				</div>
				{this.renderLikes()}
			</LikesWrapper>
		)
	}
});

module.exports = Likes