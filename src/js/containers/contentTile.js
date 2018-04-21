import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ContentTileComponent from '../components/contentTile'
import getPages from '../middlewares/pages'
import {contentUpdate} from '../actions/content'
import {selectedContentIDsAddRemove} from '../actions/contents'
import {buttonReset} from "../actions/buttons"

// Can use ownProps here.
const mapStateToProps = state => {
	return {
		allPages: state.entitiesBuffered.pages
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		getPages, 
		contentUpdate, 
		selectedContentIDsAddRemove, 
		buttonReset
	},
	dispatch
)

const ContentTile = connect(mapStateToProps, mapDispatchToProps)(ContentTileComponent)

export default ContentTile
