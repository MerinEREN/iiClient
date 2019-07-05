import React, {Component}  from "react"
import PropTypes from "prop-types"
import Dialog from "material-ui/Dialog"
import VerticalStepper from "./verticalStepper"
import AutoComplete from "material-ui/AutoComplete"
import Chip from "material-ui/Chip"
import Avatar from "material-ui/Avatar"
import {blue300} from "material-ui/styles/colors"
import {firstLettersGenerate} from "./utilities"
import MenuItem from "material-ui/MenuItem"
import TextField from "material-ui/TextField"
import FlatButton from "material-ui/FlatButton"
import {filterAnObjectByKeys} from "../middlewares/utilities"

// Creates a new demand.
class DialogDemandCreate extends Component {
	constructor(props) {
		super(props)
		this.URL = new URL(window.location.href)
		this.state = {
			stepIndex: 0, 
			searchText: "", 
			newObject: {},  
			inputErrTexts: {}
		}
		this.handleStepIndex = this.handleStepIndex.bind(this)
		this.handleAutoComplete = this.handleAutoComplete.bind(this)
		this.handleNewRequest = this.handleNewRequest.bind(this)
		this.handleFieldChange = this.handleFieldChange.bind(this)
		this.handlePost = this.handlePost.bind(this)
	}
	// Clear auto complete request timeout.
	componentWillUnmount() {
		clearTimeout(this.timer)
	}
	handleStepIndex(direction) {
		const {
			stepIndex
		} = this.state
		const {
			tagsGet
		} = this.props
		switch (direction) {
			case "next":
				if(this.handleRequiredField(stepIndex))
					return
				if(stepIndex === 0) {
					this.URL.pathname = "/tags"
					this.URL.searchParams.set("q", "top")
					// Getting most used six tags to show 
					// as initial autocomplete values 
					// if they does not exist yet.
					tagsGet({
						URL: this.URL, 
						key: "top"
					})
				}
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
				key = "tagIDs"
				break
			case 2:
				key = "description"
				break
			case 3:
				/* Uncoment to make required
				key = "photos"
				break */
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
	handleAutoComplete(v) {
		const {
			inputErrTexts
		} = this.state
		const {
			tagsGet
		} = this.props
		clearTimeout(this.timer)
		if (v.length > 2) {
			if (this.URL.pathname !== "/tags")
				this.URL.pathname = "/tags"
			this.URL.searchParams.set("q", v)
			this.timer = setTimeout(() => tagsGet({
				URL: this.URL, 
				key: v
			}), 1000)
		}
		this.setState({
			searchText: v, 
			inputErrTexts: {
				...inputErrTexts, 
				tagIDs: null
			}
		})
	}
	handleNewRequest(obj) {
		const {
			newObject
		} = this.state
		this.setState({
			searchText: "", 
			newObject: {
				...newObject, 
				tagIDs: [
					...newObject.tagIDs, 
					obj.value.key
				]
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
			uID, 
			dialogToggle, 
			demandPost
		} = this.props
		dialogToggle()
		let files = []
		Object.values(this.inputPhotos.files).forEach(v => {
			files.push(v)
		})
		this.URL.pathname = "/demands"
		this.URL.searchParams.set("uID", uID)
		demandPost({
			URL: this.URL, 
			data: {
				type: "FormData", 
				// Use "contextType" for "Blob" type.
				// contextType: "application/json", 
				value: {
					...newObject, 
					files
				}
			}, 
			key: "timeline"
		})
		this.setState({
			stepIndex: 0, 
			searchText: "", 
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
				contexts["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEVGFncww"].value, 
				contexts["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"].value, 
				contexts["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGUGhvdG9zDA"].value
			] : 
			[
				"Explanation", 
				"Tags", 
				"Description", 
				"Photos"
			]
	}
	handleTagIDRemove(ID) {
		const {
			newObject
		} = this.state
		let tagIDsUpdated = []
		newObject.tagIDs.forEach(v => v !== ID && tagIDsUpdated.push(v))
		this.setState({
			newObject: {
				...newObject, 
				tagIDs: tagIDsUpdated
			}
		})
	}
	tagsSelected() {
		const {
			newObject: {tagIDs}
		} = this.state
		const {
			contexts, 
			tags
		} = this.props
		return tagIDs.map(v => 
			<Chip 
				key={v}
				onRequestDelete={() => this.handleTagIDRemove(v)}
			>
				<Avatar 
					size={32}
					color={blue300}
				>
					{firstLettersGenerate(
						contexts[tags[v].contextID].value
					)}
				</Avatar>
				{contexts[tags[v].contextID].value}
			</Chip>
		)
	}
	dataSourceTags() {
		const {
			searchText, 
			newObject: {tagIDs}
		} = this.state
		const {
			contexts, 
			tagsPagination, 
			tags
		} = this.props
		const IDs = tagsPagination[searchText] ? 
			tagsPagination[searchText].IDs :
			(
				tagsPagination.top ?
				tagsPagination.top.IDs : 
				[]
			)
		const tagsFiltered = filterAnObjectByKeys(tags, IDs)
		// CHECK RETURNED ARRAY ELEMENTS FOR null and undefined VALUES !!!!!!!!!!!!
		return Object.entries(tagsFiltered)
			.map(([k, v]) => {
				return tagIDs.indexOf(k) === -1 && {
					text: "", 
					value: (
						<MenuItem
							key={k}
							value={k}
							primaryText={contexts[v.contextID].value}
						/>
					)
				}
			})
	}
	tagsField() {
		const {
			searchText, 
			inputErrTexts
		} = this.state
		const {
			contexts
		} = this.props
		return <div>
			<AutoComplete
				searchText={searchText}
				filter={AutoComplete.noFilter}
				dataSource={this.dataSourceTags()}
				hintText={contexts["aghkZXZ-Tm9uZXIZCxIHQ29udGVudCIMU2VhcmNoIGEgdGFnDA"].value || "Search a tag"}
				floatingLabelText={contexts["aghkZXZ-Tm9uZXIQCxIHQ29udGVudCIDVGFnDA"].value || "Tag"}
				errorText={inputErrTexts.tagIDs}
				onUpdateInput={this.handleAutoComplete} 
				onNewRequest={this.handleNewRequest}
				openOnFocus={true}
			/>
			{this.tagsSelected()}
		</div>
	}
	descriptionField() {
		const {
			newObject: {description}, 
			inputErrTexts
		} = this.state
		const {
			contexts
		} = this.props
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
	stepContents() {
		const {
			contexts
		} = this.props
		return [
			<p>
				{
					contexts["aghkZXZ-Tm9uZXJLCxIHQ29udGVudCI-Q3JlYXRlIGEgbmV3IGRlbWFuZC4gVGFncyBhbmQgRGVzY3JpcHRpb24gZmllbGRzIGFyZSByZXF1aXJlZC4M"].value
				}
			</p>, 
			this.tagsField(), 
			this.descriptionField(), 
			<input 
				type="file"
				accept="image/*" 
				ref={input => this.inputPhotos = input}
				multiple
			/>
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

DialogDemandCreate.propTypes = {
	contexts: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	dialogShow: PropTypes.bool.isRequired, 
	tagsGet: PropTypes.func.isRequired, 
	tags: PropTypes.object.isRequired, 
	tagsPagination: PropTypes.object.isRequired, 
	uID: PropTypes.string.isRequired,
	dialogToggle: PropTypes.func.isRequired, 
	demandPost: PropTypes.func.isRequired
}

DialogDemandCreate.muiName = "Dialog"

export default DialogDemandCreate
