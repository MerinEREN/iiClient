import React, {Component} from "react"
import PropTypes from "prop-types"
import browserHistory from "react-router/lib/browserHistory"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"
import FlatButton from "material-ui/FlatButton"
import {isAdmin} from "./utilities"
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import {blue300} from "material-ui/styles/colors"
import {getFirstLetters} from "./utilities"

class UserSettings extends Component {
	constructor(props) {
		super(props)
		this.state = {
			fetchUser: true
		}
		this.handleRolesInputChange = this.handleRolesInputChange.bind(this)
		this.handleTagsInputChange = this.handleTagsInputChange.bind(this)
		this.handlePostRoles = this.handlePostRoles.bind(this)
		this.handlePostTags = this.handlePostTags.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		const {
			params: {ID}, 
			rolesGet, 
			tagsGet, 
			userRolesGet, 
			userTagsGet
		} = this.props
		// Only logged admin user sets selected user's roles and tags,
		// that's why requests are in this code block.
		if (ID) {
			rolesGet()
			tagsGet()
			userRolesGet({
				URL: `/userRoles/${ID}`, 
				key: ID
			})
			userTagsGet({
				URL: `/userTags/${ID}`, 
				key: ID
			})
		}
	}
	componentWillReceiveProps(nextProps) {
		const {
			params: {ID}, 
			user, 
			userGet
		} = this.props
		// Get user datas if only logged user is an admin.
		if (ID && this.state.fetchUser) {
			// Get selected non logged user's data.
			if (nextProps.userLogged.ID !== ID) {
				userGet({
					URL:`/users/${ID}`
				})
				this.setState({fetchUser: false})
			}
		}
	}
	// INDEX AND VALUES ARE FOR SELECT FIELD ONLY
	handleRolesInputChange(event, index, values) {
		this.props.roleIDsSelectedByUserSet(this.props.user.ID, values)
	}
	// INDEX AND VALUES ARE FOR SELECT FIELD ONLY
	handleTagsInputChange(event, index, values) {
		this.props.tagIDsSelectedByUserSet(this.props.user.ID, values)
	}
	handlePostRoles() {
		const {
			user: {ID}, 
			roles, 
			roleIDsSelected, 
			userRolesPost
		} = this.props
		userRolesPost({
			URL: `/userRoles/${ID}`, 
			body: {
				// type: "JSON" is default
				data: roleIDsSelected
			}, 
			stateSlice: roles, 
			key: ID
		})
	}
	handlePostTags() {
		const {
			user: {ID}, 
			tags, 
			tagIDsSelected, 
			userTagsPost
		} = this.props
		userTagsPost({
			URL: `/userTags/${ID}`, 
			body: {
				// type: "JSON" is default
				data: tagIDsSelected
			}, 
			stateSlice: tags, 
			key: ID
		})
	}
	handleDeleteRole(ID) {
		const {
			user: {ID: uID},
			userRoleDelete
		} = this.props
		userRoleDelete({
			URL: `/userRoles/${uID}/${ID}`, 
			body: {
				data: [ID]
			}, 
			key: uID
		})
	}
	handleDeleteTag(ID) {
		const {
			user: {ID: uID},
			userTagDelete
		} = this.props
		userTagDelete({
			URL: `/userTags/${uID}/${ID}`, 
			body: {
				data: [ID]
			}, 
			key: uID
		})
	}
	handleDelete() {
		const {
			params: {ID}, 
			userDelete, 
			userRolesRemove, 
			userTagsRemove, 
			roleIDsSelectedByUserRemove, 
			tagIDsSelectedByUserRemove
		} = this.props
		userDelete({
			URL: `/users/${ID}`, 
			body: {
				data: [ID]
			}
		}).then(response => {
			if (response.ok) {
				userRolesRemove(ID)
				userTagsRemove(ID)
				roleIDsSelectedByUserRemove(ID) 
				tagIDsSelectedByUserRemove(ID)
			}
		})
		browserHistory.goBack()
	}
	roleItems(contents, roles, userRoles, roleIDsSelected) {
		return Object.entries(roles).map(([k, v]) => <MenuItem
			key={k}
			value={k}
			primaryText={contents[v.contentID]}
			checked={roleIDsSelected.indexOf(k) > -1}
			disabled={userRoles.hasOwnProperty(k)}
			insetChildren={true}
		/>)
	}
	tagItems(contents, tags, userTags, tagIDsSelected) {
		return Object.entries(tags).map(([k, v]) => <MenuItem
			key={k}
			value={k}
			primaryText={contents[v.contentID]}
			checked={tagIDsSelected.indexOf(k) > -1}
			disabled={userTags.hasOwnProperty(k)}
			insetChildren={true}
		/>)
	}
	rolesUserAndSelected(contents, roles, userRoles, roleIDsSelected) {
		let rolesSelected
		for (let v of roleIDsSelected) {
			rolesSelected = {
				...rolesSelected,
				[v]: {...roles[v], type: "selected"}
			}
		}
		const rolesUserAndSelected = {
			...userRoles, 
			...rolesSelected
		}
		return Object.entries(rolesUserAndSelected).map(([k, v]) => 
			<Chip 
				key={k}
				onRequestDelete={
					(v.type || Object.keys(userRoles).length === 1) ? 
					null : 
					() => this.handleDeleteRole(k)
				}
			>
				<Avatar 
					size={32}
					color={blue300}
				>
					{getFirstLetters(contents[v.contentID])}
				</Avatar>
				{contents[v.contentID]}
			</Chip>
		)
	}
	tagsUserAndSelected(contents, tags, userTags, tagIDsSelected) {
		let tagsSelected
		for (let v of tagIDsSelected) {
			tagsSelected = {
				...tagsSelected, 
				[v]: {...tags[v], type: "selected"}
			}
		}
		const tagsUserAndSelected = {
			...userTags, 
			...tagsSelected
		}
		return Object.entries(tagsUserAndSelected).map(([k, v]) => 
			<Chip 
				key={k}
				onRequestDelete={
					v.type ? 
					null : 
					() => this.handleDeleteTag(k)
				}
			>
				<Avatar 
					size={32}
					color={blue300}
				>
					{getFirstLetters(contents[v.contentID])}
				</Avatar>
				{contents[v.contentID]}
			</Chip>
		)
	}
	render() {
		const {
			params: {ID}, 
			contents, 
			userLogged, 
			user, 
			roles, 
			tags, 
			userRoles, 
			userTags, 
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
					ID && 
					<SelectField 
						multiple={true}
						hintText={"Add roles"}
						value={roleIDsSelected}
						floatingLabelText={contents["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFUm9sZXMM"] || "Roles"}
						onChange={this.handleRolesInputChange}
					>
						{this.roleItems(
							contents, 
							roles, 
							userRoles, 
							roleIDsSelected
						)}
					</SelectField>
				}
				{
					this.rolesUserAndSelected(
						contents, 
						roles, 
						userRoles, 
						roleIDsSelected
					)
				}
				{
					roleIDsSelected.length > 0 && 
						<FlatButton
							label={contents["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEU2F2ZQw"] || "Save"}
							primary={true}
							onTouchTap={this.handlePostRoles}
						/>
				}
				{
					ID && 
					<SelectField 
						multiple={true}
						hintText={"Add tags"}
						value={tagIDsSelected}
						floatingLabelText={contents["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEVGFncww"] || "Tags"}
						onChange={this.handleTagsInputChange}
					>
						{this.tagItems(
							contents, 
							tags, 
							userTags, 
							tagIDsSelected
						)}
					</SelectField>
				}
				{
					this.tagsUserAndSelected(
						contents, 
						tags, 
						userTags, 
						tagIDsSelected
					)
				}
				{
					tagIDsSelected.length > 0 && 
						<FlatButton
							label={contents["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEU2F2ZQw"] || "Save"}
							primary={true}
							onTouchTap={this.handlePostTags}
						/>
				}
				{
					(ID && userLogged.ID !== ID) && 
						<FlatButton 
							label={contents["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGRGVsZXRlDA"] || "Delete"}
							secondary={true}
							onTouchTap={this.handleDelete} 
						/>
				}
			</div>)
	}
}

UserSettings.defaultProps = {
	contents: {}
}

UserSettings.propTypes = {
	contents: PropTypes.object.isRequired, 
	userLogged: PropTypes.object.isRequired, 
	user: PropTypes.object.isRequired, 
	roles: PropTypes.object, 
	tags: PropTypes.object, 
	userRoles: PropTypes.object.isRequired, 
	userTags: PropTypes.object, 
	roleIDsSelected: PropTypes.array, 
	tagIDsSelected: PropTypes.array, 
	userGet: PropTypes.func.isRequired, 
	rolesGet: PropTypes.func.isRequired, 
	tagsGet: PropTypes.func.isRequired, 
	userRolesGet: PropTypes.func.isRequired, 
	userTagsGet: PropTypes.func.isRequired, 
	roleIDsSelectedByUserSet: PropTypes.func.isRequired, 
	tagIDsSelectedByUserSet: PropTypes.func.isRequired, 
	userRolesPost: PropTypes.func.isRequired, 
	userTagsPost: PropTypes.func.isRequired, 
	userRoleDelete: PropTypes.func.isRequired, 
	userTagDelete: PropTypes.func.isRequired, 
	userDelete: PropTypes.func.isRequired, 
	userRolesRemove: PropTypes.func.isRequired, 
	userTagsRemove: PropTypes.func.isRequired, 
	roleIDsSelectedByUserRemove: PropTypes.func.isRequired, 
	tagIDsSelectedByUserRemove: PropTypes.func.isRequired
}

export default UserSettings
