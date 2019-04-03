import React, {Component}  from "react"
import PropTypes from "prop-types"
import Dialog from "material-ui/Dialog"
import VerticalStepper from "./verticalStepper"
import AutoComplete from "material-ui/AutoComplete"
import Chip from "material-ui/Chip"
import Avatar from "material-ui/Avatar"
import {blue300} from "material-ui/styles/colors"
import {getFirstLetters} from "./utilities"
import MenuItem from "material-ui/MenuItem"
import TextField from "material-ui/TextField"
import FlatButton from "material-ui/FlatButton"
import {filterAnObjectByKeys} from "../middlewares/utilities"

// Generates or updates a demand.
class DialogDemandUpdate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			stepIndex: 0, 
			searchText: "", 
			newObject: {
				description: ""
			},  
			inputErrTexts: {}
		}
		this.handleStepIndex = this.handleStepIndex.bind(this)
		this.handleAutoComplete = this.handleAutoComplete.bind(this)
		this.handleNewRequest = this.handleNewRequest.bind(this)
		this.handleFieldChange = this.handleFieldChange.bind(this)
		this.handlePut = this.handlePut.bind(this)
	}
	componentWillReceiveProps(nextProps) {
		// Set "demand" props to the "newObject" for update purpose. 
		if (this.props.demand !== nextProps.demand)
			this.setState({
				newObject: {
					...this.state.newObject, 
					...nextProps.demand
				}
			})
		// Set "tagIDsDemand" to the "newObject" for update purpose. 
		if (this.props.tagIDsDemand !== nextProps.tagIDsDemand)
			this.setState({
				newObject: {
					...this.state.newObject, 
					tagIDs: nextProps.tagIDsDemand
				}
			})
	}
	// Clear auto complete request timeout.
	componentWillUnmount() {
		clearTimeout(this.timer)
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
	handleAutoComplete(v) {
		const {
			inputErrTexts
		} = this.state
		const {
			tagsGet
		} = this.props
		clearTimeout(this.timer)
		if (v.length > 2) {
			this.timer = setTimeout(() => tagsGet({
				URL: `/tags?q=${v}`, 
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
	handlePut() {
		const {
			stepIndex, 
			newObject
		} = this.state
		if(this.handleRequiredField(stepIndex))
			return
		const {
			demand, 
			dialogToggle, 
			demandPut
		} = this.props
		dialogToggle()
		let photos = []
		Object.values(this.inputPhotos.files).forEach(v => {
			photos.push(v)
		})
		// handle "PUT" request
		demandPut({
			URL: `/demands/${demand.ID}`, 
			body: {
				type: "FormData", 
				// Use "contextType" for "Blob" type.
				// contextType: "application/json", 
				data: {
					[demand.ID]: {
						...newObject, 
						photos
					}
				}
			}, 
			key: "timeline"
		})
		this.setState({
			stepIndex: 0, 
			searchText: "", 
			newObject: {
				tagIDs: [], 
				description: ""
			}
		})
	}
	stepLabels() { 
		const {
			contexts
		} = this.props
		return Object.keys(contexts).length > 0 ?
			[
				contexts["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRXhwbGFuYXRpb24M"], 
				contexts["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEVGFncww"], 
				contexts["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"], 
				contexts["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGUGhvdG9zDA"]
			] : 
			[
				"description", 
				"Tags", 
				"Description", 
				"Photos"
			]
	}
	handleRemoveTagID(ID) {
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
				onRequestDelete={() => this.handleRemoveTagID(v)}
			>
				<Avatar 
					size={32}
					color={blue300}
				>
					{getFirstLetters(
						contexts[tags[v].contextID]
					)}
				</Avatar>
				{contexts[tags[v].contextID]}
			</Chip>
		)
	}
	tagsDataSource() {
		const {
			newObject: {tagIDs}, 
			searchText
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
		return Object.entries(tagsFiltered)
			.map(([k, v]) => {
				return tagIDs.indexOf(k) === -1 && {
					text: "", 
					value: (
						<MenuItem
							key={k}
							value={k}
							primaryText={contexts[v.contextID]}
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
				dataSource={this.tagsDataSource()}
				hintText={contexts["aghkZXZ-Tm9uZXIZCxIHQ29udGVudCIMU2VhcmNoIGEgdGFnDA"] || "Search a tag"}
				floatingLabelText={contexts["aghkZXZ-Tm9uZXIQCxIHQ29udGVudCIDVGFnDA"] || "Tag"}
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
			floatingLabelText={contexts["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"] || "Description"}
			errorText={inputErrTexts.description}
			fullWidth={true}
			multiLine={true}
			rows={3}
			rowsMax={5}
			onChange={this.handleFieldChange}
		/>
	}
	stepcontexts() {
		const {
			newObject
		} = this.state
		const {
			contexts
		} = this.props
		return [
			<p>
				{contexts["aghkZXZ-Tm9uZXJJCxIHQ29udGVudCI8VXBkYXRlIHRoZSBkZW1hbmQuIFRhZ3MgYW5kIERlc2NyaXB0aW9uIGZpZWxkcyBhcmUgcmVxdWlyZWQuDA"]}
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
			stepcontexts={this.stepcontexts()}
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
		this.stepcontexts().length - 1 === stepIndex && actions.push(<FlatButton
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

DialogDemandUpdate.propTypes = {
	contexts: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	dialogShow: PropTypes.bool.isRequired, 
	demand: PropTypes.object,
	dialogToggle: PropTypes.func.isRequired, 
	demandPut: PropTypes.func.isRequired
}

DialogDemandUpdate.muiName = "Dialog"

export default DialogDemandUpdate
