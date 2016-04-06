const users = {
	"4N2zd3Osw3Fo7togfYoFPXtHlt9jGD": {userPk: "4", user: "thomas", auth: "4N2zd3Osw3Fo7togfYoFPXtHlt9jGD"},
}

let mocks = {}
mocks.getUsername = function(MASASuser) {
	return new Promise((resolve, reject) => {
		process.nextTick(
			() => users[MASASuser] ? resolve(users[MASASuser]) : reject({error: MASASuser})
		)
	})
}

module.exports = mocks