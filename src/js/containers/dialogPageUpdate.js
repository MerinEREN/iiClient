import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import DialogPageUpdateComponent from "../components/dialogPageUpdate"
import {pagePut} from "../middlewares/page"

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		pagePut
	},
	dispatch
)

const DialogPageUpdate = connect(null, mapDispatchToProps)(DialogPageUpdateComponent)

export default DialogPageUpdate
