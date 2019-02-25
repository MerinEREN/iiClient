import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import DemandComponent from "../components/demand"
import demandGet from "../middlewares/demand"
import {tagsByFilterGet} from "../middlewares/tags"
import {demandsDelete} from "../middlewares/demands"
import offersGet from "../middlewares/offers"
import {getObjectsFromEntities} from "../middlewares/utilities"

const mapStateToProps = (state, ownProps) => {
	const {
		ui: {contentsByPage: {demand: contents}}, 
		pagination, 
		entitiesBuffered: {
			demands: {timeline}, 
			offers, 
			userLogged: {ID: userID}, 
			accountLogged: {ID: accountID}, 
			rolesByUser
		}
	} = state
	return {
		contents, 
		demand: timeline && timeline[ownProps.params.ID], 
		offers: pagination.offers[ownProps.params.ID] ?
		getObjectsFromEntities(pagination.offers[ownProps.params.ID].IDs, offers) : 
		{}, 
		userID, 
		accountID, 
		userRoles: rolesByUser[userID]
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		demandGet, 
		demandsDelete, 
		tagsByFilterGet, 
		offersGet
	},
	dispatch
)

const Demand = connect(mapStateToProps, mapDispatchToProps)(DemandComponent)

export default Demand
