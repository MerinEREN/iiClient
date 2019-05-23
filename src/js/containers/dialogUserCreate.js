import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import DialogUserCreateComponent from "../components/dialogUserCreate"
import rolesGet from "../middlewares/roles"
import tagsGet from "../middlewares/tags"
import {userPost} from "../middlewares/users"

const mapStateToProps = (state, ownProps) => {
	const {
		pagination: {
			tags: tagsPagination
		}, 
		entitiesBuffered: {
			roles, 
			tags
		}
	} = state
	return {
		roles, 
		tagsPagination, 
		tags
	}
}
const mapDispatchToProps = dispatch => bindActionCreators(
	{
		rolesGet, 
		tagsGet, 
		userPost
	},
	dispatch
)

const DialogUserCreate = connect(mapStateToProps, mapDispatchToProps)(DialogUserCreateComponent)

export default DialogUserCreate
