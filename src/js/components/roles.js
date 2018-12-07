import React, {Component} from "react"
import PropTypes from "prop-types"
import {GridList} from "material-ui/GridList"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentAdd from "material-ui/svg-icons/content/add"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import VerticalStepper from "./verticalStepper"
import TextField from "material-ui/TextField"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"
import RoleTile from "./roleTile"

const styles = {
	root: {
		display: "flex",
		flexWrap: "wrap", 
		justifyContent: "center"
	}, 
	gridList: {
		margin: 20
	}, 
	floatingActionButton: {
		position: "fixed",
		bottom: 32, 
		right: 48
	}
}

class Roles extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showDialog: false, 
			stepIndex: 0, 
			roleNew: {
				contentID: "", 
				types: []
			}, 
			inputErrTexts: {}
		}
		this.toggleDialog = this.toggleDialog.bind(this)
		this.handleStepIndex = this.handleStepIndex.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handlePost = this.handlePost.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		this.props.rolesGet()
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
		const {contents} = this.props
		let key
		switch (i) {
			case 1:
				key = "contentID"
				break
			case 2:
				key = "types"
				break
			default:
				return false
		}
		if (!this.state.roleNew[key] || this.state.roleNew[key].length === 0) {
			this.setState({
				inputErrTexts: {
					...this.state.inputErrTexts, 
					[key]: contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLaNCgw"] || "Required field"
				}
			})
			return true
		}
		return false
	}
	// INDEX AND VALUES ARE FOR SELECT FIELD ONLY
	handleInputChange(event, index, values) {
		const target = event.target
		const name = target.name || "types"
		const value = target.value || values
		const {
			roleNew, 
			inputErrTexts
		} = this.state
		this.setState({
			roleNew: {
				...roleNew, 
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
			roleNew
		} = this.state
		if(this.handleRequiredField(stepIndex))
			return
		this.toggleDialog()
		this.props.rolesPost({
			body: {
				type: "FormData", 
				// Use "contentType" for "Blob" type.
				// contentType: "application/json", 
				data: {
					role: {
						...roleNew
					}
				}
			}
		})
		this.setState({
			roleNew: {
				contentID: "", 
				types: []
			}, 
			stepIndex: 0
		})
	}
	toggleDialog() {
		this.props.roleTypesGet()
		this.setState({showDialog: !this.state.showDialog})
	}
	handleDelete(ID) {
		this.props.roleDelete({
			URL: `/roles/${ID}`, 
			body: {
				data: [ID]
			}
		})
	}
	roleTiles(roles) {
		const {
			contents
		} = this.props
		return Object.entries(roles).map(([k, v]) => 
			<RoleTile 
				key={k} 
				role={v} 
				text={contents[v.contentID]}
				handleDelete={this.handleDelete}
			/>)
	}
	menuItems(){
		const {
			roleNew: {types}
		} = this.state
		const {roleTypes} = this.props
		return Object.entries(roleTypes).map(([k, v]) => <MenuItem
			key={k}
			value={v.ID}
			primaryText={v.ID}
			checked={types.indexOf(v.ID) > -1}
			insetChildren={true}
		/>
		)
	}
	render() {
		const {
			root, 
			gridList, 
			floatingActionButton
		} = styles
		const {
			showDialog, 
			stepIndex, 
			inputErrTexts, 
			roleNew
		} = this.state
		const {
			contents, 
			roles
		} = this.props
		const stepLabels = Object.keys(contents).length > 0 ?
			[
				contents["Description"], 
				contents["Role"], 
				contents["Types"]
			] :
			[
				"Description", 
				"Role", 
				"Types"
			]
		const stepContents = [
			<p>
				{contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgPWfCQw"] || "Add a new role. All fields are required."}
			</p>, 
			<TextField 
				name="contentID"
				value={roleNew.contentID || ""}
				floatingLabelText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgPXfCAw"] || "Content ID"}
				errorText={inputErrTexts.contentID}
				onChange={this.handleInputChange}
			/>, 
			<SelectField
				multiple={true} 
				hintText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgM2bCgw"] || "Types"}
				value={roleNew.types}
				errorText={inputErrTexts.types}
				onChange={this.handleInputChange}
			>
				{this.menuItems()}
			</SelectField>
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
				label={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLatCww"] || "Close"}
				onTouchTap={this.toggleDialog}
			/>
		]
		stepContents.length - 1 === stepIndex && actions.push(<FlatButton
			label={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLbNCww"] || "Save"}
			primary={true}
			onTouchTap={this.handlePost}
		/>)
		return (
			<div style={root}>
				{ 
					Object.entries(roles).length !== 0 
						? 
						<GridList 
							style={gridList}
						>
							{this.roleTiles(roles)}
						</GridList>
						:
						<h3>{contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgI6lCgw"] || "No Content"}</h3>
				}
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
					title={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgPWvCAw"] || "Add a role"}
					children={children}
					actions={actions}
					modal={true}
					open={showDialog} 
				/>
			</div>
		)
	}
}

Roles.defaultProps = {
	contents: {}
}

Roles.propTypes = {
	contents: PropTypes.object.isRequired, 
	rolesGet: PropTypes.func.isRequired, 
	roles: PropTypes.object.isRequired, 
	roleTypesGet: PropTypes.func.isRequired, 
	roleTypes: PropTypes.object.isRequired, 
	rolesPost: PropTypes.func.isRequired, 
	roleDelete: PropTypes.func.isRequired
}

Roles.muiName = "GridList"

export default Roles
