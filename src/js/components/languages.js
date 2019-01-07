import React, {Component} from "react"
import PropTypes from "prop-types"
import {GridList, GridTile} from "material-ui/GridList"
import RaisedButton from "material-ui/RaisedButton"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentAdd from "material-ui/svg-icons/content/add"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import VerticalStepper from "./verticalStepper"
import SelectField from "material-ui/SelectField"
import TextField from "material-ui/TextField"
import MenuItem from "material-ui/MenuItem"
import LanguageTile from "./languageTile"
import {generateURLVariableFromIDs} from "./utilities"

const styles = {
	root: {
		display: "flex",
		flexWrap: "wrap", 
		justifyContent: "space-around"
	}, 
	gridList: {
		margin: 0
	}, 
	raisedButton: {
		marginLeft: 12
	}, 
	floatingActionButton: {
		position: "fixed",
		bottom: 32, 
		right: 48
	}
}

class Languages extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showDialog: false, 
			stepIndex: 0, 
			langNew: {
				ID: "",  
				contentID: ""
			}, 
			inputErrText: {}
		}
		this.toggleDialog = this.toggleDialog.bind(this)
		this.handleStepIndex = this.handleStepIndex.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handlePost = this.handlePost.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		this.props.languagesGet()
	}
	componentWillReceiveProps (nextProps) {
		if (this.props.contents !== nextProps.contents)
			this.items = [
				<MenuItem 
					key={1} 
					value="tr-TR" 
					primaryText={nextProps.contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudCIHVHVya2lzaAw"] || "Turkish"} 
				/>,
				<MenuItem 
					key={2} 
					value="en-US" 
					primaryText={nextProps.contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudCIHRW5nbGlzaAw"] || "English"} 
				/>,
				<MenuItem 
					key={3} 
					value="de-DE" 
					primaryText={nextProps.contents["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGR2VybWFuDA"] || "German"} 
				/>,
				<MenuItem 
					key={4} 
					value="ru-RU" 
					primaryText={nextProps.contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudCIHUnVzc2lhbgw"] || "Russian"} 
				/>
			]
	}
	handleStepIndex(direction) {
		const {stepIndex} = this.state
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
			contents
		} = this.props
		let key
		switch (i) {
			case 1:
				key = "ID"
				break
			case 2:
				key = "contentID"
				break
			default:
				return false
		}
		if (!this.state.langNew[key]) {
			this.setState({
				inputErrText: {
					...this.state.inputErrText, 
					[key]: contents["aghkZXZ-Tm9uZXIbCxIHQ29udGVudCIOUmVxdWlyZWQgRmllbGQM"] || "Required Field"
				}
			})
			return true
		}
		return false
	}
	// INDEX AND VALUES ARE FOR SELECT FIELD ONLY
	handleInputChange(event, index, values) {
		const target = event.target
		const name = target.name || "ID"
		const value = target.value || values
		const {langNew, inputErrText} = this.state
		this.setState({
			langNew: {
				...langNew, 
				[name]: value
			}, 
			inputErrText: {
				...inputErrText, 
				[name]: null
			}
		})
	}
	handlePost() {
		this.toggleDialog()
		const {langNew} = this.state
		this.props.languagePost({
			body: {
				type: "FormData", 
				// Use "contentType" for "Blob" type.
				// contentType: "application/json", 
				data: {
					[langNew.ID]: {
						...langNew, 
						file: this.file.files[0] 
					}
				}
			}
		})
		this.setState({
			langNew: {
				ID: "", 
				contentID: ""
			}, 
			stepIndex: 0
		})
	}
	toggleDialog() {
		this.setState({showDialog: !this.state.showDialog})
	}
	handleDelete() {
		const {languageIDsSelected, languagesDelete} = this.props
		languagesDelete({
			URL: `/languages?IDs=${generateURLVariableFromIDs(languageIDsSelected)}`, 
			body: {
				data: languageIDsSelected
			}
		})
	}
	languageTiles(languages) {
		const {contents, languageIDsSelected} = this.props
		return Object.values(languages).map(v => 
			<LanguageTile 
				key={v.ID} 
				language={v} 
				title={contents[v.contentID] || v.ID}
				isChecked={languageIDsSelected.indexOf(v.ID) !== -1}
			/>)
	}
	render() {
		const {
			root, 
			gridList, 
			raisedButton, 
			floatingActionButton
		} = styles
		const {
			showDialog, 
			stepIndex, 
			inputErrText, 
			langNew
		} = this.state
		const {
			contents, 
			languages, 
			languageIDsSelected
		} = this.props
		const stepLabels = Object.keys(contents).length > 0 ?
			[
				contents["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"], 
				contents["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIETmFtZQw"], 
				contents["aghkZXZ-Tm9uZXIQCxIHQ29udGVudCIDVGFnDA"], 
				contents["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIERmlsZQw"]
			] :
			[
				"Description", 
				"Name", 
				"Tag", 
				"File"
			]
		const stepContents = [
			<p>
				{contents["aghkZXZ-Tm9uZXJGCxIHQ29udGVudCI5QWRkIGEgbmV3IGxhbmd1YWdlLiBMYW5ndWFnZSBhbmQgVGFnIGZpZWxkcyBhcmUgcmVxdWlyZWQuDA"] || "Add a new language. Language and Tag fields are required."}
			</p>, 
			<SelectField 
				value={langNew.ID}
				floatingLabelText={contents["aghkZXZ-Tm9uZXIVCxIHQ29udGVudCIITGFuZ3VhZ2UM"] || "Language"}
				errorText={inputErrText.ID}
				onChange={this.handleInputChange}
			>
				{this.items}
			</SelectField>, 
			<TextField 
				name="contentID"
				value={langNew.contentID || ""}
				floatingLabelText="ID"
				errorText={inputErrText.contentID}
				onChange={this.handleInputChange}
			/>, 
			<input 
				type="file"
				ref={input => this.file = input}
			/>
		]
		const children = <VerticalStepper 
			stepLabels={stepLabels} 
			stepContents={stepContents}
			stepIndex={stepIndex}
			updateStepIndex={this.handleStepIndex}
			contents={contents}
		/>
		const actions = [
			<FlatButton
				label={contents["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFQ2xvc2UM"] || "Close"}
				onTouchTap={this.toggleDialog}
			/>
		]
		stepContents.length - 1 === stepIndex && actions.push(<FlatButton
			label={contents["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEU2F2ZQw"] || "Save"}
			primary={true}
			onTouchTap={this.handlePost}
		/>)
		return (
			<div style={root}>
				<GridList 
					cols={4} 
					cellHeight="auto"
					style={gridList}
				>
					<GridTile cols={1} />  
					<GridTile cols={2}>  
					{ 
						Object.entries(languages).length !== 0 
							? 
							<GridList 
								style={gridList}
								cols={4}
								padding={10}
								cellHeight={333}
							>
								{this.languageTiles(languages)}
							</GridList>
							:
							<h3>{contents["aghkZXZ-Tm9uZXIXCxIHQ29udGVudCIKTm8gQ29udGVudAw"] || "No Content"}</h3>
					}
					{
						languageIDsSelected.length > 0 && 
							<RaisedButton
								label={contents["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGRGVsZXRlDA"] || "Delete"}
								style={raisedButton}
								secondary={true}
								onTouchTap={this.handleDelete}
							/>
					}
					</GridTile>
					<GridTile cols={1} />  
				</GridList>
				{
					!showDialog && 
						<FloatingActionButton 
							secondary={true}
							style={floatingActionButton}
							onTouchTap={this.toggleDialog}
						>
							<ContentAdd />
						</FloatingActionButton>
				}
				<Dialog
					title={contents["aghkZXZ-Tm9uZXIfCxIHQ29udGVudCISQWRkIEEgTmV3IExhbmd1YWdlDA"] || "Add A New Language"}
					children={children}
					actions={actions}
					modal={true}
					open={showDialog} 
				/>
			</div>
		)
	}
}

Languages.defaultProps = {
	contents: {}
}

Languages.propTypes = {
	contents: PropTypes.object.isRequired, 
	languagesGet: PropTypes.func.isRequired, 
	languages: PropTypes.object.isRequired, 
	languagePost: PropTypes.func.isRequired, 
	languageIDsSelected: PropTypes.array.isRequired, 
	languagesDelete: PropTypes.func.isRequired
}

Languages.muiName = "GridList"

export default Languages
