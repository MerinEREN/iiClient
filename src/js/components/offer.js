import React, {Component} from "react"
import PropTypes from "prop-types"
import browserHistory from "react-router/lib/browserHistory"
import {Card, CardActions, CardTitle, CardText} from "material-ui/Card"
import {List, ListItem} from "material-ui/List"
import RaisedButton from "material-ui/RaisedButton"
import FlatButton from "material-ui/FlatButton"
import {isAdmin} from "./utilities"

const styles = {
	root: {
		display: "flex",
		flexWrap: "wrap", 
		justifycontext: "space-around"
	}
}

// Show all properties and modify "status" property for delete and accept actions.
class Offer extends Component {
	constructor(props) {
		super(props)
		// this.handlePatch = this.handlePatch.bind(this)
		this.handleAccept = this.handleAccept.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		const {
			params: {pID, ID}, 
			offerGet
		} = this.props
		offerGet({
			URL: `/offers/${ID}`, 
			key: pID
		})
	}
	/* 
	handlePatch() {
		const {
			params: {pID, ID}, 
			offerPut
		} = this.props
		offerPatch({
			URL: `/offers/${ID}`, 
			data: {
				value: {
					status: "accepted"
				}
			}, 
			key: pID
		})
	}
	*/
	handleAccept() {
		// REDIRECT TO THE CONFIRMATION PAGE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	}
	handleDelete() {
		const {
			params: {ID, pID}, 
			offersDelete
		} = this.props
		offersDelete({
			URL: `/offers/${ID}`, 
			data: {
				value: [ID]
			}, 
			key: pID
		})
		browserHistory.goBack()
	}
	render() {
		const {
			contexts, 
			offer, 
			userID, 
			accountID, 
			rolesUser
		} = this.props
		return (
			<div style={styles.root}>
				<Card>
					<CardTitle 
						title={offer.amount} 
						subtitle={offer.status} 
					/>
					<CardText>
						<List>
							<ListItem 
								primaryText={contexts["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"] || "Description"} 
								secondaryText={offer.explanation} disabled={true} 
							/>
							<ListItem 
								primaryText={contexts["aghkZXZ-Tm9uZXIVCxIHQ29udGVudCIITW9kaWZpZWQM"] || "Modified"} 
								secondaryText={offer.lastModified} disabled={true} 
							/>
							<ListItem 
								primaryText={contexts["aghkZXZ-Tm9uZXIUCxIHQ29udGVudCIHQ3JlYXRlZAw"] || "Created"} 
								secondaryText={offer.created} disabled={true} 
							/>
						</List>
					</CardText>
					<CardActions>
						{
							(
								(offer.status === "active") && 
								(accountID && accountID !== offer.accountID)
							) && 
								<RaisedButton 
									label={contexts["Accept"] || "Accept"}
									primary={true}
									onTouchTap={this.handleAccept} 
								/>
						}
					</CardActions>
					<CardActions>
						{
							(
								(offer.status === "active") && 
								(
									(userID && userID === offer.userID) || 
									(
										isAdmin(rolesUser) && 
										(accountID && accountID === offer.accountID)
									)
								)
							) && 
								<FlatButton 
									label={contexts["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGRGVsZXRlDA"] || "Delete"}
									secondary={true}
									onTouchTap={this.handleDelete} 
								/>
						}
					</CardActions>
				</Card>
			</div>
		)
	}
}

Offer.defaultProps = {
	contexts: {}, 
	offer: {}
}

Offer.propTypes = {
	contexts: PropTypes.object.isRequired, 
	offer: PropTypes.object.isRequired, 
	userID: PropTypes.string.isRequired, 
	accountID: PropTypes.string.isRequired, 
	rolesUser: PropTypes.object.isRequired, 
	offerGet: PropTypes.func.isRequired, 
	offersDelete: PropTypes.func.isRequired
}

export default Offer
