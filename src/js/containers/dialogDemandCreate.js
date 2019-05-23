import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import DialogDemandCreateComponent from "../components/dialogDemandCreate"
import tagsGet from "../middlewares/tags"
import {demandPost} from "../middlewares/demands"

const mapStateToProps = (state, ownProps) => {
	const {
		pagination: {
			tags: tagsPagination
		}, 
		entitiesBuffered: {
			tags
		}
	} = state
	return {
		tagsPagination, 
		tags
	}
}
const mapDispatchToProps = dispatch => bindActionCreators(
	{
		tagsGet, 
		demandPost
	},
	dispatch
)

const DialogDemandCreate = connect(mapStateToProps, mapDispatchToProps)(DialogDemandCreateComponent)

export default DialogDemandCreate
