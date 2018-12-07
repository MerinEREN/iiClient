import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import RolesComponent from "../components/roles"
import rolesGet, {rolesPost, roleDelete} from "../middlewares/roles"
import roleTypesGet from "../middlewares/roleTypes"

// Can use ownProps here.
const mapStateToProps = state => {
	const {
		entitiesBuffered: {roles, roleTypes}, 
		ui: {contents: {roles: contents}}
	} = state
	return {
		roles, 
		roleTypes, 
		contents
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		rolesGet, 
		roleTypesGet, 
		rolesPost, 
		roleDelete
	},
	dispatch
)

const Roles = connect(mapStateToProps, mapDispatchToProps)(RolesComponent)

export default Roles
