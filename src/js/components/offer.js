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
		justifyContent: "space-around"
	}
}

// Show and modify some offer properties.
class Offer extends Component {
	constructor(props) {
		super(props)
		this.handlePut = this.handlePut.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		const {
			params: {ID, pID}, 
			offerGet
		} = this.props
		offerGet({
			URL: `/offers/${ID}`, 
			key: pID
		})
	}
	handlePut() {
		const {
			params: {ID, pID}, 
			offerPut
		} = this.props
		offerPut({
			URL: `/offers/${ID}`, 
			body: {
				data: {
					[ID]: {
						status: "accepted"
					}
				}
			}, 
			key: pID
		})
		browserHistory.goBack()
	}
	handleDelete() {
		const {
			params: {ID, pID}, 
			offersDelete
		} = this.props
		offersDelete({
			URL: `/offers/${ID}`, 
			body: {
				data: [ID]
			}, 
			key: pID
		})
		browserHistory.goBack()
	}
	render() {
		const {
			contents, 
			offer, 
			userID, 
			accountID, 
			userRoles
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
							<ListItem primaryText={contents["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"] || "Description"} secondaryText={offer.explanation} disabled={true} />
							<ListItem primaryText={contents["aghkZXZ-Tm9uZXIVCxIHQ29udGVudCIITW9kaWZpZWQM"] || "Modified"} secondaryText={offer.lastModified} disabled={true} />
							<ListItem primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudCIHQ3JlYXRlZAw"] || "Created"} secondaryText={offer.created} disabled={true} />
						</List>
					</CardText>
					<CardActions>
						{
							(
								(offer.status === "active") && 
								(accountID && accountID !== offer.accountID)
							) && 
								<RaisedButton 
									label={contents["Accept"] || "Accept"}
									primary={true}
									onTouchTap={this.handlePut} 
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
										isAdmin(userRoles) && 
										(accountID && accountID === offer.accountID)
									)
								)
							) && 
								<FlatButton 
									label={contents["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGRGVsZXRlDA"] || "Delete"}
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

// For "undefined required offer" error when refreshing the offer.
Offer.defaultProps = {
	contents: {}, 
	offer: {}
}

Offer.propTypes = {
	contents: PropTypes.object.isRequired, 
	offer: PropTypes.object.isRequired, 
	userID: PropTypes.string, 
	accountID: PropTypes.string, 
	userRoles: PropTypes.object, 
	offerGet: PropTypes.func.isRequired, 
	offersDelete: PropTypes.func.isRequired
}

export default Offer
