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
import DialogOfferCreate from "../containers/dialogOfferCreate"
import AutoComplete from "material-ui/AutoComplete"
import MenuItem from "material-ui/MenuItem"
import Chip from "material-ui/Chip"
import Avatar from "material-ui/Avatar"
import {blue300} from "material-ui/styles/colors"
import {isAdmin, firstLettersGenerate} from "./utilities"
import {filterAnObjectByKeys} from "../middlewares/utilities"

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
		this.URL = new URL(window.location.href)
		this.state = {
			tagsAddShow: false, 
			searchText: "", 
			tagIDsSelected: [], 
			photosAddShow: false, 
			dialogDemandShow: false, 
			dialogOfferShow: false
		}
		this.tagsAddToggle = this.tagsAddToggle.bind(this)
		this.handleAutoComplete = this.handleAutoComplete.bind(this)
		this.handleNewRequest = this.handleNewRequest.bind(this)
		this.handleTagsDemandPost = this.handleTagsDemandPost.bind(this)
		this.photosAddToggle = this.photosAddToggle.bind(this)
		this.handlePhotosPost = this.handlePhotosPost.bind(this)
		this.dialogDemandToggle = this.dialogDemandToggle.bind(this)
		this.dialogOfferToggle = this.dialogOfferToggle.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		const {
			params: {ID}, 
			photosGet, 
			offersGet, 
			tagsDemandGet, 
			demandGet
		} = this.props
		this.URL.pathname = "/photos"
		this.URL.searchParams.set("pID", ID)
		photosGet({
			URL: this.URL, 
			key: ID
		})
		this.URL.pathname = "/tagsDemand"
		this.URL.searchParams.delete("pID", ID)
		this.URL.searchParams.set("dID", ID)
		tagsDemandGet({
			URL: this.URL, 
			key: ID
		})
		this.URL = new URL(window.location.href)
		demandGet({
			URL: this.URL, 
			key: ID
		}).then(response => {
			if (response.OK) {
				response.json().then(demand => {
					this.URL.pathname = "/offers"
					this.URL.searchParams.set("dID", ID)
					demand.status === "active" && 
						offersGet({
							URL: this.URL, 
							key: ID
						})
				})
			}
		})
	}
	// Clear auto complete request timeout.
	componentWillUnmount() {
		clearTimeout(this.timer)
	}
	tagsAddToggle() {
		const {
			tagsAddShow
		} = this.state
		const {
			tagsGet
		} = this.props
		// For minor performance improvements only
		if (!tagsAddShow) {
			/*
			Getting most used six tags 
			to show as initial autocomplete values 
			if they does not exist yet.
			*/
			this.URL = new URL("/tags", window.location.href)
			this.URL.searchParams.set("q", "top")
			tagsGet({
				URL: this.URL, 
				key: "top"
			})
		}
		this.setState({tagsAddShow: !tagsAddShow})
	}
	photosAddToggle() {
		const {
			photosAddShow
		} = this.state
		this.setState({photosAddShow: !photosAddShow})
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
	handleDelete() {
		const {
			params: {accID, ID}, 
			demandDelete
		} = this.props
		this.URL = new URL(window.location.href)
		// WHEN LISTING DEMANDS, BE CAREFULL ABOUT "undefined" VALUE OF 
		// "entitiesBuffered[ID]" !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// OR FIND A WAY TO DELETE THE "ID" FROM ALL "pagination[kind][key].IDs" !!
		demandDelete({
			URL: this.URL, 
			data: {
				value: [ID]
			}, 
			key: accID || "timeline"
		})
		browserHistory.goBack()
	}
	handleTagsDemandPost() {
		this.tagsAddToggle()
		const {
			tagIDsSelected
		} = this.state
		const {
			params: {ID}, 
			tagsDemandPost
		} = this.props
		this.URL = new URL("/tagsDemand", window.location.href)
		this.URL.searchParams.set("dID", ID)
		tagsDemandPost({
			URL: this.URL, 
			data: {
				value: tagIDsSelected
			}, 
			key: ID
		}).then(response => this.setState({tagIDsSelected: []}))
	}
	handlePhotosPost() {
		this.photosAddToggle()
		const {
			params: {ID}, 
			photosPost
		} = this.props
		let photos = []
		Object.values(this.file.files).forEach(v => {
			photos.push(v)
		})
		this.URL = new URL("/photos", window.location.href)
		this.URL.searchParams.set("pID", ID)
		photosPost({
			URL: this.URL, 
			data: {
				value: photos
			}, 
			key: ID
		})
	}
	handleAutoComplete(v) {
		const {
			tagsGet
		} = this.props
		clearTimeout(this.timer)
		if (v.length > 2) {
			this.timer = setTimeout(() => {
				this.URL = new URL(`/tags`, window.location.href)
				this.URL.searchParams.set("q", v)
				tagsGet({
				URL: this.URL, 
				key: v
			}), 1000})
		}
		this.setState({
			searchText: v
		})
	}
	handleNewRequest(obj) {
		const {
			tagIDsSelected
		} = this.state
		this.setState({
			searchText: "", 
			tagIDsSelected: [
				...tagIDsSelected, 
				obj.value.key
			]
		})
	}
	handleTagIDRemove(ID) {
		const {
			tagIDsSelected
		} = this.state
		let tagIDsUpdated = []
		tagIDsSelected.forEach(v => v !== ID && tagIDsUpdated.push(v))
		this.setState({tagIDsSelected: tagIDsUpdated})
	}
	dataSourceTags(contexts, searchText) {
		const {
			tagIDsSelected
		} = this.state
		const {
			tagsPagination, 
			tags, 
			tagsDemand
		} = this.props
		const IDs = tagsPagination[searchText] ? 
			tagsPagination[searchText].IDs :
			(
				tagsPagination.top ?
				tagsPagination.top.IDs : 
				[]
			)
		const tagsFiltered = filterAnObjectByKeys(tags, IDs)
		return Object.entries(tagsFiltered)
			.map(([k, v]) => {
				return (
					tagIDsSelected.indexOf(k) === -1 && 
					!tagsDemand.hasOwnProperty(k)
				) && {
					text: "", 
					value: (
						<MenuItem
							key={k}
							value={k}
							primaryText={contexts[v.contextID].value}
						/>
					)
				}
			})
	}
	tagsSelected(contexts) {
		const {
			tagIDsSelected
		} = this.state
		const {
			tags
		} = this.props
		return tagIDsSelected.map(v => 
			<Chip 
				key={v}
				onRequestDelete={() => this.handleTagIDRemove(v)}
			>
				<Avatar 
					size={32}
					color={blue300}
				>
					{firstLettersGenerate(
						contexts[tags[v].contextID].value
					)}
				</Avatar>
				{contexts[tags[v].contextID].value}
			</Chip>
		)
	}
	autoCompleteTags(contexts) {
		const {
			searchText
		} = this.state
		return <div>
			<AutoComplete
				searchText={searchText}
				filter={AutoComplete.noFilter}
				dataSource={this.dataSourceTags(contexts, searchText)}
				hintText={contexts["aghkZXZ-Tm9uZXIZCxIHQ29udGVudCIMU2VhcmNoIGEgdGFnDA"].value || "Search a tag"}
				floatingLabelText={contexts["aghkZXZ-Tm9uZXIQCxIHQ29udGVudCIDVGFnDA"].value || "Tag"}
				onUpdateInput={this.handleAutoComplete} 
				onNewRequest={this.handleNewRequest}
				openOnFocus={true}
			/>
			{this.tagsSelected(contexts)}
		</div>
	}
	tagsDemand(contexts, tagsDemand) {
		return <List>
			{
				Object.entries(tagsDemand).map(([k, v]) => 
					<ListItem
						key={k}
						children={
							<Chip>
								<Avatar 
									size={32}
									color={blue300}
								>
									{firstLettersGenerate(contexts[v.contextID].value)}
								</Avatar>
								{contexts[v.contextID].value}
							</Chip>
						}
						disabled={true} 
					/>
				)
			}
		</List>
	}
	photos(photos) {
		return <List>
			{
				Object.values(photos).map(v => {
					return <ListItem 
						key={v.ID}
						children={<img 
							src={v.link} 
						/>}
						disabled={true}
					/>
				})
			}
		</List>
	}
	fileInputPhotos() {
			<input 
				type="file"
				accept="image/*" 
				ref={input => this.file = input}
				multiple
			/>
	}
	// offers(offers, ID) {
	offers(offers) {
		return <List>
			{
				Object.values(offers).map(v => <ListItem 
					key={v.ID}
					primaryText={v.description}
					secondaryText={v.amount} 
					containerElement={
						<Link 
							to={`offers/${v.ID}`} 
							// to={`/${ID}/offers/${v.ID}`} 
						/> 
					}
				/>)
			}
		</List>
	}
	isDeletable(demand, userID, rolesUser, accountID) {
		return (
			demand.status !== "accepted" && 
			(
				(userID === demand.userID) || 
				(
					isAdmin(rolesUser) && 
					(accountID === demand.accountID)
				)
			)
		) ? true : false
	}
	isUpdatable(demand, offers, userID, rolesUser, accountID) {
		return (
			demand.status === "active" && 
			(
				offers && 
				Object.values(offers).length === 0 
			) && 
			(
				(userID === demand.userID) || 
				(
					isAdmin(rolesUser) && 
					(accountID === demand.accountID)
				)
			)
		) ? true : false
	}
	isOfferable(demand, accountID) {
		return (
			demand.status === "active" && 
			(accountID !== "" && accountID !== demand.accountID)
		) ? true : false
	}
	render() {
		const {
			tagsAddShow, 
			photosAddShow, 
			tagIDsSelected, 
			dialogDemandShow, 
			dialogOfferShow
		} = this.state
		const {
			params: {ID}, 
			contexts, 
			demand, 
			tagsDemand, 
			photos, 
			offers, 
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
							<ListItem primaryText={contexts["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"].value || "Description"} secondaryText={demand.description} disabled={true} />
							<ListItem primaryText={contexts["aghkZXZ-Tm9uZXIVCxIHQ29udGVudCIITW9kaWZpZWQM"].value || "Modified"} secondaryText={demand.lastModified} disabled={true} />
							<ListItem primaryText={contexts["aghkZXZ-Tm9uZXIUCxIHQ29udGVudCIHQ3JlYXRlZAw"].value || "Created"} secondaryText={demand.created} disabled={true} />
						</List>
					</CardText>
					{
						this.isDeletable(
							demand, 
							userID, 
							rolesUser, 
							accountID
						) && 
							<CardActions>
								<FlatButton 
									label={contexts["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGRGVsZXRlDA"].value || "Delete"}
									secondary={true}
									onTouchTap={this.handleDelete} 
								/>
							</CardActions>
					}
				</Card>
				<Divider />
				{
					Object.keys(tagsDemand).length && 
						this.tagsDemand(contexts, tagsDemand)
				}
				{
					tagsAddShow ? 
						<div>
							{
								this.autoCompleteTags(contexts)
							}
							{
								tagIDsSelected.length && <FlatButton
									label={contexts["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEU2F2ZQw"].value || "Save"}
									primary={true}
									onTouchTap={this.handleTagsDemandPost}
								/>
							}
							<FlatButton
								label={contexts["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFQ2xvc2UM"].value || "Close"}
								onTouchTap={this.tagsAddToggle}
							/>
						</div> : 
						this.isUpdatable(
							demand, 
							offers, 
							userID, 
							rolesUser, 
							accountID
						) &&
						<FloatingActionButton 
							mini={true} 
							style={styles.floatingActionButton}
							onTouchTap={this.tagsAddToggle}
						>
							<ContentAdd />
						</FloatingActionButton>
				}
				<Divider />
				{
					photos && this.photos(photos)
				}
				{
					photosAddShow ? 
						<div>
							{
								this.fileInputPhotos()
							}
							{
								Object.keys(this.file.files).length && <FlatButton
									label={contexts["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEU2F2ZQw"].value || "Save"}
									primary={true}
									onTouchTap={this.handlePhotosPost}
								/>
							}
							<FlatButton
								label={contexts["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFQ2xvc2UM"].value || "Close"}
								onTouchTap={this.photosAddToggle}
							/>
						</div> : 
						this.isUpdatable(
							demand, 
							offers, 
							userID, 
							rolesUser, 
							accountID
						) &&
						<FloatingActionButton 
							mini={true} 
							style={styles.floatingActionButton}
							onTouchTap={this.photosAddToggle}
						>
							<ContentAdd />
						</FloatingActionButton>
				}
				<Divider />
				{
					// offers && this.offers(offers, ID)
					offers && this.offers(offers, ID)
				}
				{
					(
						!dialogDemandShow && 
						this.isUpdatable(
							demand, 
							offers, 
							userID, 
							rolesUser, 
							accountID
						)
					) && 
						<FloatingActionButton 
							secondary={true}
							style={styles.floatingActionButton}
							onTouchTap={this.dialogDemandToggle}
						>
							<ContentCreate />
						</FloatingActionButton>
				}
				{
					(
						!dialogOfferShow && 
						this.isOfferable(demand, accountID)
					) && 
						<FloatingActionButton 
							secondary={true}
							style={styles.floatingActionButton}
							onTouchTap={this.dialogOfferToggle}
						>
							<ContentAdd />
						</FloatingActionButton>
				}
				<DialogDemandUpdate
					contexts={contexts} 
					title={contexts["aghkZXZ-Tm9uZXIeCxIHQ29udGVudCIRVXBkYXRlIFRoZSBEZW1hbmQM"].value || "Update The Demand"}
					dialogShow={dialogDemandShow} 
					demand={demand} 
					dialogToggle={this.dialogDemandToggle}
				/>
				<DialogOfferCreate
					contexts={contexts} 
					title={contexts["aghkZXZ-Tm9uZXIaCxIHQ29udGVudCINTWFrZSBBbiBPZmZlcgw"].value || "Make An Offer"}
					uID={userID}
					dialogShow={dialogOfferShow} 
					dialogToggle={this.dialogOfferToggle}
				/>
			</div>
		)
	}
}

Demand.defaultProps = {
	contexts: {}, 
	tagsDemand: {}, 
	demand: {}, 
	userID: "", 
	accountID: "", 
	rolesUser: {}
}

Demand.propTypes = {
	contexts: PropTypes.object.isRequired, 
	photosGet: PropTypes.func.isRequired, 
	photos: PropTypes.object, 
	tagsDemandGet: PropTypes.func.isRequired, 
	tagsDemand: PropTypes.object.isRequired, 
	tagsGet: PropTypes.func.isRequired, 
	tags: PropTypes.object, 
	tagsPagination: PropTypes.object, 
	offersGet: PropTypes.func.isRequired, 
	offers: PropTypes.object, 
	demandGet: PropTypes.func.isRequired, 
	demand: PropTypes.object.isRequired, 
	userID: PropTypes.string.isRequired, 
	accountID: PropTypes.string.isRequired, 
	rolesUser: PropTypes.object.isRequired, 
	photosPost: PropTypes.func.isRequired, 
	tagsDemandPost: PropTypes.func.isRequired, 
	demandDelete: PropTypes.func.isRequired
}

export default Demand
