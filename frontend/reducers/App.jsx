var defaultState = {
	MASASuser: 0, 	// user login token
	MASASuserPk: null, 	
	pageTitle: 'home', 
	pageType: 0,		// 0 = hamburger icon, 1 = arrow icon
	navSiderbarOpen: false,
}

var login = (dispatch) => {
	FB.login( (response) => {
		if (response.status === 'connected') {
			// Logged into your app and Facebook.
			$.ajax({
				type: "POST",
				url: "/auth/convert-token/",
				data: {
					grant_type: "convert_token",
					client_id: "Fh9Te4OJFUoH8nq9A7ptSwMqFYcCqgysbVrEXIcJ",
					client_secret: "WkZJWR6YQEg7Vh3HdWp374Pz5Hs3hQrdF47wDvYAjVDlj0UbZO6sLPqnO5wKRcHhOmBeh0snylBonjv4cS19PFyo9yiZQEtnMO1upjmTYLB8MGPzw7rPq4cV5iC6wXN7",
					backend: "facebook",
					token: FB.getAccessToken(),
				},
				success: (data) => { 
					console.log(data) 
					return data.access_token
				},
				error: (err) => { 
					console.log(err) 
					return null
				}
				// dataType: dataType
			});

		} else if (response.status === 'not_authorized') {
			// The person is logged into Facebook, but not your app.
			console.log('Login failed')
		} else {
			// The person is not logged into Facebook, so we're not sure if
			// they are logged into this app or not.
			console.log('Login failed')
		}
	})
}

function appReducer(state = defaultState, action) {
	
	switch(action.type) {
		case 'LOGIN':
			// login(action.token)
			return {
				...state,
				MASASuser: action.token
			};
		 case 'LOGOUT':
			return {
				...state,
				MASASuser: null
			};
		case 'UPDATE_PAGE_TITLE':
			return {
				...state,
				pageTitle: action.title,
				pageType: action.pageType
			};
		case 'TOOGLE_NAV_SIDEBAR':
			return {
				...state,
				navSiderbarOpen: !state.navSiderbarOpen
			};
		case 'UPDATE_USER_PK':
			return {
				...state,
				MASASuserPk: action.pk
			}
		default:
			return state;
	}
}


module.exports = appReducer;