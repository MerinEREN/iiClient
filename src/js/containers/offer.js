import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import OfferComponent from "../components/offer"
import offerGet, {offerDelete} from "../middlewares/offer"

const mapStateToProps = (state, ownProps) => {
	const {
		ui: {contentsByPage: {offer: contents}}, 
		entitiesBuffered: {
			offers, 
			userLogged: {ID: userID}, 
			accountLogged: {ID: accountID}, 
			rolesByUser
		}
	} = state
	const {
		params: {ID, pID}
	} = ownProps
	return {
		contents, 
		offer: offers[pID] ? offers[pID][ID] : {}, 
		userID, 
		accountID, 
		userRoles: rolesByUser[userID]
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		offerGet, 
		offerPut, 
		offersDelete
	},
	dispatch
)

const Offer = connect(mapStateToProps, mapDispatchToProps)(OfferComponent)

export default Offer
