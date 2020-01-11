import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import DemandComponent from "../components/demand"
import photosGet, {photosPost} from "../middlewares/photos"
import tagsDemandGet, {tagsDemandPost} from "../middlewares/tagsDemand"
import tagsGet from "../middlewares/tags"
import offersGet from "../middlewares/offers"
import demandGet, {demandDelete} from "../middlewares/demand"
import {filterAnObjectByKeys} from "../middlewares/utilities"

const mapStateToProps = (state, ownProps) => {
	const {
		pagination: {
			contexts: {demand}, 
			photos: photosPagination, 
			tags: tagsPagination, 
			offers: offersPagination, 
			users: usersPagination, 
			accounts: accountsPagination, 
			roles: rolesPagination
		}, 
		entitiesBuffered: {
			contexts, 
			photos, 
			tags, 
			offers, 
			demands, 
			roles
		}
	} = state
	const {
		params: {ID}
	} = ownProps
	return {
		contexts: demand && filterAnObjectByKeys(contexts, demand.IDs), 
		photos: photosPagination[ID] && 
		filterAnObjectByKeys(photos, photosPagination[ID].IDs), 
		tagsDemand: tagsPagination[ID] && 
		filterAnObjectByKeys(tags, tagsPagination[ID].IDs), 
		tagsPagination, 
		tags, 
		offers: offersPagination[ID] && 
		filterAnObjectByKeys(offers, offersPagination[ID].IDs), 
		demand: demands[ID], 
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
		photosGet, 
		photosPost, 
		tagsDemandGet, 
		tagsDemandPost, 
		tagsGet, 
		offersGet, 
		demandGet, 
		demandDelete
	},
	dispatch
)

const Demand = connect(mapStateToProps, mapDispatchToProps)(DemandComponent)

export default Demand
