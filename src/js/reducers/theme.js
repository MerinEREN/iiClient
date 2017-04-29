import createReducer from './utilities'
import cookie from 'react-cookie'
import {CHANGE_THEME} from '../actions/types' 
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import {green100, green500, green700} from 'material-ui/styles/colors'

// Set Initial State
function applyCustomTheme() {
	// Creating custom theme or manipulating the current one. 
	// And also setting userAgent for server rendering.
	return getMuiTheme({
		// setting userAgent for server rendering !!!!!!!!!
		// userAgent: req.headers['user-agent'],
		palette: {
			primary1Color: green500,
			primary2Color: green700,
			primary3Color: green100,
		},
		// Customising specifically a component
		avatar: {
			borderColor: null,
		},
		appBar: {
			height: 50,
		}
	})
}
let theme = {
	ID : cookie.load('theme'),
	value: null
}
if (theme.ID) {
	switch (theme.ID) {
		case 'light':
			theme.value = getMuiTheme(lightBaseTheme)
			break
		case 'dark':
			theme.value = getMuiTheme(darkBaseTheme)
			break
		default:
			theme.value = applyCustomTheme()
	}
} else {
	// theme = {'custom', applyCustomTheme()}
	theme = {
		ID: 'light',
		value: applyCustomTheme()
	}
}

function changeTheme(state, action) {
	switch (state.ID) {
		case 'light':
			cookie.save('theme', 'dark')
			return {
				ID: 'dark',
				value: getMuiTheme(darkBaseTheme)
			}
		case 'dark':
			cookie.save('theme', 'light')
			return {
				ID: 'light',
				value: getMuiTheme(lightBaseTheme)
			}
		default:
			cookie.save('theme', 'custom')
			return {
				ID: 'custom',
				value: applyCustomTheme()
			}
	}
}

// Slice Reducer
const selectedTheme = createReducer(theme, {
	CHANGE_THEME: changeTheme
})

export default selectedTheme
