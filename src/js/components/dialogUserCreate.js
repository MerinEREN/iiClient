import React, {Component}  from "react"
import PropTypes from "prop-types"
import Dialog from "material-ui/Dialog"
import VerticalStepper from "./verticalStepper"
import TextField from "material-ui/TextField"
import SelectField from "material-ui/SelectField"
import AutoComplete from "material-ui/AutoComplete"
import MenuItem from "material-ui/MenuItem"
import Chip from "material-ui/Chip"
import Avatar from "material-ui/Avatar"
import {blue300} from "material-ui/styles/colors"
import FlatButton from "material-ui/FlatButton"
import {firstLettersGenerate} from "./utilities"
import {filterAnObjectByKeys} from "../middlewares/utilities"

// Creates a new user.
class DialogUserCreate extends Component {
	constructor(props) {
		super(props)
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
			rolesGet, 
			tagsGet
		} = this.props
		switch (direction) {
			case "next":
				if(this.handleRequiredField(stepIndex))
					return
				switch (stepIndex) {
				case 1:
					rolesGet()
				case 2:
					// Getting most used six tags to show 
					// as initial autocomplete values 
					// if they does not exist yet.
					tagsGet({
						URL: "/tags?q=top", 
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
				key = "email"
				/* if(!isValidEmail(newObject[key])) {
					this.setState({
						inputErrTexts: {
							...inputErrTexts, 
							[key]: contexts["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLaNCgw"] || "Invalid email"
						}
					})
					return true
				} */
				break
			case 2:
				key = "roleIDs"
				break
			case 3:
				/* Uncoment to make required
				key = "tagIDs"
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
		const name = target.name || "roleIDs"
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
	handlePost() {
		const {
			stepIndex, 
			newObject
		} = this.state
		if(this.handleRequiredField(stepIndex))
			return
		const {
			dialogToggle, 
			account: {ID}, 
			userPost
		} = this.props
		dialogToggle()
		// FIND A SOLUTION FOR THAT "ID" THING !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		userPost({
			URL: `/users?q=${ID}`, 
			data: {
				type: "FormData", 
				// Use "contextType" for "Blob" type.
				// contextType: "application/json", 
				value: {
					ID: "dummy", 
					...newObject
				}
			}, 
			key: ID
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
				contexts["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRXhwbGFuYXRpb24M"], 
				"Email", 
				contexts["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFUm9sZXMM"], 
				contexts["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEVGFncww"]
			] : 
			[
				"Explanation", 
				"Email", 
				"Roles", 
				"Tags"
			]
	}
	explanationField(contexts) {
		return <p>
			{contexts["aghkZXZ-Tm9uZXJBCxIHQ29udGVudCI0QWRkIGEgbmV3IHVzZXIuIEVtYWlsIGFuZCBSb2xlcyBmaWVsZHMgYXJlIHJlcXVpcmVkLgw"] || "Add a new user. Email and Roles fields are required."}
		</p>
	}
	emailField() {
		const {
			newObject: {email}, 
			inputErrTexts
		} = this.state
		return <TextField 
			name="email" 
			value={email || ""}
			floatingLabelText={"Email"}
			errorText={inputErrTexts.email}
			onChange={this.handleFieldChange}
		/>
	}
	roleItems(roleIDs, contexts) {
		const {
			roles
		} = this.props
		return Object.entries(roles).map(([k, v]) => <MenuItem
			key={k}
			value={k}
			primaryText={contexts[v.contextID]}
			checked={roleIDs && roleIDs.indexOf(k) > -1}
			insetChildren={true}
		/>
		)
	}
	rolesField(contexts) {
		const {
			newObject: {roleIDs}, 
			inputErrTexts
		} = this.state
		return <SelectField
			value={roleIDs}
			hintText={contexts["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFUm9sZXMM"] || "Roles"}
			errorText={inputErrTexts.roleIDs}
			onChange={this.handleFieldChange}
			multiple={true} 
		>
			{this.roleItems(roleIDs, contexts)}
		</SelectField>
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
						contexts[tags[v].contextID]
					)}
				</Avatar>
				{contexts[tags[v].contextID]}
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
							primaryText={contexts[v.contextID]}
						/>
					)
				}
			})
	}
	tagsField(contexts) {
		const {
			searchText, 
			inputErrTexts
		} = this.state
		return <div>
			<AutoComplete
				searchText={searchText}
				filter={AutoComplete.noFilter}
				dataSource={this.dataSourceTags()}
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
	stepContents() {
		const {
			contexts
		} = this.props
		return [
			this.explanationField(contexts), 
			this.emailField(), 
			this.rolesField(contexts), 
			this.tagsField(contexts)
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

DialogUserCreate.propTypes = {
	contexts: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	dialogShow: PropTypes.bool.isRequired, 
	rolesGet: PropTypes.func.isRequired, 
	roles: PropTypes.object.isRequired, 
	tagsGet: PropTypes.func.isRequired, 
	tags: PropTypes.object.isRequired, 
	tagsPagination: PropTypes.object.isRequired, 
	dialogToggle: PropTypes.func.isRequired, 
	userPost: PropTypes.func.isRequired
}

DialogUserCreate.muiName = "Dialog"

export default DialogUserCreate
