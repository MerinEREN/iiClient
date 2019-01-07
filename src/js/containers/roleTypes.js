import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import RoleTypesComponent from "../components/roleTypes"
import roleTypesGet, {roleTypesPost, roleTypeDelete}  from "../middlewares/roleTypes"

// Can use ownProps here.
const mapStateToProps = state => {
	const {
		entitiesBuffered: {roleTypes}, 
		ui: {contentsByPage: {roletypes: contents}}
	} = state
	return {
		roleTypes, 
		contents
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		roleTypesGet, 
		roleTypesPost, 
		roleTypeDelete
	},
	dispatch
)

const RoleTypes = connect(mapStateToProps, mapDispatchToProps)(RoleTypesComponent)

export default RoleTypes
