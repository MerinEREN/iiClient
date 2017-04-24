import {connect} from 'react-redux'
import ThemeComponent from '../components/theme'

const mapStateToProps = (state) => {
	return {
		theme: state.ui.selectedTheme
	}
}

const Theme = connect(mapStateToProps)(ThemeComponent)

export default Theme
