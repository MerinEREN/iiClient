import React, {Component} from "react"
import PropTypes from "prop-types"
import browserHistory from "react-router/lib/browserHistory"
import {Card, CardActions, CardMedia, CardTitle, CardText} from "material-ui/Card"
import {List, ListItem} from "material-ui/List"
import FlatButton from "material-ui/FlatButton"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentCreate from "material-ui/svg-icons/content/create"
import ContentAdd from "material-ui/svg-icons/content/add"
import DialogDemand from "../containers/dialogDemand"
import DialogOffer from "../containers/dialogOffer"
import {isAdmin} from "./utilities"

const styles = {
	root: {
		display: "flex",
		flexWrap: "wrap", 
		justifyContent: "space-around"
	}, 
	floatingActionButton: {
		position: "fixed",
		bottom: 32, 
		right: 48
	}
}

// Show and modify all stored demand properties.
class Demand extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showDialogDemand: false, 
			showDialogOffer: false
		}
		this.toggleDialogDemand = this.toggleDialogDemand.bind(this)
		this.toggleDialogOffer = this.toggleDialogOffer.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		const {
			demandGet, 
			offersGet, 
			params: {ID}
		} = this.props
		demandGet({
			URL: `/demands/${ID}`, 
			key: "timeline"
		})
		offersGet({
			URL: `/offers?dID=${ID}`, 
			key: ID
		})

	}
	handleDelete() {
		const {
			params: {ID}, 
			demandsDelete
		} = this.props
		demandsDelete({
			URL: `/demands/${ID}`, 
			body: {
				data: [ID]
			}, 
			key: "timeline"
		})
		browserHistory.goBack()
	}
	toggleDialogDemand() {
		const {
			showDialogDemand
		} = this.state
		// Getting most used six tags to show as initial autocomplete values 
		// if they does not exist yet.
		this.props.tagsByFilterGet({
			URL: "/tags?st=top", 
			key: "top"
		})
		this.setState({showDialogDemand: !showDialogDemand})
	}
	toggleDialogOffer() {
		const {
			showDialogOffer
		} = this.state
		this.setState({showDialogOffer: !showDialogOffer})
	}
	render() {
		const {
			showDialogDemand, 
			showDialogOffer
		} = this.state
		const {
			params, 
			contents, 
			demand, 
			offers, 
			userID, 
			accountID, 
			userRoles
		} = this.props
		return (
			<div style={styles.root}>
				<Card>
					<CardMedia>
						<img src={demand.link || "/img/adele.jpg"} />
					</CardMedia>
					<CardTitle title={demand.text} />
					<CardText>
						<List>
							<ListItem primaryText={contents["aghkZXZ-Tm9uZXIVCxIHQ29udGVudCIITW9kaWZpZWQM"] || "Modified"} secondaryText={demand.lastModified} disabled={true} />
							<ListItem primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudCIHQ3JlYXRlZAw"] || "Created"} secondaryText={demand.created} disabled={true} />
						</List>
					</CardText>
					<CardActions>
						<FlatButton 
							label={contents["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGRGVsZXRlDA"] || "Delete"}
							secondary={true}
							onTouchTap={this.handleDelete} 
						/>
					</CardActions>
				</Card>
				{
					(
						!showDialogDemand && 
						(
							(userID && userID === demand.userID) || 
							(
								isAdmin(userRoles) && 
								(accountID && accountID === demand.accountID)
							)
						)
					) && 
						<FloatingActionButton 
							secondary={true}
							style={styles.floatingActionButton}
							onTouchTap={this.toggleDialogDemand}
						>
							<ContentCreate />
						</FloatingActionButton>
				}
				{
					(!showDialogOffer && (accountID && accountID !== demand.accountID)) && 
						<FloatingActionButton 
							secondary={true}
							style={styles.floatingActionButton}
							onTouchTap={this.toggleDialogOffer}
						>
							<ContentAdd />
						</FloatingActionButton>
				}
				<DialogDemand
					contents={contents} 
					title={contents[""] || "Update The Demand"}
					showDialog={showDialogDemand} 
					demand={demand} 
					toggleDialog={this.toggleDialogDemand}
				/>
				<DialogOffer
					contents={contents} 
					title={contents[""] || "Make An Offer"}
					uID={userID}
					dID={params.ID}
					showDialog={showDialogOffer} 
					toggleDialog={this.toggleDialogOffer}
				/>
			</div>
		)
	}
}

// For "undefined required demand" error when refreshing the demand.
Demand.defaultProps = {
	contents: {}, 
	demand: {}
}

Demand.propTypes = {
	contents: PropTypes.object.isRequired, 
	demand: PropTypes.object.isRequired, 
	offers: PropTypes.object.isRequired, 
	userID: PropTypes.string, 
	accountID: PropTypes.string, 
	userRoles: PropTypes.object, 
	demandGet: PropTypes.func.isRequired, 
	demandsDelete: PropTypes.func.isRequired, 
	tagsByFilterGet: PropTypes.func.isRequired, 
	offersGet: PropTypes.func.isRequired
}

export default Demand
