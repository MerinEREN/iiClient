import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import TagsComponent from "../components/tags"
import tagsGet from "../middlewares/tags"
import {tagDelete} from "../middlewares/tag"
import {filterAnObjectByKeys} from "../middlewares/utilities"

// Can use ownProps here.
const mapStateToProps = state => {
	const {
		pagination: {
			contexts: contextsPagination
		}, 
		entitiesBuffered: {
			contexts, 
			tags
		}
	} = state
	return {
		contexts: contextsPagination.tags && 
		filterAnObjectByKeys(contexts, contextsPagination.tags.IDs), 
		tags
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		tagsGet, 
		tagDelete
	},
	dispatch
)

const Tags = connect(mapStateToProps, mapDispatchToProps)(TagsComponent)

export default Tags
