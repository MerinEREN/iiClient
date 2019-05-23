import React, {Component} from "react"
import PropTypes from "prop-types"
import browserHistory from "react-router/lib/browserHistory"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentAdd from "material-ui/svg-icons/content/add"
import SelectField from "material-ui/SelectField"
import AutoComplete from "material-ui/AutoComplete"
import MenuItem from "material-ui/MenuItem"
import Chip from "material-ui/Chip"
import Avatar from "material-ui/Avatar"
import {blue300} from "material-ui/styles/colors"
import FlatButton from "material-ui/FlatButton"
import {firstLettersGenerate} from "./utilities"
import {filterAnObjectByKeys} from "../middlewares/utilities"

class UserSettings extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tagsAddShow: false, 
			searchText: "", 
			rolesAddShow: false
		}
		this.handleTagUserDelete = this.handleTagUserDelete.bind(this)
		this.tagsAddToggle = this.tagsAddToggle.bind(this)
		this.handleAutoComplete = this.handleAutoComplete.bind(this)
		this.handleNewRequest = this.handleNewRequest.bind(this)
		this.handleTagsUserPost= this.handleTagsUserPost.bind(this)
		this.handleRoleUserDelete = this.handleRoleUserDelete.bind(this)
		this.rolesAddToggle = this.rolesAddToggle.bind(this)
		this.handleRolesFieldChange = this.handleRolesFieldChange.bind(this)
		this.handleRolesUserPost= this.handleRolesUserPost.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		const {
			params: {ID}, 
			IDUserLogged, 
			tagsUserGet, 
			rolesUserGet, 
			userGet
		} = this.props
		// Get user datas, user's tags and user's roles 
		// if only logged user is an admin and 
		// visited user is not logged user, otherwise use logged user as user.
		if (
			ID && 
			IDUserLogged !== "" && 
			ID !== IDUserLogged
		) {
			tagsUserGet({
				URL: `/tagsUser?q=${ID}`, 
				key: ID
			})
			rolesUserGet({
				URL: `/rolesUser?q=${ID}`, 
				key: ID
			})
			userGet({
				URL:`/users/${ID}`, 
				key: ID
			})
		}
	}
	// For page refresh
	componentWillReceiveProps(nextProps) {
		const {
			params: {ID}, 
			tagsUserGet, 
			rolesUserGet, 
			userGet
		} = this.props
		// Get user datas, user's tags and user's roles 
		// if only logged user is an admin and 
		// visited user is not logged user, otherwise use logged user as user.
		if ( 
			ID && 
			nextProps.IDUserLogged !== "" && 
			ID !== nextProps.IDUserLogged
		) {
			tagsUserGet({
				URL: `/tagsUser?q=${ID}`, 
				key: ID
			})
			rolesUserGet({
				URL: `/rolesUser?q=${ID}`, 
				key: ID
			})
			userGet({
				URL:`/users/${ID}`, 
				key: ID
			})
		}
	}
	handleRoleUserDelete(rID) {
		const {
			params: {ID},
			roleUserDelete
		} = this.props
		roleUserDelete({
			URL: `/rolesUser?uID=${ID}&rID=${rID}`, 
			data: {
				value: [rID]
			}, 
			key: ID
		})
	}
	handleTagUserDelete(tID) {
		const {
			params: {ID},
			tagUserDelete
		} = this.props
		tagUserDelete({
			URL: `/tagsUser?uID=${ID}&tID=${tID}`, 
			data: {
				value: [tID]
			}, 
			key: ID
		})
	}
	handleDelete() {
		const {
			params: {ID}, 
			IDAccount, 
			userDelete
			/*
			rolesUserRemove, 
			tagsUserRemove, 
			roleIDsSelectedByKeyRemove, 
			tagIDsSelectedByKeyRemove
			*/
		} = this.props
		userDelete({
			URL: `/users/${ID}`, 
			data: {
				value: [ID]
			}, 
			key: IDAccount
		}).then(response => {
			if (response.ok) {
				// ALSO REMOVE THE USER REFERENCE FROM THE 
				// "usersPagination" (pagination.users[ID]) !!!!!!!!!!!!!!!
				/* 
				rolesUserRemove(ID)
				tagsUserRemove(ID)
				roleIDsSelectedByKeyRemove(ID) 
				tagIDsSelectedByKeyRemove(ID)
				*/
			}
		})
		browserHistory.goBack()
	}
	tagsAddToggle() {
		const {
			tagsAddShow
		} = this.state
		const {
			tagsGet
		} = this.props
		// For minor performance improvements only
		if (!tagsAddShow)
			// Getting most used six tags 
			// to show as initial autocomplete values 
			// if they does not exist yet.
			tagsGet({
				URL: "/tags?q=top", 
				key: "top"
			})
		this.setState({tagsAddShow: !tagsAddShow})
	}
	rolesAddToggle() {
		const {
			rolesAddShow
		} = this.state
		const {
			rolesGet
		} = this.props
		// For minor performance improvements only
		if (!rolesAddShow)
			rolesGet()
		this.setState({rolesAddShow: !rolesAddShow})
	}
	handleRolesUserPost() {
		const {
			params: {ID}, 
			roleIDsSelected, 
			rolesUserPost
		} = this.props
		rolesUserPost({
			URL: `/rolesUser?q=${ID}`, 
			data: {
				// type: "JSON" is default
				value: roleIDsSelected
			}, 
			key: ID
		})
	}
	handleTagsUserPost() {
		const {
			params: {ID}, 
			tagIDsSelected, 
			tagsUserPost
		} = this.props
		tagsUserPost({
			URL: `/tagsUser?q=${ID}`, 
			data: {
				// type: "JSON" is default
				value: tagIDsSelected
			}, 
			key: ID
		})
	}
	// INDEX AND VALUES ARE FOR SELECT FIELD ONLY
	handleRolesFieldChange(event, index, values) {
		const {
			params: {ID}, 
			roleIDsSelectedByKeySet
		} = this.props
		roleIDsSelectedByKeySet({[ID]: values})
	}
	handleAutoComplete(v) {
		const {
			tagsGet
		} = this.props
		clearTimeout(this.timer)
		if (v.length > 2) {
			this.timer = setTimeout(() => tagsGet({
				URL: `/tags?q=${v}`, 
				key: v
			}), 1000)
		}
		this.setState({
			searchText: v
		})
	}
	handleNewRequest(obj) {
		const {
			params: {ID}, 
			tagIDSelectedByKeyAdd
		} = this.props
		tagIDSelectedByKeyAdd(ID, obj.value.key)
		this.setState({
			searchText: ""
		})
	}
	handleTagIDRemove(tID) {
		const {
			params: {ID}, 
			tagIDSelectedByKeyRemove
		} = this.props
		tagIDSelectedByKeyRemove(ID, tID)
	}
	dataSourceTags(contexts, searchText) {
		const {
			tagsPagination, 
			tags, 
			tagsUser, 
			tagIDsSelected
		} = this.props
		const IDs = tagsPagination[searchText] ? 
			tagsPagination[searchText].IDs :
			(
				tagsPagination.top ?
				tagsPagination.top.IDs : 
				[]
			)
		const tagsFiltered = filterAnObjectByKeys(tags, IDs)
		// CHECK RETURNED ARRAY ELEMENTS FOR null and undefined VALUES !!!!!!!!!!!!
		return Object.entries(tagsFiltered)
			.map(([k, v]) => {
				return (
					tagIDsSelected.indexOf(k) === -1 && 
					!tagsUser.hasOwnProperty(k)
				) && {
					text: "", 
					value: (
						<MenuItem
							key={k}
							value={k}
							primaryText={contexts[v.contextID]}
						/>
					)
				}
			})
	}
	tagsSelected(contexts) {
		const {
			tags, 
			tagIDsSelected
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
						contexts[tags[v].contextID]
					)}
				</Avatar>
				{contexts[tags[v].contextID]}
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
				hintText={contexts["aghkZXZ-Tm9uZXIZCxIHQ29udGVudCIMU2VhcmNoIGEgdGFnDA"] || "Search a tag"}
				floatingLabelText={contexts["aghkZXZ-Tm9uZXIQCxIHQ29udGVudCIDVGFnDA"] || "Tag"}
				onUpdateInput={this.handleAutoComplete} 
				onNewRequest={this.handleNewRequest}
				openOnFocus={true}
			/>
			{this.tagsSelected(contexts)}
		</div>
	}
	tagsUser(contexts, tagsUser) {
		// IF ID PRESENT ITEMS SHOULD BE DELETABLE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		return <List>
			{
				Object.entries(tagsUser).map(([k, v]) => 
					<ListItem
						key={k}
						children={
							<Chip>
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
	rolesUser(contexts, rolesUser) {
		// IF ID PRESENT ITEMS SHOULD BE DELETABLE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		return <List>
			{
				Object.entries(rolesUser).map(([k, v]) => 
					<ListItem
						key={k}
						children={
							<Chip>
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
	roleItems(contexts, roleIDsSelected, rolesUser) {
		const {
			roles
		} = this.props
		return Object.entries(roles).map(([k, v]) => <MenuItem
			key={k}
			value={k}
			primaryText={contexts[v.contextID]}
			checked={roleIDsSelected.indexOf(k) > -1}
			disabled={rolesUser.hasOwnProperty(k)}
			insetChildren={true}
		/>)
	}
	selectFieldRoles(contexts, roleIDsSelected, rolesUser) {
		return <SelectField 
			hintText={"Add roles"}
			floatingLabelText={contexts["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFUm9sZXMM"] || "Roles"}
			value={roleIDsSelected}
			onChange={this.handleRolesFieldChange}
			multiple={true}
		>
			{this.roleItems(
				contexts, 
				roleIDsSelected, 
				rolesUser
			)}
		</SelectField>
	}
	render() {
		const {
			tagsAddShow, 
			rolesAddShow
		} = this.state
		const {
			params: {ID}, 
			contexts, 
			IDUserLogged, 
			user, 
			rolesUser, 
			tagsUser, 
			roleIDsSelected, 
			tagIDsSelected
		} = this.props
		return (
			<div>
				<h1>
					{
						(user.name && user.name.first) ? 
						`${user.name.first} ${user.name.last}` : 
						user.email
					}
				</h1>
				{
					Object.keys(rolesUser).length && 
						this.rolesUser(contexts, rolesUser)
				}
				{
					rolesAddShow ?
						<div>
							{
								this.selectFieldRoles(
									contexts, 
									roleIDsSelected, 
									rolesUser
								)
							}
							{
								roleIDsSelected.length && <FlatButton
									label={contexts["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEU2F2ZQw"] || "Save"}
									primary={true}
									onTouchTap={this.handleRolesUserPost}
								/>
							}
							<FlatButton
								label={contexts["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFQ2xvc2UM"] || "Close"}
								onTouchTap={this.rolesAddToggle}
							/>
						</div> : 
						ID &&
						<FloatingActionButton 
							mini={true} 
							style={styles.floatingActionButton}
							onTouchTap={this.rolesAddToggle}
						>
							<ContentAdd />
						</FloatingActionButton>
				}
				{
					Object.keys(tagsUser).length && 
						this.tagsUser(contexts, tagsUser)
				}
				{
					tagsAddShow ? 
						<div>
							{
								this.autoCompleteTags(contexts)
							}
							{
								tagIDsSelected.length && <FlatButton
									label={contexts["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEU2F2ZQw"] || "Save"}
									primary={true}
									onTouchTap={this.handleTagsUserPost}
								/>
							}
							<FlatButton
								label={contexts["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFQ2xvc2UM"] || "Close"}
								onTouchTap={this.tagsAddToggle}
							/>
						</div> : 
						ID &&
						<FloatingActionButton 
							mini={true} 
							style={styles.floatingActionButton}
							onTouchTap={this.tagsAddToggle}
						>
							<ContentAdd />
						</FloatingActionButton>
				}
				{
					(
						ID && 
						IDUserLogged !== "" && 
						IDUserLogged !== ID && 
						IDAccount !== ""
					) && 
						<FlatButton 
							label={contexts["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGRGVsZXRlDA"] || "Delete"}
							secondary={true}
							onTouchTap={this.handleDelete} 
						/>
				}
			</div>)
	}
}

UserSettings.defaultProps = {
	contexts: {}, 
	IDAccount: "", 
	IDUserLogged: "", 
	user: {}, 
	rolesUser: {}
}

UserSettings.propTypes = {
	contexts: PropTypes.object.isRequired, 
	IDAccount: PropTypes.string.isRequired, 
	IDUserLogged: PropTypes.string.isRequired, 
	user: PropTypes.object.isRequired, 
	roles: PropTypes.object, 
	tags: PropTypes.object, 
	rolesUser: PropTypes.object.isRequired, 
	tagsUser: PropTypes.object, 
	roleIDsSelected: PropTypes.array, 
	tagIDsSelected: PropTypes.array, 
	userGet: PropTypes.func.isRequired, 
	rolesGet: PropTypes.func.isRequired, 
	tagsGet: PropTypes.func.isRequired, 
	rolesUserGet: PropTypes.func.isRequired, 
	tagsUserGet: PropTypes.func.isRequired, 
	roleIDsSelectedByKeySet: PropTypes.func.isRequired, 
	tagIDSelectedByKeyAdd: PropTypes.func.isRequired, 
	tagIDSelectedByKeyRemove: PropTypes.func.isRequired, 
	rolesUserPost: PropTypes.func.isRequired, 
	tagsUserPost: PropTypes.func.isRequired, 
	roleUserDelete: PropTypes.func.isRequired, 
	tagUserDelete: PropTypes.func.isRequired, 
	userDelete: PropTypes.func.isRequired
}

export default UserSettings
