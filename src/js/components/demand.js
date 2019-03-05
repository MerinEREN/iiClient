import React, {Component} from "react"
import PropTypes from "prop-types"
import browserHistory from "react-router/lib/browserHistory"
import Link from "react-router/lib/Link"
import {Card, CardActions, CardTitle, CardText} from "material-ui/Card"
import {List, ListItem} from "material-ui/List"
import Divider from "material-ui/Divider"
import FlatButton from "material-ui/FlatButton"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentCreate from "material-ui/svg-icons/content/create"
import ContentAdd from "material-ui/svg-icons/content/add"
import DialogDemand from "../containers/dialogDemand"
import DialogOffer from "../containers/dialogOffer"
import {isAdmin} from "./utilities"
import Chip from "material-ui/Chip"
import Avatar from "material-ui/Avatar"
import {blue300} from "material-ui/styles/colors"
import {getFirstLetters} from "./utilities"

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
	componentDidMount() {
		const {
			demandGet, 
			offersGet, 
			tagsGet, 
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
		tagsGet()
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
	demandTags(contents, tags, tagIDs) {
		if ((!tagIDs || tagIDs.length === 0) || Object.keys(tags).length === 0)
			return
		let tagsSelected = {}
		for (let v of tagIDs) {
			tagsSelected = {
				...tagsSelected, 
				[v]: tags[v]
			}
		}
		return <List>
			{
				Object.entries(tagsSelected).map(([k, v]) => 
					<ListItem
						key={k}
						children={
							<Chip
								key={k}
							>
								<Avatar 
									size={32}
									color={blue300}
								>
									{getFirstLetters(contents[v.contentID])}
								</Avatar>
								{contents[v.contentID]}
							</Chip>
						}
						disabled={true} 
					/>
				)
			}
		</List>
	}
	demandPhotos(links) {
		if (!links || links.length === 0)
			return
		return <List>
			{
				links.map(v => {
					if (v)
						return <ListItem 
							key={v}
							children={<img 
								key={v} 
								src={v} 
							/>}
							disabled={true}
						/>
				})
			}
		</List>
	}
	offers(ID, os) {
		return <List>
			{
				Object.values(os).map(v => <ListItem 
					key={v.ID}
					primaryText={v.explanation}
					secondaryText={v.amount} 
					containerElement={
						<Link 
							to={`/${ID}/offers/${v.ID}`} 
						/> 
					}
				/>)
			}
		</List>
	}
	render() {
		const {
			showDialogDemand, 
			showDialogOffer
		} = this.state
		const {
			params: {ID}, 
			contents, 
			tags, 
			demand, 
			offers, 
			userID, 
			accountID, 
			userRoles
		} = this.props
		return (
			<div style={styles.root}>
				<Card>
					<CardTitle title={demand.status} />
					<CardText>
						<List>
							<ListItem primaryText={contents["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"] || "Description"} secondaryText={demand.explanation} disabled={true} />
							<ListItem primaryText={contents["aghkZXZ-Tm9uZXIVCxIHQ29udGVudCIITW9kaWZpZWQM"] || "Modified"} secondaryText={demand.lastModified} disabled={true} />
							<ListItem primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudCIHQ3JlYXRlZAw"] || "Created"} secondaryText={demand.created} disabled={true} />
						</List>
					</CardText>
					<CardActions>
						{
							demand.status !== "accepted" && 
								(
									(userID && userID === demand.userID) || 
									(
										isAdmin(userRoles) && 
										(accountID && accountID === demand.accountID)
									) ?
									<FlatButton 
										label={contents["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGRGVsZXRlDA"] || "Delete"}
										secondary={true}
										onTouchTap={this.handleDelete} 
									/> : 
									null
								)
						}
					</CardActions>
				</Card>
				<Divider />
				{
					this.demandTags(contents, tags, demand.tagIDs)
				}
				<Divider />
				{
					this.demandPhotos(demand.linksPhoto)
				}
				<Divider />
				{
					demand.status !== "accepted" && 
					this.offers(ID, offers)
				}
				{
					(
						!showDialogDemand && 
						demand.status !== "accepted" && 
						Object.values(offers).length === 0 && 
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
					(
						demand.status !== "accepted" && 
						!showDialogOffer && 
						(accountID && accountID !== demand.accountID)
					) && 
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
					title={contents["aghkZXZ-Tm9uZXIeCxIHQ29udGVudCIRVXBkYXRlIFRoZSBEZW1hbmQM"] || "Update The Demand"}
					showDialog={showDialogDemand} 
					demand={demand} 
					toggleDialog={this.toggleDialogDemand}
				/>
				<DialogOffer
					contents={contents} 
					title={contents["aghkZXZ-Tm9uZXIaCxIHQ29udGVudCINTWFrZSBBbiBPZmZlcgw"] || "Make An Offer"}
					uID={userID}
					dID={ID}
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
	tags: PropTypes.object.isRequired, 
	demand: PropTypes.object.isRequired, 
	offers: PropTypes.object.isRequired, 
	userID: PropTypes.string, 
	accountID: PropTypes.string, 
	userRoles: PropTypes.object, 
	tagsGet: PropTypes.func.isRequired, 
	demandGet: PropTypes.func.isRequired, 
	demandsDelete: PropTypes.func.isRequired, 
	tagsByFilterGet: PropTypes.func.isRequired, 
	offersGet: PropTypes.func.isRequired
}

export default Demand
