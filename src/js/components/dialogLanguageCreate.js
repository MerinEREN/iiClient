import React, {Component}  from "react"
import PropTypes from "prop-types"
import Dialog from "material-ui/Dialog"
import VerticalStepper from "./verticalStepper"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"
import TextField from "material-ui/TextField"
import FlatButton from "material-ui/FlatButton"

class DialogLanguageCreate extends Component {
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
	componentWillReceiveProps (nextProps) {
		if (this.props.contexts !== nextProps.contexts)
			this.items = [
				<MenuItem 
					key={1} 
					value="tr-TR" 
					primaryText={nextProps.contexts["aghkZXZ-Tm9uZXIUCxIHQ29udGVudCIHVHVya2lzaAw"] || "Turkish"} 
				/>,
				<MenuItem 
					key={2} 
					value="en-US" 
					primaryText={nextProps.contexts["aghkZXZ-Tm9uZXIUCxIHQ29udGVudCIHRW5nbGlzaAw"] || "English"} 
				/>,
				<MenuItem 
					key={3} 
					value="de-DE" 
					primaryText={nextProps.contexts["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGR2VybWFuDA"] || "German"} 
				/>,
				<MenuItem 
					key={4} 
					value="ru-RU" 
					primaryText={nextProps.contexts["aghkZXZ-Tm9uZXIUCxIHQ29udGVudCIHUnVzc2lhbgw"] || "Russian"} 
				/>
			]
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
				key = "code"
				break
			case 2:
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
		const name = target.name || "code"
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
			newObject
		} = this.state
		const {
			dialogToggle, 
			languagePost
		} = this.props
		dialogToggle()
		this.props.languagePost({
			data: {
				type: "FormData", 
				// Use "contextType" for "Blob" type.
				// contextType: "application/json", 
				value: {
						...newObject, 
						file: this.file.files[0] 
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
				contexts["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIETmFtZQw"], 
				contexts["aghkZXZ-Tm9uZXIQCxIHQ29udGVudCIDVGFnDA"], 
				contexts["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIERmlsZQw"]
			] :
			[
				"Explanation", 
				"Language", 
				"Context ID", 
				"Photo"
			]
	}
	explanationField() {
		const {
			contexts
		} = this.props
		return <p>
			{contexts["aghkZXZ-Tm9uZXJGCxIHQ29udGVudCI5QWRkIGEgbmV3IGxhbmd1YWdlLiBMYW5ndWFnZSBhbmQgVGFnIGZpZWxkcyBhcmUgcmVxdWlyZWQuDA"] || "Add a new language. Language and Tag fields are required."}
		</p>
	}
	languageCodeField() {
		const {
			newObject: {code}, 
			inputErrTexts
		} = this.state
		const {
			contexts
		} = this.props
		return <SelectField 
			value={code || ""}
			floatingLabelText={contexts["aghkZXZ-Tm9uZXIVCxIHQ29udGVudCIITGFuZ3VhZ2UM"] || "Language"}
			errorText={inputErrTexts.code}
			onChange={this.handleFieldChange}
		>
			{this.items}
		</SelectField>
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
			floatingLabelText={contexts["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGQW1vdW50DA"] || "Context ID"}
			errorText={inputErrTexts.contextID}
			onChange={this.handleFieldChange}
		/>
	}
	photoField() {
		return <input 
			type="file"
			ref={input => this.file = input}
		/>
	}
	stepContents() {
		return [
			this.explanationField(), 
			this.languageCodeField(), 
			this.contextIDField(), 
			this.photoField()
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

DialogLanguageCreate.muiName = "Dialog"

DialogLanguageCreate.propTypes = {
	contexts: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	dialogShow: PropTypes.bool.isRequired, 
	dialogToggle: PropTypes.func.isRequired, 
	languagePost: PropTypes.func.isRequired
}

export default DialogLanguageCreate
