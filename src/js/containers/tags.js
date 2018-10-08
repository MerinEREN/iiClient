import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import TagsComponent from "../components/tags"
import tagsGet, {tagPost, tagsDelete}  from "../middlewares/tags"

// Can use ownProps here.
const mapStateToProps = state => {
	const {
		entitiesBuffered: {tags}, 
		ui: {contents: {tags: contents}}
	} = state
	return {
		tags, 
		contents
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		tagsGet, 
		tagPost, 
		tagsDelete
	},
	dispatch
)

const Tags = connect(mapStateToProps, mapDispatchToProps)(TagsComponent)

export default Tags
