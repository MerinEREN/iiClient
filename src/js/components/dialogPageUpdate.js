import React, {Component}  from "react"
import PropTypes from "prop-types"
import Dialog from "material-ui/Dialog"
import VerticalStepper from "./verticalStepper"
import TextField from "material-ui/TextField"
import FlatButton from "material-ui/FlatButton"

class DialogPageUpdate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			stepIndex: 0, 
			newObject: {},  
			inputErrTexts: {}
		}
		this.handleStepIndex = this.handleStepIndex.bind(this)
		this.handleFieldChange = this.handleFieldChange.bind(this)
		this.handlePut = this.handlePut.bind(this)
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.page !== nextProps.page)
			this.setState({newObject: nextProps.page})
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
				key = "name"
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
	handlePut() {
		const {
			stepIndex, 
			newObject
		} = this.state
		if(this.handleRequiredField(stepIndex))
			return
		const {
			params: {ID}, 
			dialogToggle, 
			pagePut
		} = this.props
		dialogToggle()
		// "ID" in data value is for enveloped or not check only
		// and not be sended to the backand.
		pagePut({
			URL: `/pages/${ID}`, 
			data: {
				type: "FormData", 
				// Use "contextType" for "Blob" type.
				// contextType: "application/json", 
				value: {
					ID, 
					...newObject
				}
			}
		})
		this.setState({
			stepIndex: 0
		})
	}
	stepLabels() { 
		const {
			contexts
		} = this.props
		return Object.keys(contexts).length > 0 ?
			[
				contexts["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"], 
				contexts["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIETmFtZQw"]
			] :
			[
				"Explanation", 
				"Name"
			]
	}
	nameField() {
		const {
			newObject: {name}, 
			inputErrTexts
		} = this.state
		const {
			contexts
		} = this.props
		return <TextField 
			name="name" 
			value={name || ""}
			floatingLabelText={contexts["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"] || "Name"}
			errorText={inputErrTexts.name}
			onChange={this.handleFieldChange}
		/>
	}
	stepContents() {
		const {
			contexts
		} = this.props
		return [
			<p>
				{contexts["aghkZXZ-Tm9uZXIxCxIHQ29udGVudCIkVXBkYXRlIHBhZ2UsIG5hbWUgZmllbGQgaXMgcmVxdWlyZWQuDA"] || "Update page, name field is required."}
			</p>, 
			this.nameField()
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
			onTouchTap={this.handlePut}
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

DialogPageUpdate.propTypes = {
	contexts: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	dialogShow: PropTypes.bool.isRequired, 
	page: PropTypes.object.isRequired,
	dialogToggle: PropTypes.func.isRequired, 
	pagePut: PropTypes.func.isRequired
}

DialogPageUpdate.muiName = "Dialog"

export default DialogPageUpdate
