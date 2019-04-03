import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import DialogDemandComponent from "../components/dialogDemand"
import tagsGet from "../middlewares/tags"
import {demandPost} from "../middlewares/demands"
import {demandPut} from "../middlewares/demand"

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
		demandPost, 
		demandPut
	},
	dispatch
)

const DialogDemand = connect(mapStateToProps, mapDispatchToProps)(DialogDemandComponent)

export default DialogDemand
