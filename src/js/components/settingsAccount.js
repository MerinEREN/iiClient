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
			errFields: {}
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
			tagsGet, 
			account: {ID}
		} = this.props
		if (nextProps.account.ID !== ID) {
			usersGet({
				URL:`/users?accID=${nextProps.account.ID}`
			})
		}
		tagsGet()
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
			errFields
		} = this.state
		const {
			contents
		} = this.props
		switch (i) {
			case 1:
				// VALIDATE EMAIL HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				if(!newObject.email) {
					this.setState({
						errFields: {
							...errFields, 
							email: contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLaNCgw"]
						}
					})
					return true
				}
				return false
			default:
				return false
		}
	}
	// index and values are for select field only
	handleFieldChange(event, index, values) {
		const target = event.target
		const name = target.name || "tagIDs"
		const value = target.value || values
		const {
			newObject, 
			errFields
		} = this.state
		this.setState({
			newObject: {
				...newObject, 
				[name]: value
			}, 
			errFields: {
				...errFields, 
				[name]: ""
			}
		})
	}
	handlePost() {
		this.toggleDialog()
		const {newObject} = this.state
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
	emailField({email}, errFields, contents) {
		return <TextField 
			name="email" 
			value={email || ""}
			floatingLabelText={"Email"}
			errorText={errFields.email}
			onChange={this.handleFieldChange}
		/>
	}
	tagItems(tagIDs, contents){
		const {
			tags
		} = this.props
		return Object.entries(tags).map(([k, v]) => <MenuItem
			key={k}
			value={k}
			primaryText={contents[v.name]}
			checked={tagIDs && tagIDs.indexOf(k) > -1}
			insetChildren={true}
		/>
		)
	}
	tagsField({tagIDs}, errFields, contents) {
		return <SelectField
			multiple={true} 
			hintText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgK6ZCgw"]}
			value={tagIDs}
			errorText={errFields.tagIDs}
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
			errFields
		} = this.state
		const {
			contents, 
			users, 
			userIDsSelected
		} = this.props
		const stepLabels = [
			contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLbDCAw"], 
			"Email", 
			contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgK6ZCgw"]
		]
		const stepContents = [
			<p>
				{contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgJWACAw"]}
			</p>, 
			this.emailField(newObject, errFields, contents), 
			this.tagsField(newObject, errFields, contents)
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
				label={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLatCww"] || " "}
				onTouchTap={this.toggleDialog}
			/>
		]
		stepContents.length - 1 === stepIndex && actions.push(<FlatButton
			label={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLbNCww"] || " "}
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
						<GridList 
							style={gridList}
							cols={4}
							padding={10}
							cellHeight={333}
						>
							{this.userTiles(users)}
						</GridList>
						{
							userIDsSelected.length > 0 && 
								<RaisedButton
									label={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLatCAw"] || " "}
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
					title={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgJWACQw"]}
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
	userIDsSelected: PropTypes.array.isRequired, 
	usersGet: PropTypes.func.isRequired, 
	userPost: PropTypes.func.isRequired, 
	usersDelete: PropTypes.func.isRequired, 
	tagsGet: PropTypes.func.isRequired
}

AccountSettings.muiName = "GridList"

export default AccountSettings
