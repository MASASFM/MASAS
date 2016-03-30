
var ReactRedux = require("react-redux")
var Home = require('../../components/Home/Home.jsx')
var {browserHistory} = require('react-router')

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {
		user: state.appReducer.MASASuser,
		currentPage: state.homeReducer.currentPage
	}
}



// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		goToLogin: () => {
				browserHistory.push('/login')
			},
		goToPage: (pageNumber, totalNumberPages) => { dispatch({type: 'CHANGE_HOME_PAGE_NUMBER', pageNumber, totalNumberPages}) }
	}
}

var Home = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
module.exports = Home
