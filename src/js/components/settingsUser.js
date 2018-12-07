import React, {Component} from "react"
import PropTypes from "prop-types"
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
		this.handleRolesInputChange = this.handleRolesInputChange.bind(this)
		this.handleTagsInputChange = this.handleTagsInputChange.bind(this)
		this.handlePostRoles = this.handlePostRoles.bind(this)
		this.handlePostTags = this.handlePostTags.bind(this)
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
		if (ID) {
			// Get selected non logged user's data.
			if (nextProps.userLogged.ID !== ID) {
				userGet({
					URL:`/users/${ID}`
				})
			}
		}
	}
	// INDEX AND VALUES ARE FOR SELECT FIELD ONLY
	handleRolesInputChange(event, index, values) {
		this.props.roleIDsSelectedByUserReset(this.props.user.ID, values)
	}
	// INDEX AND VALUES ARE FOR SELECT FIELD ONLY
	handleTagsInputChange(event, index, values) {
		this.props.tagIDsSelectedByUserReset(this.props.user.ID, values)
	}
	handlePostRoles() {
		const {
			user: {ID}, 
			roleIDsSelected, 
			userRolesPost
		} = this.props
		userRolesPost({
			URL: `/userRoles/${ID}`, 
			body: {
				// type: "JSON" is default
				data: roleIDsSelected
			}
		})
	}
	handlePostTags() {
		const {
			user: {ID}, 
			tagIDsSelected, 
			userTagsPost
		} = this.props
		userTagsPost({
			URL: `/userTags/${ID}`, 
			body: {
				// type: "JSON" is default
				data: tagIDsSelected
			}
		})
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
		for (let v of roleIDsSelected) {
			userRoles = {
				...userRoles, 
				[v]: roles[v]
			}
		}
		return Object.entries(userRoles).map(([k, v]) => <Chip key={k}>
			<Avatar 
				size={32}
				color={blue300}
			>
				{getFirstLetters(contents[v.contentID])}
			</Avatar>
			{contents[v.contentID]}
		</Chip>)
	}
	tagsUserAndSelected(contents, tags, userTags, tagIDsSelected) {
		for (let v of tagIDsSelected) {
			userTags = {
				...userTags, 
				[v]: tags[v]
			}
		}
		return Object.entries(userTags).map(([k, v]) => <Chip key={k}>
			<Avatar 
				size={32}
				color={blue300}
			>
				{getFirstLetters(contents[v.contentID])}
			</Avatar>
			{contents[v.contentID]}
		</Chip>)
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
				<h1>USER</h1>
				{
					ID && 
					<SelectField 
						multiple={true}
						hintText={"Add roles"}
						value={roleIDsSelected}
						floatingLabelText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgJaDCgw"] || "Roles"}
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
					// ADD CHANGED CONTROL BELOWE !!!!!!!!!!!!!!!!!!!!!
					roleIDsSelected.length > 0 && 
						<FlatButton
							label={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLbNCww"] || "Save"}
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
						floatingLabelText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgJaDCgw"] || "Tags"}
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
					// ADD CHANGED CONTROL BELOWE !!!!!!!!!!!!!!!!!!!!!
					tagIDsSelected.length > 0 && 
						<FlatButton
							label={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLbNCww"] || "Save"}
							primary={true}
							onTouchTap={this.handlePostTags}
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
	roleIDsSelectedByUserReset: PropTypes.func.isRequired, 
	tagIDsSelectedByUserReset: PropTypes.func.isRequired, 
	userRolesPost: PropTypes.func.isRequired, 
	userTagsPost: PropTypes.func.isRequired, 
	userRoleDelete: PropTypes.func.isRequired, 
	userTagDelete: PropTypes.func.isRequired
}

export default UserSettings
