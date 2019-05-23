import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import RoleTypesComponent from "../components/roleTypes"
import roleTypesGet from "../middlewares/roleTypes"
import {roleTypeDelete}  from "../middlewares/roleType"
import {filterAnObjectByKeys} from "../middlewares/utilities"

// Can use ownProps here.
const mapStateToProps = state => {
	const {
		pagination: {
			contexts: contextsPagination
		}, 
		entitiesBuffered: {
			contexts, 
			roleTypes
		}
	} = state
	return {
		contexts: contextsPagination.roleTypes && 
		filterAnObjectByKeys(contexts, contextsPagination.roleTypes.IDs), 
		roleTypes
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		roleTypesGet, 
		roleTypeDelete
	},
	dispatch
)

const RoleTypes = connect(mapStateToProps, mapDispatchToProps)(RoleTypesComponent)

export default RoleTypes
