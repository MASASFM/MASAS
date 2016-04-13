var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Likes.jsx")

var LikesWrapper = require("./LikesWrapper.jsx")
var LikesItem = require("./LikesItem.jsx")
var { Textbox } = require("../UI/UI.jsx")

var Likes = React.createClass({
	propTypes: {
	},

	componentWillMount: function() {
		this.props.updateTitle('Likes', '0')		// 0 = menu icon; 1 = arrow back

		this.getLikes()
	},

	// componentWillReceiveProps: function(nextProps) {
	// 	console.log(this.props)

	// 	var isEquivalent = function(a, b) {
	// 		if(a === null) 
	// 			a = {}

	// 		if(b === null)
	// 			b = {}
			
	// 		// Create arrays of property names
	// 		var aProps = Object.getOwnPropertyNames(a)
	// 		var bProps = Object.getOwnPropertyNames(b)

	// 		// If number of properties is different,
	// 		// objects are not equivalent
	// 		if (aProps.length != bProps.length) {
	// 			return false
	// 		}

	// 		for (var i = 0; i < aProps.length; i++) {
	// 			var propName = aProps[i]

	// 			// If values of same property are not equal,
	// 			// objects are not equivalent
	// 			if (a[propName] !== b[propName]) 
	// 			    return false
	// 		}

	// 		// If we made it this far, objects
	// 		// are considered equivalent
	// 		return true
	// 	}
		
	// 	console.log(isEquivalent(nextProps.SCinfo, this.props.SCinfo))
	// 	if(isEquivalent(nextProps.SCinfo, this.props.SCinfo) && nextProps.reFetch !== this.props.reFetch) {
	// 			console.log(isEquivalent(nextProps.SCinfo, this.props.SCinfo) && nextProps.reFetch !== this.props.reFetch);
	// 			console.log("******************"); this.getLikes(); console.log("******************")
	// 	}
	// },

	componentDidMount: function() {
	},

	getLikes: function() {
		console.log('no way')
		if(typeof(this.props.userData.likes) !== "undefined") {
			var idString = this.props.userData.likes.map((like) => {return like.song.SC_ID}).join()
			SC.get('tracks', {limit: 200, ids: idString}).then( (response) => {
				console.log(response)
				// this.setState({userInfo: data, userSCSongs: response})
				this.props.updateLikes(response)
			})
		} else {
			this.props.updateLikes(null)
		}
	},

	componentDidUpdate(prevProps, prevState) {
		if(JSON.stringify(prevProps.userData) !== JSON.stringify(this.props.userData))
			this.getLikes()
	},

	renderLikes: function() {
		console.log("RENDER LIKES")
		
		var songs = this.props.SCinfo
		console.log('render liked songs => ', songs)

		if (!songs)
			return (<div>NO SONGS</div>)
		else {
			var compareFn = (a, b) => {
				var dateA = new Date(a.dateUploaded)
				var dateB = new Date(b.dateUploaded)

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
				var MASAS_songInfo = this.props.userData.likes.filter((like) => {
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
		console.log("PROPS => ", this.props)
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

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Likes)