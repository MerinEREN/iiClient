import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import DialogOfferComponent from "../components/dialogOffer"
import {offerPost} from "../middlewares/offers"

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		offerPost
	},
	dispatch
)

const DialogOffer = connect(null, mapDispatchToProps)(DialogOfferComponent)

export default DialogOffer
