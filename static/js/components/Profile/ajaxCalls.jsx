import {
	updateProfileInfo
} from "../../reducers/actions/Profile.js"

const { dispatch } = require('../../reducers/reducers.js')

var ajaxCalls = {}

// still here while refactoring
ajaxCalls.updateProfileInfo = (callback) => {
	dispatch(updateProfileInfo(callback))
}

module.exports = ajaxCalls