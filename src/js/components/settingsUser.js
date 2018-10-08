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
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handlePostTags = this.handlePostTags.bind(this)
	}
	componentWillMount() {
		const {
			params: {ID}, 
			user, 
			userGet, 
			userTagsGet, 
			tagsGet
		} = this.props
		if (ID) {
			if (!isAdmin(user.roles)) {
				// Get selected non admin user's all properties
				userGet({
					URL:`/users/${ID}`
				})
				userTagsGet({
					URL: `/userTags/${ID}`, 
					key: ID
				})
			}
			tagsGet()
		}
	}
	// INDEX AND VALUES ARE FOR SELECT FIELD ONLY
	handleInputChange(event, index, values) {
		const target = event.target
		const name = target.name || "tags"
		const value = target.value || values
		const {
			tagIDsSelectedReset
		} = this.props
		switch (name) {
			case "tags":
			tagIDsSelectedReset(value)
			break
		}
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
				type: "Blob", 
				contentType: "application/json", 
				data: tagIDsSelected
			}
		})
	}
	tagItems(contents, tags, userTags, tagIDsSelected) {
		return Object.entries(tags).map(([k, v]) => <MenuItem
			key={k}
			value={k}
			primaryText={contents[v.name]}
			checked={tagIDsSelected.indexOf(k) > -1}
			disabled={userTags.hasOwnProperty(k)}
			insetChildren={true}
		/>)
	}
	tagsUserAndSelected(contents, tags, userTags, tagIDsSelected) {
		for (let ID of tagIDsSelected) {
			userTags = {
				...userTags, 
				[ID]: tags[ID]
			}
		}
		return Object.entries(userTags).map(([k, v]) => <Chip key={k}>
			<Avatar 
				size={32}
				color={blue300}
			>
				{getFirstLetters(contents[v.name])}
			</Avatar>
			{contents[v.name]}
		</Chip>)
	}
	render() {
		const {
			contents, 
			userLogged, 
			user, 
			tags, 
			userTags, 
			tagIDsSelected
		} = this.props
		return (
			<div>
				<h1>USER</h1>
				{
					isAdmin(userLogged.roles) && 
					<SelectField 
						multiple={true}
						hintText={"Add tags"}
						value={tagIDsSelected}
						floatingLabelText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgJaDCgw"]}
						onChange={this.handleInputChange}
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
							label={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLbNCww"] || " "}
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
	tags: PropTypes.object, 
	userTags: PropTypes.object.isRequired, 
	tagIDsSelected: PropTypes.array, 
	userGet: PropTypes.func.isRequired, 
	tagsGet: PropTypes.func.isRequired, 
	userTagsGet: PropTypes.func.isRequired, 
	tagIDsSelectedReset: PropTypes.func.isRequired, 
	userTagsDelete: PropTypes.func.isRequired
}

export default UserSettings
