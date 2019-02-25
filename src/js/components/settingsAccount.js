import React, {Component} from "react"
import PropTypes from "prop-types"
import {GridList, GridTile} from "material-ui/GridList"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentAdd from "material-ui/svg-icons/content/add"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import RaisedButton from "material-ui/RaisedButton"
import VerticalStepper from "./verticalStepper"
import TextField from "material-ui/TextField"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"
import UserTile from "./userTile"
import {generateURLVariableFromIDs} from "./utilities"
import {trimSpace} from "../middlewares/utilities"

const styles = {
	root: {
		display: "flex",
		flexWrap: "wrap", 
		justifyContent: "space-around"
	}, 
	gridList: {
		margin: 0
	}, 
	raisedButton: {
		marginLeft: 12
	}, 
	floatingActionButton: {
		position: "fixed",
		bottom: 32, 
		right: 48
	}
}

// "usersDelete" is ready but not active.
class AccountSettings extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showDialog: false, 
			stepIndex: 0, 
			newObject: {},  
			inputErrTexts: {}, 
			fetchUsers: true
		}
		this.toggleDialog = this.toggleDialog.bind(this)
		this.handleStepIndex = this.handleStepIndex.bind(this)
		this.handleFieldChange = this.handleFieldChange.bind(this)
		this.handlePost = this.handlePost.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillReceiveProps(nextProps) {
		const {
			usersGet, 
			account: {ID}
		} = this.props
		// CHANGE THE CONTROL BELOW !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		if (this.state.fetchUsers && ID) {
			usersGet({
				URL:`/users?accID=${ID}`
			})
			this.setState({fetchUsers: false})
		}
	}
	handleStepIndex(direction) {
		const {stepIndex} = this.state
		switch (direction) {
			case "next":
				if(this.handleRequiredField(stepIndex))
					return
				this.setState({
					stepIndex: stepIndex + 1,
				})
				break
			case "prev":
				this.setState({
					stepIndex: stepIndex - 1,
				})
				break
		}
	}
	handleRequiredField(i) {
		const {
			newObject, 
			inputErrTexts
		} = this.state
		const {
			contents
		} = this.props
		let key
		switch (i) {
			case 1:
				key = "email"
				/* if(!isValidEmail(newObject[key])) {
					this.setState({
						inputErrTexts: {
							...inputErrTexts, 
							[key]: contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLaNCgw"] || "Invalid email"
						}
					})
					return true
				} */
				break
			case 2:
				key = "roleIDs"
				break
			case 3:
				/* Uncoment to make required
				key = "tagIDs"
				break */
			default:
				return false
		}
		if(!newObject[key] || newObject[key].length === 0) {
			this.setState({
				inputErrTexts: {
					...inputErrTexts, 
					[key]: contents["aghkZXZ-Tm9uZXIbCxIHQ29udGVudCIOUmVxdWlyZWQgRmllbGQM"] || "Required Field"
				}
			})
			return true
		}
		return false
	}
	// index and values are for select field only
	handleFieldChange(event, index, values) {
		const target = event.target
		const name = target.name || 
			(this.state.stepIndex === 2 ? "roleIDs" : "tagIDs")
		const value = target.value || values
		const {
			newObject, 
			inputErrTexts
		} = this.state
		this.setState({
			newObject: {
				...newObject, 
				[name]: value
			}, 
			inputErrTexts: {
				...inputErrTexts, 
				[name]: null
			}
		})
	}
	handlePost() {
		const {
			stepIndex, 
			newObject
		} = this.state
		if(this.handleRequiredField(stepIndex))
			return
		this.toggleDialog()
		const {
			account: {ID}, 
			userPost
		} = this.props
		userPost({
			URL: `/users?accID=${ID}`, 
			body: {
				type: "FormData", 
				// Use "contentType" for "Blob" type.
				// contentType: "application/json", 
				data: {
					[trimSpace(newObject.email)]: newObject
				}
			}
		})
		this.setState({newObject: {}, stepIndex: 0})
	}
	toggleDialog() {
		const {
			rolesGet, 
			tagsGet
		} = this.props
		rolesGet()
		tagsGet()
		this.setState({showDialog: !this.state.showDialog})
	}
	handleDelete() {
		const {
			userIDsSelected, 
			usersDelete
		}= this.props
		usersDelete({
			URL: `/users?IDs=${generateURLVariableFromIDs(userIDsSelected)}`, 
			body: {
				data: userIDsSelected
			}
		})
	}
	userTiles(users) {
		return Object.entries(users).map(([k, v]) => <UserTile
			key={k} 
			user={v} 
			isChecked={this.props.userIDsSelected.indexOf(k) !== -1}
		/>)
	}
	emailField({email}, inputErrTexts, contents) {
		return <TextField 
			name="email" 
			value={email || ""}
			floatingLabelText={"Email"}
			errorText={inputErrTexts.email}
			onChange={this.handleFieldChange}
		/>
	}
	roleItems(roleIDs, contents){
		const {
			roles
		} = this.props
		return Object.entries(roles).map(([k, v]) => <MenuItem
			key={k}
			value={k}
			primaryText={contents[v.contentID]}
			checked={roleIDs && roleIDs.indexOf(k) > -1}
			insetChildren={true}
		/>
		)
	}
	rolesField({roleIDs}, inputErrTexts, contents) {
		return <SelectField
			multiple={true} 
			hintText={contents["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFUm9sZXMM"] || "Roles"}
			value={roleIDs}
			errorText={inputErrTexts.roleIDs}
			onChange={this.handleFieldChange}
		>
			{this.roleItems(roleIDs, contents)}
		</SelectField>
	}
	tagItems(tagIDs, contents){
		const {
			tags
		} = this.props
		return Object.entries(tags).map(([k, v]) => <MenuItem
			key={k}
			value={k}
			primaryText={contents[v.contentID]}
			checked={tagIDs && tagIDs.indexOf(k) > -1}
			insetChildren={true}
		/>
		)
	}
	tagsField({tagIDs}, inputErrTexts, contents) {
		return <SelectField
			multiple={true} 
			hintText={contents["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEVGFncww"] || "Tags"}
			value={tagIDs}
			errorText={inputErrTexts.tagIDs}
			onChange={this.handleFieldChange}
		>
			{this.tagItems(tagIDs, contents)}
		</SelectField>
	}
	render() {
		const {
			root, 
			gridList, 
			raisedButton, 
			floatingActionButton
		} = styles
		const {
			showDialog, 
			stepIndex, 
			newObject,
			inputErrTexts
		} = this.state
		const {
			contents, 
			users, 
			userIDsSelected
		} = this.props
		const stepLabels = Object.keys(contents).length > 0 ?
			[
			contents["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"], 
			"Email", 
			contents["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFUm9sZXMM"], 
			contents["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEVGFncww"]
			] : 
			[
				"Description", 
				"Email", 
				"Roles", 
				"Tags"
			]
		const stepContents = [
			<p>
				{contents["aghkZXZ-Tm9uZXJBCxIHQ29udGVudCI0QWRkIGEgbmV3IHVzZXIuIEVtYWlsIGFuZCBSb2xlcyBmaWVsZHMgYXJlIHJlcXVpcmVkLgw"] || "Add a new user. Email and Roles fields are required."}
			</p>, 
			this.emailField(newObject, inputErrTexts, contents), 
			this.rolesField(newObject, inputErrTexts, contents), 
			this.tagsField(newObject, inputErrTexts, contents)
		]
		const children = <VerticalStepper 
			stepLabels={stepLabels} 
			stepContents={stepContents}
			stepIndex={stepIndex}
			updateStepIndex={this.handleStepIndex}
			contents={contents}
		/>
		const actions = [
			<FlatButton
				label={contents["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFQ2xvc2UM"] || "Close"}
				onTouchTap={this.toggleDialog}
			/>
		]
		stepContents.length - 1 === stepIndex && actions.push(<FlatButton
			label={contents["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEU2F2ZQw"] || "Save"}
			primary={true}
			onTouchTap={this.handlePost}
		/>)
		return (
			<div style={root}>
				<GridList 
					cols={4} 
					cellHeight="auto"
					style={gridList}
				>
					<GridTile cols={1} />  
					<GridTile cols={2}>  
						<div>ACCOUNT INPUTS</div>
						{
							Object.keys(users).length > 0 && 
								<GridList 
									style={gridList}
									cols={4}
									padding={10}
									cellHeight={333}
								>
									{this.userTiles(users)}
								</GridList>
						}
						{
							userIDsSelected.length > 0 && 
								<RaisedButton
									label={contents["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGRGVsZXRlDA"] || "Delete"}
									style={raisedButton}
									secondary={true}
									onTouchTap={this.handleDelete}
								/>
						}
					</GridTile>
					<GridTile cols={1} />  
				</GridList>
				{
					!showDialog && 
						<FloatingActionButton 
							secondary={true}
							style={floatingActionButton}
							onTouchTap={this.toggleDialog}
						>
							<ContentAdd />
						</FloatingActionButton>
				}
				<Dialog
					title={contents["aghkZXZ-Tm9uZXIbCxIHQ29udGVudCIOQWRkIEEgTmV3IFVzZXIM"] || "Add A New User"}
					children={children}
					actions={actions}
					modal={true}
					open={showDialog} 
				/>
			</div>
		)
	}

}

AccountSettings.defaultProps = {
	contents: {}
}

AccountSettings.propTypes = {
	contents: PropTypes.object.isRequired, 
	account: PropTypes.object.isRequired, 
	users: PropTypes.object.isRequired, 
	tags: PropTypes.object.isRequired, 
	roles: PropTypes.object.isRequired, 
	userIDsSelected: PropTypes.array.isRequired, 
	usersGet: PropTypes.func.isRequired, 
	userPost: PropTypes.func.isRequired, 
	usersDelete: PropTypes.func, 
	tagsGet: PropTypes.func.isRequired, 
	rolesGet: PropTypes.func.isRequired
}

AccountSettings.muiName = "GridList"

export default AccountSettings
