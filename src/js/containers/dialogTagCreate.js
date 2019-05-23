import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import DialogTagCreateComponent from "../components/dialogTagCreate"
import {tagPost} from "../middlewares/tags"

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		tagPost
	},
	dispatch
)

const DialogTagCreate = connect(null, mapDispatchToProps)(DialogTagCreateComponent)

export default DialogTagCreate
