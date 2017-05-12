import createReducer from './utilities'
import {CHANGE_THEME} from '../actions/types' 
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'

function changeTheme(state, action) {
	switch (action.cookies.get('theme')) {
		case 'dark':
			action.cookies.set('theme', 'light')
			return getMuiTheme(lightBaseTheme)
		default:
			action.cookies.set('theme', 'dark')
			return getMuiTheme(darkBaseTheme)
	}
}

// Slice Reducer
const selectedTheme = createReducer({}, {
	CHANGE_THEME: changeTheme
})

export default selectedTheme
