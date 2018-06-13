import React from "react"
import PropTypes from "prop-types"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
// IMPORT FROM CONTAINERS WHEN READY !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  
import Router from "./router"

const Theme = ({theme}) => (
	<MuiThemeProvider muiTheme={theme}>
		<Router />
	</MuiThemeProvider>
)

Theme.propTypes = {
	theme: PropTypes.object.isRequired
}

export default Theme
