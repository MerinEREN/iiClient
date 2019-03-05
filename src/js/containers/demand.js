import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import DemandComponent from "../components/demand"
import tagsGet from "../middlewares/tags"
import demandGet from "../middlewares/demand"
import {tagsByFilterGet} from "../middlewares/tags"
import {demandsDelete} from "../middlewares/demands"
import offersGet from "../middlewares/offers"

const mapStateToProps = (state, ownProps) => {
	const {
		ui: {contentsByPage: {demand: contents}}, 
		entitiesBuffered: {
			tags, 
			demands: {timeline}, 
			offers, 
			userLogged: {ID: userID}, 
			accountLogged: {ID: accountID}, 
			rolesByUser
		}
	} = state
	return {
		contents, 
		tags, 
		demand: timeline && timeline[ownProps.params.ID], 
		offers: offers[ownProps.params.ID] || {}, 
		userID, 
		accountID, 
		userRoles: rolesByUser[userID]
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		tagsGet, 
		demandGet, 
		demandsDelete, 
		tagsByFilterGet, 
		offersGet
	},
	dispatch
)

const Demand = connect(mapStateToProps, mapDispatchToProps)(DemandComponent)

export default Demand
