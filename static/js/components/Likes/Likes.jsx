var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Likes.jsx")

var LikesWrapper = require("./LikesWrapper.jsx")
var LikesArtworks = require("./LikesArtworks.jsx")
var { Textbox } = require("../UI/UI.jsx")
var FiltersModal = require("./FiltersModal.jsx")

var { isSubsequence, timeIntervalURLToString } = require("../../MASAS_functions.jsx")

// FETCHES LIKES INFO, FILTERS IT IF NECESSARY, AND FEEDS THE DATA 
// TO A SUB-COMPONENT THAT DISPLAYS IT

var Likes = React.createClass({
	propTypes: {
		SCinfo: React.PropTypes.array,
		userData: React.PropTypes.object,
		searchInput: React.PropTypes.string,
		toogleModal: React.PropTypes.func,
		updateModalContent: React.PropTypes.func,
		toggleHashtag: React.PropTypes.func,
		hashtagFilter: React.PropTypes.array,
		updateLikes: React.PropTypes.func,
		updateTitle: React.PropTypes.func,
		toogleHashtag: React.PropTypes.func,
		getLikes: React.PropTypes.func,
		userLikes: React.PropTypes.array,
	},

	componentWillMount: function() {
		this.props.updateTitle("Likes", "0")		// 0 = menu icon; 1 = arrow back

		this.getLikes()
	},

	componentDidMount: function() {
	},

	componentWillUnmount: function() {
		for(var i = 0; i < this.props.hashtagFilter.length; i++) {
			if(this.props.hashtagFilter[i])
				this.props.toogleHashtag(i)
		}
	},

	getLikes: function() {
		this.props.getLikes()
	},

	componentDidUpdate(prevProps) {
		if(JSON.stringify(prevProps.userData) !== JSON.stringify(this.props.userData))
			this.getLikes()
	},

	filterLikes: function() {
		if(this.props.userLikes) {
			var songList = this.props.userLikes

			// sort by liked time
			songList.sort((a,b) => { return Date.parse(a.MASAS_songInfo.created) < Date.parse(b.MASAS_songInfo.created) })

			var radioTimeString = timeIntervalURLToString

			var filteredSongList = songList.filter((song) => {
				if(song === 0)
					return false

				// match filter string entered by user with a string of info relevant to each song.
				// should refactor this into a "searchStringFilter" function
				var songSearchString = radioTimeString(song.MASAS_songInfo.song.timeInterval) + " " + song.SC_songInfo.title + " " + song.SC_songInfo.tag_list

				return isSubsequence(this.props.searchInput, songSearchString)
			})

			// filter by hashtag buttons
			var testVar = this.props.hashtagFilter.filter((hashtag) => {
				return hashtag
			})

			// loop and filter for each hashtag button selected by user
			if(testVar.length !== 0) {
				for(var i = 0; i < this.props.hashtagFilter.length; i++) {
					if(!this.props.hashtagFilter[i]) {
						filteredSongList = filteredSongList.filter((song) => {
							var timeIntervalURL = song.MASAS_songInfo.song.timeInterval
							var hashtagNumber = timeIntervalURL.substr(timeIntervalURL.length - 2, 1)
							return parseInt(hashtagNumber) - 1 !== i
						})
					}
				}
			}

			return filteredSongList
		} else 
			return
	},

	openFiltersModal: function() {
		this.props.updateModalContent(<FiltersModal />)
		this.props.toogleModal()
	},

	toggleFilter: function(hashtagNumber) {
		this.props.toogleHashtag(hashtagNumber)
	},

	updateSearchInput: function(searchInput) {
		this.props.updateSearchInput(searchInput)
	},

	render: function() {
		return (
			<LikesWrapper>
					<div className="likes-searchbar--wrapper" id="likes-searchbar-wrapper">
						<img src="/static/img/MASAS_search.svg" alt="serach-icon" />
						<Textbox id="likes--search-textbox" value={ this.props.searchInput } onChange={ this.updateSearchInput } />
						<img onClick={ this.openFiltersModal } className="filter-icon" alt="filter-songs" src="/static/img/MASAS_icon_filter.svg" />
					</div>
					<div className="filters--wrapper">
						<div onClick={ this.toggleFilter.bind(this, 0) } id="filter-early-morning" className={ "tag-filter " + ( this.props.hashtagFilter[0] ? "enable" : "" )}>#EarlyMorning</div>
						<div onClick={ this.toggleFilter.bind(this, 1) } id="filter-late-morning" className={ "tag-filter " + ( this.props.hashtagFilter[1] ? "enable" : "" )}>#LateMorning</div>
						<div onClick={ this.toggleFilter.bind(this, 2) } id="filter-early-afternoon" className={ "tag-filter " + ( this.props.hashtagFilter[2] ? "enable" : "" )}>#EarlyAfternoon</div>
						<div onClick={ this.toggleFilter.bind(this, 3) } id="filter-late-afternoon" className={ "tag-filter " + ( this.props.hashtagFilter[3] ? "enable" : "" )}>#LateAfternoon</div>
						<div onClick={ this.toggleFilter.bind(this, 4) } id="filter-early-evening" className={ "tag-filter " + ( this.props.hashtagFilter[4] ? "enable" : "" )}>#EarlyEvening</div>
						<div onClick={ this.toggleFilter.bind(this, 5) } id="filter-late-evening" className={ "tag-filter " + ( this.props.hashtagFilter[5] ? "enable" : "" )}>#LateEvening</div>
					</div>

					<LikesArtworks 
						SCinfo={ this.props.SCinfo } 
						userData={ this.props.userData } 
						userLikes={ this.filterLikes(this.props.userLikes) } />
				
			</LikesWrapper>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Likes)







