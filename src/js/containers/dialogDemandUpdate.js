import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import DialogDemandUpdateComponent from "../components/dialogDemandUpdate"
import {demandPut} from "../middlewares/demand"

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		demandPut
	},
	dispatch
)

const DialogDemandUpdate = connect(null, mapDispatchToProps)(DialogDemandUpdateComponent)

export default DialogDemandUpdate
