import {connect} from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import ThemeComponent from '../components/theme'

function setTheme(ID) {
	switch (ID) {
		case 'dark':
			return getMuiTheme(darkBaseTheme)
		default:
			return getMuiTheme(lightBaseTheme)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		theme: Object.keys(state.ui.selectedTheme).length 
		? 
		state.ui.selectedTheme 
		:
		setTheme(ownProps.cookies.get('theme'))
	}
}

const Theme = connect(mapStateToProps)(ThemeComponent)

export default Theme
