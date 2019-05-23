import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import OfferComponent from "../components/offer"
import offerGet, {offerDelete} from "../middlewares/offer"
import {filterAnObjectByKeys} from "../middlewares/utilities"

const mapStateToProps = (state, ownProps) => {
	const {
		pagination: {
			contexts: {offer}, 
			users: usersPagination, 
			accounts: accountsPagination, 
			roles: rolesPagination
		}, 
		entitiesBuffered: {
			contexts, 
			offers, 
			roles
		}
	} = state
	return {
		contexts: offer && filterAnObjectByKeys(contexts, offer.IDs), 
		offer: offers[ownProps.params.ID], 
		userID: usersPagination.logged && usersPagination.logged.IDs[0], 
		accountID: accountsPagination.logged && accountsPagination.logged.IDs[0],  
		rolesUser: (
			usersPagination.logged && 
			rolesPagination[usersPagination.logged.IDs[0]]
		) && 
		filterAnObjectByKeys(roles, rolesPagination[usersPagination.logged.IDs[0]].IDs)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		offerGet, 
		offerDelete
	},
	dispatch
)

const Offer = connect(mapStateToProps, mapDispatchToProps)(OfferComponent)

export default Offer
