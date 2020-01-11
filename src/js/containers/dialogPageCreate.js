import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import DialogPageCreateComponent from "../components/dialogPageCreate"
import {pagePost}  from "../middlewares/pages"
import {pagesSuccess} from "../actions/pages"

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		pagePost, 
		pagesSuccess
	},
	dispatch
)

const DialogPageCreate = connect(null, mapDispatchToProps)(DialogPageCreateComponent)

export default DialogPageCreate
