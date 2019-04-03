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
import DialogDemandUpdate from "../containers/dialogDemandUpdate"
import DialogOfferCreate from "../containers/DialogOfferCreate"
import {isAdmin} from "./utilities"
import Chip from "material-ui/Chip"
import Avatar from "material-ui/Avatar"
import {blue300} from "material-ui/styles/colors"
import {firstLettersGenerate} from "./utilities"

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
			tagsInputShow: false, 
			dialogDemandShow: false, 
			dialogOfferShow: false
		}
		this.tagsInputToggle = this.tagsInputToggle.bind(this)
		this.dialogDemandToggle = this.dialogDemandToggle.bind(this)
		this.dialogOfferToggle = this.dialogOfferToggle.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		const {
			params: {ID}, 
			tagsDemandGet, 
			demandGet, 
			offersGet
		} = this.props
		photosGet({
			URL: `/photos?q=${ID}`, 
			key: ID
		})
		tagsDemandGet({
			URL: `/tagsDemand?q=${ID}`, 
			key: ID
		})
		offersGet({
			URL: `/offers?q=${ID}`, 
			key: ID
		})
		demandGet({
			URL: `/demands/${ID}`, 
			key: ID
		})
	}
	handleDelete() {
		const {
			params: {accID, ID}, 
			demandDelete
		} = this.props
		// WHEN LISTING DEMANDS, BE CAREFULL ABOUT "undefined" VALUE OF 
		// "entitiesBuffered[ID]" !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// OR FIND A WAY TO DELETE THE "ID" FROM ALL "pagination[key].IDs" !!!!!!!!
		demandDelete({
			URL: `/demands/${ID}`, 
			data: {
				value: [ID]
			}, 
			key: accID || "timeline"
		})
		browserHistory.goBack()
	}
	tagsInputToggle() {
		const {
			tagsInputShow
		} = this.state
		this.setState({tagsInputShow: !tagsInputShow})
		// For minor performance improvements only
		if (tagsInputShow)
			// Getting most used six tags 
			// to show as initial autocomplete values 
			// if they does not exist yet.
			this.props.tagsGet({
				URL: "/tags?q=top", 
				key: "top"
			})
	}
	dialogDemandToggle() {
		const {
			dialogDemandShow
		} = this.state
		this.setState({dialogDemandShow: !dialogDemandShow})
	}
	dialogOfferToggle() {
		const {
			dialogOfferShow
		} = this.state
		this.setState({dialogOfferShow: !dialogOfferShow})
	}
	tagsDemand(tags, contexts) {
		return <List>
			{
				Object.entries(tags).map(([k, v]) => 
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
									{firstLettersGenerate(contexts[v.contextID])}
								</Avatar>
								{contexts[v.contextID]}
							</Chip>
						}
						disabled={true} 
					/>
				)
			}
		</List>
	}
	photosDemand(photos) {
		return <List>
			{
				photos.map(v => {
					return <ListItem 
						key={v.link}
						children={<img 
							src={v.link} 
						/>}
						disabled={true}
					/>
				})
			}
		</List>
	}
	offersDemand(offers, ID) {
		// WHY IS IT AN ABSOLUTE LINK, RELATIVE PATH IS MORE CONVENIENT !!!!!!!!!!!
		return offers && <List>
			{
				Object.values(offers).map(v => <ListItem 
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
			dialogDemandShow, 
			dialogOfferShow
		} = this.state
		const {
			params: {ID}, 
			contexts, 
			photosDemand, 
			tagsDemand, 
			offersDemand, 
			demand, 
			userID, 
			accountID, 
			rolesUser
		} = this.props
		return (
			<div style={styles.root}>
				<Card>
					<CardTitle title={demand.status} />
					<CardText>
						<List>
							<ListItem primaryText={contexts["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"] || "Description"} secondaryText={demand.description} disabled={true} />
							<ListItem primaryText={contexts["aghkZXZ-Tm9uZXIVCxIHQ29udGVudCIITW9kaWZpZWQM"] || "Modified"} secondaryText={demand.lastModified} disabled={true} />
							<ListItem primaryText={contexts["aghkZXZ-Tm9uZXIUCxIHQ29udGVudCIHQ3JlYXRlZAw"] || "Created"} secondaryText={demand.created} disabled={true} />
						</List>
					</CardText>
					<CardActions>
						{
							demand.status !== "accepted" && 
								(
									(userID && userID === demand.userID) || 
									(
										isAdmin(rolesUser) && 
										(accountID && accountID === demand.accountID)
									) ?
									<FlatButton 
										label={contexts["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGRGVsZXRlDA"] || "Delete"}
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
					this.tagsDemand(tagsDemand, context)
				}
				<Divider />
				{
					this.photosDemand(photosDemand)
				}
				<Divider />
				{
					demand.status !== "accepted" && 
					this.offersDemand(offersDemand, ID)
				}
				{
					(
						!dialogDemandShow && 
						demand.status !== "accepted" && 
						(
							offersDemand && 
							Object.values(offersDemand).length === 0 
						) && 
						(
							(userID && userID === demand.userID) || 
							(
								isAdmin(rolesUser) && 
								(accountID && accountID === demand.accountID)
							)
						)
					) && 
						<FloatingActionButton 
							secondary={true}
							style={styles.floatingActionButton}
							onTouchTap={this.dialogDemandToggle}
						>
							<contentCreate />
						</FloatingActionButton>
				}
				{
					(
						demand.status !== "accepted" && 
						!dialogOfferShow && 
						(accountID && accountID !== demand.accountID)
					) && 
						<FloatingActionButton 
							secondary={true}
							style={styles.floatingActionButton}
							onTouchTap={this.dialogOfferToggle}
						>
							<contentAdd />
						</FloatingActionButton>
				}
				<DialogDemandUpdate
					contexts={contexts} 
					title={contexts["aghkZXZ-Tm9uZXIeCxIHQ29udGVudCIRVXBkYXRlIFRoZSBEZW1hbmQM"] || "Update The Demand"}
					dialogShow={dialogDemandShow} 
					demand={demand} 
					tagIDsDemand={Object.keys(tagsDemand)} 
					dialogToggle={this.dialogDemandToggle}
				/>
				<DialogOfferCreate
					contexts={contexts} 
					title={contexts["aghkZXZ-Tm9uZXIaCxIHQ29udGVudCINTWFrZSBBbiBPZmZlcgw"] || "Make An Offer"}
					uID={userID}
					dID={ID}
					dialogShow={dialogOfferShow} 
					dialogToggle={this.dialogOfferToggle}
				/>
			</div>
		)
	}
}

Demand.defaultProps = {
	// Not necessary, because returned values by "filterAnObjectByKeys" 
	// returns at least an empty object.
	// contexts: {}, 
	// photosDemand: {}, 
	// tagsDemand: {}, 
	demand: {}
}

Demand.propTypes = {
	contexts: PropTypes.object.isRequired, 
	photosGet: PropTypes.func.isRequired, 
	photosDemand: PropTypes.object.isRequired, 
	tagsDemandGet: PropTypes.func.isRequired, 
	tagsDemand: PropTypes.object.isRequired, 
	tagsGet: PropTypes.func.isRequired, 
	tags: PropTypes.object.isRequired, 
	tagsPagination: PropTypes.object.isRequired, 
	offersGet: PropTypes.func.isRequired, 
	offersDemand: PropTypes.object, 
	demandGet: PropTypes.func.isRequired, 
	demand: PropTypes.object.isRequired, 
	userID: PropTypes.string, 
	accountID: PropTypes.string, 
	rolesUser: PropTypes.object, 
	demandDelete: PropTypes.func.isRequired
}

export default Demand
