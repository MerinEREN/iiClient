import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import DialogDemandComponent from "../components/dialogDemand"
import {tagsByFilterGet} from "../middlewares/tags"
import {demandPost} from "../middlewares/demands"
import {demandPut} from "../middlewares/demand"

// Can use "ownProps" here
// For accessing params for example.
const mapStateToProps = state => {
	const {
		appState: {
			tagsByFilter
		}
	} = state
	return {
		tagsByFilter
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		tagsByFilterGet, 
		demandPost, 
		demandPut
	},
	dispatch
)

const DialogDemand = connect(mapStateToProps, mapDispatchToProps)(DialogDemandComponent)

export default DialogDemand
