import {connect} from "react-redux"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme"
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme"
import ThemeComponent from "../components/theme"

function setTheme(ID) {
	switch (ID) {
		case "dark":
			return getMuiTheme(darkBaseTheme)
		default:
			return getMuiTheme(lightBaseTheme)
	}
}

const mapStateToProps = (state, ownProps) => {
	const {
		ui: {
			selectedTheme
		}
	} = state
	const {
		cookies
	} = ownProps
	return {
		theme: Object.keys(selectedTheme).length ? 
		selectedTheme : 
		setTheme(cookies.get("theme"))
	}
}

const Theme = connect(mapStateToProps, null)(ThemeComponent)

export default Theme
