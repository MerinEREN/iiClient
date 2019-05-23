import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import RolesComponent from "../components/roles"
import rolesGet from "../middlewares/roles"
import {roleDelete} from "../middlewares/role"
import {filterAnObjectByKeys} from "../middlewares/utilities"

// Can use ownProps here.
const mapStateToProps = state => {
	const {
		pagination: {
			contexts: contextsPagination
		}, 
		entitiesBuffered: {
			contexts, 
			roles
		}
	} = state
	return {
		contexts: contextsPagination.roles && 
		filterAnObjectByKeys(contexts, contextsPagination.roles.IDs), 
		roles
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		rolesGet, 
		roleDelete
	},
	dispatch
)

const Roles = connect(mapStateToProps, mapDispatchToProps)(RolesComponent)

export default Roles
