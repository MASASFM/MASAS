var Cookie = require("js-cookie")

var MASAS_functions = {}

/////
/////
/////
////		Useful functions
////
/////
/////

MASAS_functions.getUserPkFromURL = url => {
	var str = url
	str = str.slice(0, str.length-1)
	str = str.substring(str.lastIndexOf("/")+1,str.length)

	return str
}

MASAS_functions.getTimeIntervalNumberFromUrl = url => {
	return parseInt(MASAS_functions.getUserPkFromURL(url))
}

MASAS_functions.isObjectEmpty = obj => Object.keys(obj).length === 0 && obj.constructor === Object
MASAS_functions.isObjectNotEmpty = obj => Object.keys(obj).length !== 0 && obj.constructor === Object

MASAS_functions.background = {
	blur: () => {
		$('#body--background').addClass('blurred')
	},
	unblur: () => {
		$('#body--background').removeClass('blurred')
	}
}

MASAS_functions.discoverHashtagNames = () => {
	return [
		"#EarlyMorning",
		"#LateMorning",
		"#EarlyAfternoon",
		"#LateAfternoon",
		"#EarlyEvening",
		"#LateEvening"
	]
}

MASAS_functions.timeIntervalURLToString = (timeIntervalURL) => {
	var switchVar = timeIntervalURL.substr(timeIntervalURL.length - 2, 1)
	const hastagNames = MASAS_functions.discoverHashtagNames()

	switch(switchVar) {
		case "1":
			return hastagNames[0]
		case "2":
			return hastagNames[1]
		case "3":
			return hastagNames[2]
		case "4":
			return hastagNames[3]
		case "5":
			return hastagNames[4]
		case "6":
			return hastagNames[5]
		default:
			return ""
	}
}

// https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
MASAS_functions.makePromiseCancelable = (promise) => {
	let hasCanceled_ = false;

	const wrappedPromise = new Promise((resolve, reject) => {
		promise.then((val) =>
			hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
		)

		promise.catch((error) =>
			hasCanceled_ ? reject({isCanceled: true}) : reject(error)
		)
	})

	return {
		promise: wrappedPromise,
		cancel() {
			hasCanceled_ = true
		},
	}
}

MASAS_functions.updateAuthCookie = (userToken) => {
	Cookie.set("MASAS_authToken", userToken)
}


// using jQuery
MASAS_functions.getCookie = (name) => {
	var cookieValue = null
	if (document.cookie && document.cookie != "") {
		var cookies = document.cookie.split(";")
		for (var i = 0; i < cookies.length; i++) {
			var cookie = $.trim(cookies[i])
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) == (name + "=")) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
				break
			}
		}
	}
	return cookieValue
}

// (BOOL) checks if a sequence is a subsequence of a string
MASAS_functions.isSubsequence = (sequence, string) => {
	if (string.toLowerCase().includes(sequence.toLowerCase()))
		return true
	else
		return false
}

// returns 1-6 for timeInterval based on songId
MASAS_functions.getTimeIntervalFromURL = (timeIntervalURL) => {
	return parseInt(timeIntervalURL.substr(timeIntervalURL.length - 2, 1))
}

module.exports = MASAS_functions