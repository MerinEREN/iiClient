import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import TagsComponent from "../components/tags"
import tagsGet, {tagsPost, tagDelete}  from "../middlewares/tags"

// Can use ownProps here.
const mapStateToProps = state => {
	const {
		entitiesBuffered: {tags}, 
		ui: {contentsByPage: {tags: contents}}
	} = state
	return {
		tags, 
		contents
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		tagsGet, 
		tagsPost, 
		tagDelete
	},
	dispatch
)

const Tags = connect(mapStateToProps, mapDispatchToProps)(TagsComponent)

export default Tags
