import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import DialogLanguageCreateComponent from "../components/dialogLanguageCreate"
import {languagePost}  from "../middlewares/languages"
import {photosPost}  from "../middlewares/photos"

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		languagePost, 
		photosPost
	},
	dispatch
)

const DialogLanguageCreate = connect(null, mapDispatchToProps)(DialogLanguageCreateComponent)

export default DialogLanguageCreate
