import React, {Component}  from "react"
import PropTypes from "prop-types"
import Dialog from "material-ui/Dialog"
import VerticalStepper from "./verticalStepper"
import TextField from "material-ui/TextField"
import FlatButton from "material-ui/FlatButton"

// Creates a new tag.
class DialogTagCreate extends Component {
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
			contexts
		} = this.props
		let key
		switch (i) {
			case 1:
				key = "contextID"
				break
			default:
				return false
		}
		if(!newObject[key]) {
			this.setState({
				inputErrTexts: {
					...inputErrTexts, 
					[key]: contexts["aghkZXZ-Tm9uZXIbCxIHQ29udGVudCIOUmVxdWlyZWQgRmllbGQM"] || "Required Field"
				}
			})
			return true
		}
		return false
	}
	// index and values are for select field only
	handleFieldChange(event, index, values) {
		const target = event.target
		const name = target.name
		const value = target.value
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
		const {
			dialogToggle, 
			tagPost
		} = this.props
		dialogToggle()
		// FIND A SOLUTION FOR THAT "ID" THING !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		tagPost({
			data: {
				value: {
					ID: "dummy", 
					...newObject
				}
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
				contexts["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"], 
				contexts["aghkZXZ-Tm9uZXIQCxIHQ29udGVudCIDVGFnDA"]
			] :
			[
				"Explanation", 
				"Tag"
			]
	}
	explanationField() {
		const {
			contexts
		} = this.props
		return <p>
			{contexts["aghkZXZ-Tm9uZXIyCxIHQ29udGVudCIlQWRkIGEgbmV3IHRhZy4gVGhlIGZpZWxkIGlzIHJlcXVpcmVkLgw"] || "Add a new tag. The field is required."}
		</p>
	}
	contextIDField() {
		const {
			newObject: {contextID}, 
			inputErrTexts
		} = this.state
		const {
			contexts
		} = this.props
		return <TextField 
			name="contextID" 
			value={contextID || ""}
			floatingLabelText={contexts["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"] || "Context ID"}
			errorText={inputErrTexts.contextID}
			onChange={this.handleFieldChange}
		/>
	}
	stepContents() {
		return [
			this.explanationField(), 
			this.contextIDField()
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
				label={contexts["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFQ2xvc2UM"] || "Close"}
				onTouchTap={dialogToggle}
			/>
		]
		this.stepContents().length - 1 === stepIndex && actions.push(<FlatButton
			label={contexts["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEU2F2ZQw"] || "Save"}
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

DialogTagCreate.propTypes = {
	contexts: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	dialogShow: PropTypes.bool.isRequired, 
	dialogToggle: PropTypes.func.isRequired, 
	tagPost: PropTypes.func.isRequired
}

DialogTagCreate.muiName = "Dialog"

export default DialogTagCreate
