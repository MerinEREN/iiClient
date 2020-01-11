import React, {Component}  from "react"
import PropTypes from "prop-types"
import browserHistory from "react-router/lib/browserHistory"
import Dialog from "material-ui/Dialog"
import VerticalStepper from "./verticalStepper"
import TextField from "material-ui/TextField"
import FlatButton from "material-ui/FlatButton"

class DialogPageCreate extends Component {
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
				key = "name"
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
			newObject
		} = this.state
		const {
			dialogToggle, 
			pagePost, 
			pagesSuccess
		} = this.props
		dialogToggle()
		this.props.pagePost({
			data: {
				value: newObject
			}
		}).then(response => {
			if (response.OK) {
				response.json().then(body => {
					pagesSuccess({
						response: body, 
						method: "GET", 
						inefective, 
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
				contexts["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"].value, 
				contexts["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIETmFtZQw"].value
			] :
			[
				"Explanation", 
				"Name"
			]
	}
	explanationField(contexts) {
		return <p>
			{contexts["aghkZXZ-Tm9uZXI0CxIHQ29udGVudCInQWRkIGEgbmV3IHBhZ2UuIE5hbWUgZmllbGQgaXMgcmVxdWlyZWQuDA"].value || "Add a new page. Name field is required."}
		</p>
	}
	nameField(contexts) {
		const {
			newObject: {name}, 
			inputErrTexts
		} = this.state
		return <TextField 
			name="name"
			value={name || ""}
			floatingLabelText={contexts["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGQW1vdW50DA"].value || "Name"}
			errorText={inputErrTexts.name}
			onChange={this.handleFieldChange}
		/>
	}
	stepContents() {
		const {
			contexts
		} = this.props
		return [
			this.explanationField(contexts), 
			this.nameField(contexts)
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

DialogPageCreate.propTypes = {
	contexts: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	dialogShow: PropTypes.bool.isRequired, 
	dialogToggle: PropTypes.func.isRequired, 
	pagePost: PropTypes.func.isRequired, 
	pagesSuccess: PropTypes.func.isRequired
}

DialogPageCreate.muiName = "Dialog"

export default DialogPageCreate
