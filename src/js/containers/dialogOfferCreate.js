import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import DialogOfferCreateComponent from "../components/dialogOfferCreate"
import {offerPost} from "../middlewares/offers"
import {offersSuccess} from "../actions/offers"

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		offerPost, 
		offersSuccess
	},
	dispatch
)

const DialogOfferCreate = connect(null, mapDispatchToProps)(DialogOfferCreateComponent)

export default DialogOfferCreate
