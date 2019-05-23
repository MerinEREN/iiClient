import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import DialogLanguageCreateComponent from "../components/dialogLanguageCreate"
import {languagePost}  from "../middlewares/languages"

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		languagePost
	},
	dispatch
)

const DialogLanguageCreate = connect(null, mapDispatchToProps)(DialogLanguageCreateComponent)

export default DialogLanguageCreate
