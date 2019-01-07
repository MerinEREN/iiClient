import React, {Component} from "react"
import PropTypes from "prop-types"
import {GridList} from "material-ui/GridList"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentAdd from "material-ui/svg-icons/content/add"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import VerticalStepper from "./verticalStepper"
import TextField from "material-ui/TextField"
import RoleTypeTile from "./roleTypeTile"

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

class RoleTypes extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showDialog: false, 
			stepIndex: 0, 
			roleTypeNew: {
				ID: ""
			}, 
			inputErrText: {}
		}
		this.toggleDialog = this.toggleDialog.bind(this)
		this.handleStepIndex = this.handleStepIndex.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handlePost = this.handlePost.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		this.props.roleTypesGet()
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
				key = "ID"
				break
			default:
				return false
		}
		if (!this.state.roleTypeNew[key]) {
			this.setState({
				inputErrText: {
					...this.state.inputErrText, 
					[key]: contents["aghkZXZ-Tm9uZXIbCxIHQ29udGVudCIOUmVxdWlyZWQgRmllbGQM"] || "Required Field"
				}
			})
			return true
		}
		return false
	}
	// INDEX AND VALUES ARE FOR SELECT FIELD ONLY
	handleInputChange(event, index, values) {
		const target = event.target
		const name = target.name
		const value = target.value
		const {
			roleTypeNew, 
			inputErrText
		} = this.state
		this.setState({
			roleTypeNew: {
				...roleTypeNew, 
				[name]: value
			}, 
			inputErrText: {
				...inputErrText, 
				[name]: null
			}
		})
	}
	handlePost() {
		const {
			stepIndex, 
			roleTypeNew
		} = this.state
		if(this.handleRequiredField(stepIndex))
			return
		this.toggleDialog()
		this.props.roleTypesPost({
			body: {
				type: "FormData", 
				// Use "contentType" for "Blob" type.
				// contentType: "application/json", 
				data: {
					roleType: {
						...roleTypeNew
					}
				}
			}
		})
		this.setState({
			roleTypeNew: {
				ID: ""
			}, 
			stepIndex: 0
		})
	}
	toggleDialog() {
		this.setState({showDialog: !this.state.showDialog})
	}
	handleDelete(ID) {
		this.props.roleTypeDelete({
			URL: `/roleTypes/${ID}`, 
			body: {
				data: [ID]
			}
		})
	}
	roleTypeTiles(roleTypes) {
		return Object.entries(roleTypes).map(([k, v]) => 
			<RoleTypeTile 
				key={k} 
				roleType={v} 
				handleDelete={this.handleDelete}
			/>)
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
			inputErrText, 
			roleTypeNew
		} = this.state
		const {
			contents, 
			roleTypes
		} = this.props
		const stepLabels = Object.keys(contents).length > 0 ?
			[
				contents["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"], 
				contents["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEVHlwZQw"]
			] :
			[
				"Description", 
				"Type"
			]
		const stepContents = [
			<p>
				{contents["aghkZXZ-Tm9uZXI4CxIHQ29udGVudCIrQWRkIGEgbmV3IHJvbGUgdHlwZS4gVGhlIGZpZWxkIGlzIHJlcXVpcmVkLgw"] || "Add a new role type. The field is required."}
			</p>, 
			<TextField 
				name="ID"
				value={roleTypeNew.ID || ""}
				floatingLabelText="ID"
				errorText={inputErrText.ID}
				onChange={this.handleInputChange}
			/>
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
				{ 
					Object.entries(roleTypes).length !== 0 
						? 
						<GridList 
							style={gridList}
						>
							{this.roleTypeTiles(roleTypes)}
						</GridList>
						:
						<h3>{contents["aghkZXZ-Tm9uZXIXCxIHQ29udGVudCIKTm8gQ29udGVudAw"] || "No Content"}</h3>
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
					title={contents["aghkZXZ-Tm9uZXIgCxIHQ29udGVudCITQWRkIEEgTmV3IFJvbGUgVHlwZQw"] || "Add A New Role Type"}
					children={children}
					actions={actions}
					modal={true}
					open={showDialog} 
				/>
			</div>
		)
	}
}

RoleTypes.defaultProps = {
	contents: {}
}

RoleTypes.propTypes = {
	contents: PropTypes.object.isRequired, 
	roleTypesGet: PropTypes.func.isRequired, 
	roleTypes: PropTypes.object.isRequired, 
	roleTypesPost: PropTypes.func.isRequired, 
	roleTypeDelete: PropTypes.func.isRequired
}

RoleTypes.muiName = "GridList"

export default RoleTypes
