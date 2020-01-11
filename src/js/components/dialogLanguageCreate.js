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
					primaryText={nextProps.contexts["aghkZXZ-Tm9uZXIUCxIHQ29udGVudCIHVHVya2lzaAw"].value || "Turkish"} 
				/>,
				<MenuItem 
					key={2} 
					value="en-US" 
					primaryText={nextProps.contexts["aghkZXZ-Tm9uZXIUCxIHQ29udGVudCIHRW5nbGlzaAw"].value || "English"} 
				/>,
				<MenuItem 
					key={3} 
					value="de-DE" 
					primaryText={nextProps.contexts["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGR2VybWFuDA"].value || "German"} 
				/>,
				<MenuItem 
					key={4} 
					value="ru-RU" 
					primaryText={nextProps.contexts["aghkZXZ-Tm9uZXIUCxIHQ29udGVudCIHUnVzc2lhbgw"].value || "Russian"} 
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
		const name = target.name || "ID"
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
			languagePost, 
			photosPost
		} = this.props
		dialogToggle()
		languagePost({
			data: {
				value: newObject
			}
		}).then(response => {
			if (response.OK) { 
				response.json().then(body => { 
					let URL = new URL("/photos", window.location.href)
					URL.searchParams.set("pID", body.ID)
					photosPost({
						URL, 
						data: {
							value: this.file.files
						}, 
						key: body.ID
					})
				})
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
				contexts["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIETmFtZQw"].value, 
				contexts["aghkZXZ-Tm9uZXIQCxIHQ29udGVudCIDVGFnDA"].value, 
				contexts["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIERmlsZQw"].value
			] :
			[
				"Explanation", 
				"Language", 
				"Context ID", 
				"Photo"
			]
	}
	explanationField(contexts) {
		return <p>
			{contexts["aghkZXZ-Tm9uZXJGCxIHQ29udGVudCI5QWRkIGEgbmV3IGxhbmd1YWdlLiBMYW5ndWFnZSBhbmQgVGFnIGZpZWxkcyBhcmUgcmVxdWlyZWQuDA"].value || "Add a new language. Language and Tag fields are required."}
		</p>
	}
	languageCodeField(contexts) {
		const {
			newObject: {code}, 
			inputErrTexts
		} = this.state
		return <SelectField 
			value={code || ""}
			floatingLabelText={contexts["aghkZXZ-Tm9uZXIVCxIHQ29udGVudCIITGFuZ3VhZ2UM"].value || "Language"}
			errorText={inputErrTexts.code}
			onChange={this.handleFieldChange}
		>
			{this.items}
		</SelectField>
	}
	contextIDField(contexts) {
		const {
			newObject: {contextID}, 
			inputErrTexts
		} = this.state
		return <TextField 
			name="contextID"
			value={contextID || ""}
			floatingLabelText={contexts["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGQW1vdW50DA"].value || "Context ID"}
			errorText={inputErrTexts.contextID}
			onChange={this.handleFieldChange}
		/>
	}
	fileField() {
		return <input 
			type="file"
			ref={input => this.file = input}
		/>
	}
	stepContents() {
		const {
			contexts
		} = this.props
		return [
			this.explanationField(contexts), 
			this.languageCodeField(contexts), 
			this.contextIDField(contexts), 
			this.fileField()
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

DialogLanguageCreate.propTypes = {
	contexts: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	dialogShow: PropTypes.bool.isRequired, 
	dialogToggle: PropTypes.func.isRequired, 
	languagePost: PropTypes.func.isRequired, 
	photosPost: PropTypes.func.isRequired
}

DialogLanguageCreate.muiName = "Dialog"

export default DialogLanguageCreate
