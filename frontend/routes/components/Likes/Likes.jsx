var React = require("react")
var ReactDOM = require("react-dom")
var LikesWrapper = require("../../containers/Likes/LikesWrapper.jsx")
var LikesItem = require("../../containers/Likes/LikesItem.jsx")

var { Textbox } = require("../../containers/UI/UI.jsx")

var Likes = React.createClass({
	propTypes: {
	},

	componentWillMount: function() {
		this.props.updateTitle('Likes', '0')		// 0 = menu icon; 1 = arrow back

		this.props.getLikes(this.props.userPk)
	},

	componentWillReceiveProps: function(nextProps) {
		if(nextProps.reFetch !== this.props.reFetch)
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
				var MASAS_songInfo = this.props.userLikes.filter((like) => {
					return like.song.SC_ID === song.id
				})

				if(MASAS_songInfo.length === 1)
					return <LikesItem key={song.id} SCinfo={ song } MASASinfo={MASAS_songInfo[0].song} />
				else
					return null
			})

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
})

module.exports = Likes