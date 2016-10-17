var Redux = require("redux")
import thunkMiddleware from "redux-thunk"

import { appReducer, defaultState as appDefaultState } from "./App.jsx"
import { headerReducer, defaultState as headerDefaultState } from "./Header.jsx"
import { bodyReducer, defaultState as bodyDefaultState } from "./Body.jsx"
import { footerReducer, defaultState as footerDefaultState } from "./Footer.jsx"
import { loginReducer, defaultState as loginDefaultState } from "./Login.jsx"
import { homeReducer, defaultState as homeDefaultState } from "./Home.jsx"
import { uploadSCReducer, defaultState as uploadDefaultState } from "./UploadSC.jsx"
import { playerReducer, defaultState as playerDefaultState } from "./Player.jsx"
import { likesReducer, defaultState as likesDefaultState } from "./Likes.jsx"
import { discoverReducer, defaultState as discoverDefaultState  } from "./Discover.jsx"
import { legalsReducer, defaultState as legalsDefaultState  } from "./Legals.jsx"
import { profileReducer, defaultState as profileDefaultState  } from "./Profile.jsx"
import { popularReducer, defaultState as popularDefaultState  } from "./Popular.jsx"

const initialState = {
	headerReducer: headerDefaultState,
	bodyReducer: bodyDefaultState,
	footerReducer: footerDefaultState,
	loginReducer: loginDefaultState,
	homeReducer: homeDefaultState,
	appReducer: appDefaultState,
	uploadSCReducer: uploadDefaultState,
	playerReducer: playerDefaultState,
	likesReducer: likesDefaultState,
	discoverReducer: discoverDefaultState,
	legalsReducer: legalsDefaultState,
	profileReducer: profileDefaultState,
	popularReducer: popularDefaultState,
}
const rootReducer = Redux.combineReducers({
	headerReducer,
	bodyReducer,
	footerReducer,
	loginReducer,
	homeReducer,
	appReducer,
	uploadSCReducer,
	playerReducer,
	likesReducer,
	discoverReducer,
	legalsReducer,
	profileReducer,
	popularReducer,
})


var store = Redux.createStore(
		rootReducer, 
		initialState,
		// Redux.compose(
		Redux.applyMiddleware(thunkMiddleware),
		window.devToolsExtension ? window.devToolsExtension() : f => f
			// )
		)
module.exports = store