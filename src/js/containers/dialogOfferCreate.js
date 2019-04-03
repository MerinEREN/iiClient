import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import DialogOfferCreateComponent from "../components/dialogOfferCreate"
import {offerPost} from "../middlewares/offers"

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		offerPost
	},
	dispatch
)

const DialogOfferCreate = connect(null, mapDispatchToProps)(DialogOfferCreateComponent)

export default DialogOfferCreate
