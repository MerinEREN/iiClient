import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ContentTileComponent from '../components/contentTile'
import {contentUpdate} from '../actions/content'
import {selectedContentIDsAddRemove} from '../actions/contents'
import {buttonReset} from "../actions/buttons"

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		contentUpdate, 
		selectedContentIDsAddRemove, 
		buttonReset
	},
	dispatch
)

const ContentTile = connect(null, mapDispatchToProps)(ContentTileComponent)

export default ContentTile
