import React, {Component}  from "react"
import PropTypes from "prop-types"
import browserHistory from "react-router/lib/browserHistory"
import Dialog from "material-ui/Dialog"
import VerticalStepper from "./verticalStepper"
import TextField from "material-ui/TextField"
import FlatButton from "material-ui/FlatButton"

class DialogOfferCreate extends Component {
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
				key = "description"
				break
			case 2:
				key = "amount"
				break
			default:
				return false
		}
		if(!newObject[key]) {
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
			params: {ID: dID}, 
			uID, 
			dialogToggle, 
			offerPost, 
			offersSuccess
		} = this.props
		dialogToggle()
		let URL = new URL("/offers", window.location.href)
		URL.searchParams.set("dID", dID)
		offerPost({
			URL, 
			data: {
				value: {
					...newObject, 
					uID
				}
			}, 
			key: dID
		}).then(response => {
			if (response.ok) {
				response.json().then(body => {
					offersSuccess({
						response: body, 
						method: "GET", 
						ineffective, 
						didValidate, 
						key: body.ID
					})
				})
				browserHistory.push(response.headers.get("Location"))
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
				contexts["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"].value, 
				contexts["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGQW1vdW50DA"].value
			] : 
			[
				"Explanation", 
				"Description", 
				"Amount"
			]
	}
	explanationField(contexts) {
		return <p>
			{contexts["aghkZXZ-Tm9uZXJJCxIHQ29udGVudCI8VXBkYXRlIHRoZSBkZW1hbmQuIFRhZ3MgYW5kIERlc2NyaXB0aW9uIGZpZWxkcyBhcmUgcmVxdWlyZWQuDA"].value}
		</p>
	}
	descriptionField(contexts) {
		const {
			newObject: {description}, 
			inputErrTexts
		} = this.state
		return <TextField 
			name="description" 
			value={description || ""}
			floatingLabelText={contexts["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"].value || "Description"}
			errorText={inputErrTexts.description}
			fullWidth={true}
			multiLine={true}
			rows={3}
			rowsMax={5}
			onChange={this.handleFieldChange}
		/>
	}
	amountField(contexts) {
		const {
			newObject: {amount}, 
			inputErrTexts
		} = this.state
		return <TextField 
			name="amount" 
			value={amount || 0}
			type="number"
			floatingLabelText={contexts["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGQW1vdW50DA"].value || "Amount"}
			errorText={inputErrTexts.amount}
			onChange={this.handleFieldChange}
		/>
	}
	stepContents() {
		const {
			contexts
		} = this.props
		return [
			this.explanationField(contexts), 
			this.descriptionField(contexts), 
			this.amountField(contexts)
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

DialogOfferCreate.propTypes = {
	contexts: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	uID: PropTypes.string.isRequired,
	dialogShow: PropTypes.bool.isRequired, 
	dialogToggle: PropTypes.func.isRequired, 
	offerPost: PropTypes.func.isRequired, 
	offersSuccess: PropTypes.func.isRequired
}

DialogOfferCreate.muiName = "Dialog"

export default DialogOfferCreate
