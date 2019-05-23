import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import DialogRoleCreateComponent from "../components/dialogRoleCreate"
import roleTypesGet from "../middlewares/roleTypes"
import {rolePost}  from "../middlewares/roles"

const mapStateToProps = state => {
	const {
		entitiesBuffered: {
			roleTypes
		}
	} = state
	return {
		roleTypes
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		roleTypesGet, 
		rolePost
	},
	dispatch
)

const DialogRoleCreate = connect(mapStateToProps, mapDispatchToProps)(DialogRoleCreateComponent)

export default DialogRoleCreate
