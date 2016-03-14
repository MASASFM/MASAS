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
		console.log(this.props)

		var isEquivalent = function(a, b) {
			if(a === null) 
				a = {}

			if(b === null)
				b = {}
			
			// Create arrays of property names
			var aProps = Object.getOwnPropertyNames(a)
			var bProps = Object.getOwnPropertyNames(b)

			// If number of properties is different,
			// objects are not equivalent
			if (aProps.length != bProps.length) {
				return false
			}

			for (var i = 0; i < aProps.length; i++) {
				var propName = aProps[i]

				// If values of same property are not equal,
				// objects are not equivalent
				if (a[propName] !== b[propName]) 
				    return false
			}

			// If we made it this far, objects
			// are considered equivalent
			return true
		}
		
		console.log(isEquivalent(nextProps.SCinfo, this.props.SCinfo))
		if(isEquivalent(nextProps.SCinfo, this.props.SCinfo) && nextProps.reFetch !== this.props.reFetch) {
				console.log(isEquivalent(nextProps.SCinfo, this.props.SCinfo) && nextProps.reFetch !== this.props.reFetch);
				console.log("******************"); this.props.getLikes(this.props.userPk); console.log("******************")
		}
	},

	componentDidMount: function() {
	},

	renderLikes: function() {
		console.log("RENDER LIKES")
		
		var songs = this.props.SCinfo

		if (!songs)
			return (<div>NO SONGS</div>)
		else {
			var compareFn = (a, b) => {
				var dateA = a.dateUploaded
				var dateB = b.dateUploaded
				if (dateA > dateB) {
					return 1
				}
				if (dateB > dateA) {
					return -1
				}
					return 0
			}

			songs.sort(compareFn)
			console.log(songs)

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