import React, {Component}  from "react"
import PropTypes from "prop-types"
import Dialog from "material-ui/Dialog"
import VerticalStepper from "./verticalStepper"
import TextField from "material-ui/TextField"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"
import FlatButton from "material-ui/FlatButton"

// Creates a new role.
class DialogRoleCreate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			stepIndex: 0, 
			newObject: {},  
			inputErrTexts: {}
		}
		this.handleStepIndex = this.handleStepIndex.bind(this)
		this.handleFieldChange = this.handleFieldChange.bind(this)
		this.handlePost = this.handlePost.bind(this)
	}
	handleStepIndex(direction) {
		const {
			stepIndex
		} = this.state
		const {
			roleTypesGet
		} = this.props
		switch (direction) {
			case "next":
				if(this.handleRequiredField(stepIndex))
					return
				if (stepIndex === 1)
					roleTypesGet()
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
			contexts
		} = this.props
		let key
		switch (i) {
			case 1:
				key = "contextID"
				break
			case 2:
				key = "types"
				break
			default:
				return false
		}
		if(!newObject[key] || newObject[key].length === 0) {
			this.setState({
				inputErrTexts: {
					...inputErrTexts, 
					[key]: contexts["aghkZXZ-Tm9uZXIbCxIHQ29udGVudCIOUmVxdWlyZWQgRmllbGQM"].value || "Required Field"
				}
			})
			return true
		}
		return false
	}
	// index and values are for select field only
	handleFieldChange(event, index, values) {
		const target = event.target
		const name = target.name || "types"
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
		if (this.handleRequiredField(stepIndex))
			return
		const {
			dialogToggle, 
			rolePost
		} = this.props
		dialogToggle()
		rolePost({
			data: {
				value: newObject
			}
		})
		this.setState({
			stepIndex: 0, 
			newObject: {}
		})
	}
	stepLabels() { 
		const {
			contexts
		} = this.props
		return Object.keys(contexts).length > 0 ?
			[
				contexts["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRXhwbGFuYXRpb24M"].value, 
				contexts["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGUGhvdG9zDA"].value, 
				contexts["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFVHlwZXMM"].value
			] : 
			[
				"Explanation", 
				"Context ID", 
				"Types"
			]
	}
	explanationField(contexts) {
		return <p>
			{contexts["aghkZXZ-Tm9uZXI1CxIHQ29udGVudCIoQWRkIGEgbmV3IHJvbGUuIEFsbCBmaWVsZHMgYXJlIHJlcXVpcmVkLgw"].value || "Add a new role. All fields are required."}
		</p>
	}
	contextIDField(contexts) {
		const {
			newObject: {contextID}, 
			inputErrTexts
		} = this.state
		return <TextField 
			name="contextID" 
			value={contextID || ""}
			floatingLabelText={contexts["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"].value || "Context ID"}
			errorText={inputErrTexts.contextID}
			onChange={this.handleFieldChange}
		/>
	}
	menuItems(types) {
		const {
			roleTypes
		} = this.props
		return Object.entries(roleTypes).map(([k, v]) => <MenuItem
			key={k}
			value={v.ID}
			primaryText={v.ID}
			checked={types.indexOf(v.ID) > -1}
			insetChildren={true}
		/>)
	}
	typesField(contexts) {
		const {
			newObject: {types}, 
			inputErrTexts
		} = this.state
		return <SelectField
			value={types}
			errorText={inputErrTexts.types}
			hintText={contexts["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFVHlwZXMM"].value || "Types"}
			onChange={this.handleFieldChange}
			multiple={true} 
		>
			{
				this.menuItems(types)
			}
		</SelectField>
	}
	stepContents() {
		const {
			contexts
		} = this.props
		return [
			this.explanationField(contexts), 
			this.contextIDField(contexts), 
			this.typesField(contexts)
		]
	}
	children() {
		const {
			stepIndex
		} = this.state
		const {
			contexts
		} = this.props
		return <VerticalStepper 
			stepLabels={this.stepLabels()} 
			stepContents={this.stepContents()}
			stepIndex={stepIndex}
			updateStepIndex={this.handleStepIndex}
			contexts={contexts}
		/>
	}
	actions() {
		const {
			stepIndex
		} = this.state
		const {
			contexts, 
			dialogToggle
		} = this.props
		let actions = [
			<FlatButton
				label={contexts["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFQ2xvc2UM"].value || "Close"}
				onTouchTap={dialogToggle}
			/>
		]
		this.stepContents().length - 1 === stepIndex && actions.push(<FlatButton
			label={contexts["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEU2F2ZQw"].value || "Save"}
			primary={true}
			onTouchTap={this.handlePost}
		/>)
		return actions
	}
	render() {
		const {
			title, 
			dialogShow
		} = this.props
		return <Dialog
			title={title}
			children={this.children()}
			actions={this.actions()}
			modal={true}
			open={dialogShow} 
		/>
	}
}

DialogRoleCreate.propTypes = {
	contexts: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	dialogShow: PropTypes.bool.isRequired, 
	roleTypes: PropTypes.object.isRequired, 
	dialogToggle: PropTypes.func.isRequired, 
	roleTypesGet: PropTypes.func.isRequired, 
	rolePost: PropTypes.func.isRequired
}

DialogRoleCreate.muiName = "Dialog"

export default DialogRoleCreate
