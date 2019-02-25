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

// Generates or updates a demand.
class DialogDemand extends Component {
	constructor(props) {
		super(props)
		this.state = {
			stepIndex: 0, 
			searchText: "", 
			newObject: {
				tagIDs: [], 
				explanation: ""
			},  
			inputErrTexts: {}
		}
		this.handleStepIndex = this.handleStepIndex.bind(this)
		this.handleAutoComplete = this.handleAutoComplete.bind(this)
		this.handleNewRequest = this.handleNewRequest.bind(this)
		this.handleFieldChange = this.handleFieldChange.bind(this)
		this.handlePutOrPost = this.handlePutOrPost.bind(this)
	}
	// Initialize "newObject" with demand prop for update purpose. 
	componentWillReceiveProps(nextProps) {
		if (nextProps.demand)
			this.setState({newObject: nextProps.demand})
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
			contents
		} = this.props
		let key
		switch (i) {
			case 1:
				key = "tagIDs"
				break
			case 2:
				key = "explanation"
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
	handleAutoComplete(v) {
		const {
			inputErrTexts
		} = this.state
		const {
			tagsByFilterGet
		} = this.props
		clearTimeout(this.timer)
		if (v.length > 2) {
			this.timer = setTimeout(() => tagsByFilterGet({
				URL: `/tags?st=${v}`, 
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
	handlePutOrPost() {
		const {
			stepIndex, 
			newObject
		} = this.state
		if(this.handleRequiredField(stepIndex))
			return
		const {
			uID, 
			demand, 
			toggleDialog, 
			demandPost, 
			demandPut
		} = this.props
		toggleDialog()
		let photos = []
		Object.values(this.inputPhotos.files).forEach(v => {
			photos.push(v)
		})
		if (uID) {
			// handle "POST" request
			demandPost({
				URL: `/demands?uID=${uID}`, 
				body: {
					type: "FormData", 
					// Use "contentType" for "Blob" type.
					// contentType: "application/json", 
					data: {
						demand: {
							...newObject, 
							photos
						}
					}
				}
			})
		} else {
			// handle "PUT" request
			demandPut({
				URL: `/demands/${demand.ID}`, 
				body: {
					type: "FormData", 
					// Use "contentType" for "Blob" type.
					// contentType: "application/json", 
					data: {
						[demand.ID]: {
							...newObject, 
							photos
						}
					}
				}, 
				key: "timeline"
			})
		}
		this.setState({
			stepIndex: 0, 
			searchText: "", 
			newObject: {
				tagIDs: [], 
				explanation: ""
			}
		})
	}
	stepLabels() { 
		const {
			contents
		} = this.props
		return Object.keys(contents).length > 0 ?
			[
				contents["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"], 
				contents["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEVGFncww"], 
				contents["Explanation"], 
				contents["Photos"]
			] : 
			[
				"Description", 
				"Tags", 
				"Explanation", 
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
			contents, 
			tagsByFilter
		} = this.props
		// To prevent "tagsAddDistinct[v].contentID" error for empty "tagsByFilter" 
		// while demand update.
		if (Object.values(tagsByFilter).length === 0) 
			return []
		let tagsAllDistinct = {}
		// To eliminate de-duplicated objects.
		Object.values(tagsByFilter).forEach(
			v => tagsAllDistinct = {...tagsAllDistinct, ...v}
		)
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
						contents[tagsAllDistinct[v].contentID]
					)}
				</Avatar>
				{contents[tagsAllDistinct[v].contentID]}
			</Chip>
		)
	}
	tagsDataSource() {
		const {
			newObject: {tagIDs}, 
			searchText
		} = this.state
		const {
			contents, 
			tagsByFilter
		} = this.props
		return Object.entries(tagsByFilter[searchText] || (tagsByFilter.top || {}))
			.map(([k, v]) => {
				return tagIDs.indexOf(k) === -1 && {
					text: "", 
					value: (
						<MenuItem
							key={k}
							value={k}
							primaryText={contents[v.contentID]}
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
			contents
		} = this.props
		return <div>
			<AutoComplete
				searchText={searchText}
				filter={AutoComplete.noFilter}
				dataSource={this.tagsDataSource()}
				hintText={contents[""] || "bla bla bla..."}
				floatingLabelText={contents["aghkZXZ-Tm9uZXIQCxIHQ29udGVudCIDVGFnDA"] || "Tag"}
				errorText={inputErrTexts.tagIDs}
				onUpdateInput={this.handleAutoComplete} 
				onNewRequest={this.handleNewRequest}
				openOnFocus={true}
			/>
			{this.tagsSelected()}
		</div>
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
			floatingLabelText={contents["aghkZXZ-Tm9uZXIQCxIHQ29udGVudCIDVGFnDA"] || "Explanation"}
			errorText={inputErrTexts.explanation}
			fullWidth={true}
			multiLine={true}
			rows={3}
			rowsMax={5}
			onChange={this.handleFieldChange}
		/>
	}
	stepContents() {
		const {
			newObject
		} = this.state
		const {
			contents, 
			uID
		} = this.props
		return [
			<p>
				{
					uID ? 
						contents["aghkZXZ-Tm9uZXJBCxIHQ29udGVudCI0QWRkIGEgbmV3IHVzZXIuIEVtYWlsIGFuZCBSb2xlcyBmaWVsZHMgYXJlIHJlcXVpcmVkLgw"] : 
						contents["aghkZXZ-Tm9uZXJBCxIHQ29udGVudCI0QWRkIGEgbmV3IHVzZXIuIEVtYWlsIGFuZCBSb2xlcyBmaWVsZHMgYXJlIHJlcXVpcmVkLgw"]  
				}
			</p>, 
			this.tagsField(), 
			this.explanationField(), 
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
			onTouchTap={this.handlePutOrPost}
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

DialogDemand.muiName = "Dialog"

DialogDemand.propTypes = {
	contents: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	showDialog: PropTypes.bool.isRequired, 
	tagsByFilter: PropTypes.object.isRequired, 
	uID: PropTypes.string,
	demand: PropTypes.object,
	toggleDialog: PropTypes.func.isRequired, 
	tagsByFilterGet: PropTypes.func.isRequired, 
	demandPost: PropTypes.func.isRequired, 
	demandPut: PropTypes.func.isRequired
}

export default DialogDemand
