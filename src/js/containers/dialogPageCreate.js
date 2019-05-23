import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import DialogPageCreateComponent from "../components/dialogPageCreate"
import {pagePost}  from "../middlewares/pages"

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		pagePost
	},
	dispatch
)

const DialogPageCreate = connect(null, mapDispatchToProps)(DialogPageCreateComponent)

export default DialogPageCreate
