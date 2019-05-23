import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import DialogRoleTypeCreateComponent from "../components/dialogRoleTypeCreate"
import {roleTypePost} from "../middlewares/roleTypes"

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		roleTypePost
	},
	dispatch
)

const DialogRoleTypeCreate = connect(null, mapDispatchToProps)(DialogRoleTypeCreateComponent)

export default DialogRoleTypeCreate
