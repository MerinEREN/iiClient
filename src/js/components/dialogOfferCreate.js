import React, {Component}  from "react"
import PropTypes from "prop-types"
import Dialog from "material-ui/Dialog"
import VerticalStepper from "./verticalStepper"
import TextField from "material-ui/TextField"
import FlatButton from "material-ui/FlatButton"

class DialogOfferCreate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			stepIndex: 0, 
			newObject: {
				explanation: "", 
				amount: 0
			},  
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
			contents
		} = this.props
		let key
		switch (i) {
			case 1:
				key = "explanation"
				break
			case 2:
				key = "amount"
				break
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
			dID, 
			uID, 
			toggleDialog, 
			offerPost
		} = this.props
		toggleDialog()
		offerPost({
			URL: `/offers?dID=${dID}`, 
			body: {
				type: "FormData", 
				// Use "contentType" for "Blob" type.
				// contentType: "application/json", 
				data: {
					offer: {
						...newObject, 
						uID
					}
				}
			}
		})
		this.setState({
			stepIndex: 0, 
			newObject: {
				explanation: "", 
				amount: 0
			}
		})
	}
	stepLabels() { 
		const {
			contents
		} = this.props
		return Object.keys(contents).length > 0 ?
			[
				contents["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRXhwbGFuYXRpb24M"], 
				contents["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"], 
				contents["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGQW1vdW50DA"]
			] : 
			[
				"Explanation", 
				"Description", 
				"Amount"
			]
	}
	explanationField() {
		const {
			newObject: {explanation}, 
			inputErrTexts
		} = this.state
		const {
			contents
		} = this.props
		return <TextField 
			name="explanation" 
			value={explanation || ""}
			floatingLabelText={contents["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"] || "Description"}
			errorText={inputErrTexts.explanation}
			fullWidth={true}
			multiLine={true}
			rows={3}
			rowsMax={5}
			onChange={this.handleFieldChange}
		/>
	}
	amountField() {
		const {
			newObject: {amount}, 
			inputErrTexts
		} = this.state
		const {
			contents
		} = this.props
		return <TextField 
			name="amount" 
			value={amount || 0}
			type="number"
			floatingLabelText={contents["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGQW1vdW50DA"] || "Amount"}
			errorText={inputErrTexts.amount}
			onChange={this.handleFieldChange}
		/>
	}
	stepContents() {
		const {
			contents
		} = this.props
		return [
			<p>{contents["aghkZXZ-Tm9uZXI0CxIHQ29udGVudCInTWFrZSBhbiBvZmZlci4gQWxsIGZpZWxkcyBhcmUgcmVxdWlyZWQuDA"]}</p>, 
			this.explanationField(), 
			this.amountField()
		]
	}
	children() {
		const {
			stepIndex
		} = this.state
		const {
			contents
		} = this.props
		return <VerticalStepper 
			stepLabels={this.stepLabels()} 
			stepContents={this.stepContents()}
			stepIndex={stepIndex}
			updateStepIndex={this.handleStepIndex}
			contents={contents}
		/>
	}
	actions() {
		const {
			stepIndex
		} = this.state
		const {
			contents, 
			toggleDialog
		} = this.props

		let actions = [
			<FlatButton
				label={contents["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFQ2xvc2UM"] || "Close"}
				onTouchTap={toggleDialog}
			/>
		]
		this.stepContents().length - 1 === stepIndex && actions.push(<FlatButton
			label={contents["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEU2F2ZQw"] || "Save"}
			primary={true}
			onTouchTap={this.handlePost}
		/>)
		return actions
	}
	render() {
		const {
			title, 
			showDialog
		} = this.props
		return <Dialog
			title={title}
			children={this.children()}
			actions={this.actions()}
			modal={true}
			open={showDialog} 
		/>
	}
}

DialogOfferCreate.muiName = "Dialog"

DialogOfferCreate.propTypes = {
	contents: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	uID: PropTypes.string,
	dID: PropTypes.string.isRequired,
	showDialog: PropTypes.bool.isRequired, 
	toggleDialog: PropTypes.func.isRequired, 
	offerPost: PropTypes.func.isRequired
}

export default DialogOfferCreate
